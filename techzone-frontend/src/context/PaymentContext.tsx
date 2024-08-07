"use client";

import { usePathname, useRouter } from 'next/navigation';
// contexts/PaymentContext.tsx
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define the type for the context state
interface PaymentContextState {
  orderIds: string[] | null;
  setOrderIds: (orderIds: string[] | null) => void;
  hasAccessedPaymentPage: boolean;
  setHasAccessedPaymentPage: (accessed: boolean) => void;
}

// Create the context with a default value
const PaymentContext = createContext<PaymentContextState | undefined>(undefined);

// Create a provider component
export const PaymentProvider = ({ children }: { children: ReactNode }) => {
  const [orderIds, setOrderIds] = useState<string[] | null>(null);
  const [hasAccessedPaymentPage, setHasAccessedPaymentPage] = useState<boolean>(true);
  const router = useRouter();
  const currentPathname = usePathname();

  useEffect(() => {
    const accessed = localStorage.getItem('hasAccessedPaymentPage');
    const storageOrderIds = localStorage.getItem('latestOrderIds');

    if (accessed) {
      if (currentPathname.includes('/payment') && (['true', 'undefined'].includes(accessed))) {
        console.log('accessed payment page', accessed, true);
        router.replace('/');
        return;
      }
      setHasAccessedPaymentPage(false);
    }
    if (storageOrderIds) {
      setOrderIds(JSON.parse(storageOrderIds));
    }
    console.log("PaymentContext reloaded");
  }, []);

  useEffect(() => {
    if (hasAccessedPaymentPage) {
      localStorage.setItem('hasAccessedPaymentPage', 'true');
    }
    else {
      localStorage.setItem('hasAccessedPaymentPage', 'false');
    }
  }, [hasAccessedPaymentPage]);

  useEffect(() => {
    if (orderIds) {
      localStorage.setItem('latestOrderIds', JSON.stringify(orderIds));
    }
    else {
      localStorage.setItem('latestOrderIds', 'null');
    }
  }, [orderIds]);

  return (
    <PaymentContext.Provider value={{ orderIds, setOrderIds, hasAccessedPaymentPage, setHasAccessedPaymentPage }}>
      {children}
    </PaymentContext.Provider>
  );
};

// Create a custom hook to use the PaymentContext
export const usePaymentContext = (): PaymentContextState => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePaymentContext must be used within a PaymentProvider');
  }
  return context;
};
