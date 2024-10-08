import type { Metadata } from "next";
import "./globals.css";

// import SocketProvider from "@/socket/SocketProvider";
import { ReactNode } from "react";
import AuthContextProvider from "../context/AuthContext";
import { PaymentProvider } from "@/context/PaymentContext";

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Vagoda - Đẳng cấp thời trang, bứt phá giới hạn",
  description: "Thời trang là phong cách, phong cách là bạn!",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang={"en"}>
      <body className="w-full">
        <AuthContextProvider>
          <PaymentProvider>
            {/* <SocketProvider> */}
            {children}
            {/* </SocketProvider> */}
          </PaymentProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
