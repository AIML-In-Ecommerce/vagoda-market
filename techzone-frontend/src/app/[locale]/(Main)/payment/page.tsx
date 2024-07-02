"use client";
import { GET_GetLatestOrder, Order } from "@/apis/order/OrderAPI";
import PaymentStatusComponent from "@/component/customer/payment/PaymentStatusComponent";
import { Skeleton } from "antd";
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from "react"


export default function PaymentPage() {
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [savedParams, setSavedParams] = useState({});
    const [order, setOrder] = useState<Order>({} as Order);

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
        const fetchLatestOrder = async() => {
            await GET_GetLatestOrder(process.env.NEXT_PUBLIC_USER_ID as string).then(response => {
                setOrder(response.data as Order);
            })
        }
        fetchLatestOrder();
        setLoading(false);
      }, [])

    return (
        <React.Fragment>
            <div className="lg:container flex flex-col p-5 mx-auto my-5">
                {
                    loading ? <Skeleton active={loading}/> : 
                        <PaymentStatusComponent order={order}/>
                }
            </div>
        </React.Fragment>
    )
}