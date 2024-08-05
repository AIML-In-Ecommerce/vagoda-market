"use client";
import { POST_GetLatestOrder, Order } from "@/apis/order/OrderAPI";
import PaymentStatusComponent from "@/component/customer/payment/PaymentStatusComponent";
import { AuthContext } from "@/context/AuthContext";
import { usePaymentContext } from "@/context/PaymentContext";
import { Skeleton } from "antd";
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import React, { useEffect, useState, useContext } from "react"


export default function PaymentPage() {
    const context = useContext(AuthContext);
    const paymentContext = usePaymentContext();
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [savedParams, setSavedParams] = useState({});
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        // set access status, the next time the user routes through is not allowed
        paymentContext.setHasAccessedPaymentPage(true);
    }, [router,
        paymentContext.hasAccessedPaymentPage, 
        paymentContext.setHasAccessedPaymentPage]);

    useEffect(() => {
        // Extract the current query parameters
        const params = Object.fromEntries(searchParams.entries());

        // Save the query parameters in state
        setSavedParams(params);

        // Remove all query parameters from the URL
        const newUrl = pathname;
        console.log(savedParams);
        router.replace(newUrl);

    }, [pathname, searchParams, router]);

    useEffect(() => {
        const fetchLatestOrder = async (orderIds: string[]) => {
            setLoading(true);
            console.log("fetchLatestOrder orderIds: ", orderIds);
            if (orderIds === null) return;
            await POST_GetLatestOrder(context.userInfo?._id as string, orderIds)
            .then((response) => {
                const ordersResponse = response.data ?? [];
                setOrders(ordersResponse);
                setLoading(false);
            });            
        }
        if (context.userInfo) {
            fetchLatestOrder(paymentContext.orderIds as string[]);
        }
    }, [context.userInfo, paymentContext.orderIds])
    
    return (
        <React.Fragment>
            <div className="lg:container flex flex-col p-5 mx-auto my-5">
                {
                    loading ? <Skeleton active={loading}/> :
                        <PaymentStatusComponent orders={orders} />
                }
            </div>
        </React.Fragment>
    )
}