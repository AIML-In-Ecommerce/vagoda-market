"use client";
import { GET_GetLatestOrder, Order } from "@/apis/order/OrderAPI";
import PaymentStatusComponent from "@/component/customer/payment/PaymentStatusComponent";
import { AuthContext } from "@/context/AuthContext";
import { Skeleton } from "antd";
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import React, { useEffect, useState, useContext } from "react"


export default function PaymentPage() {
    const context = useContext(AuthContext);
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
            setLoading(true);
            await GET_GetLatestOrder(context.userInfo?._id as string).then(response => {
                setOrder(response.data as Order);
                setLoading(false);
            })
        }
        fetchLatestOrder();
      }, [context.userInfo])

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