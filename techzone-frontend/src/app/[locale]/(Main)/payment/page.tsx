"use client";
import PaymentStatusComponent from "@/component/customer/payment/PaymentStatusComponent";
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from "react"


export default function PaymentPage() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [savedParams, setSavedParams] = useState({});

    //get order from orderId created before...
    const order = {}

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

    return (
        <React.Fragment>
            <div className="lg:container flex flex-col p-5 mx-auto my-5">
                <PaymentStatusComponent order={order}/>
            </div>
        </React.Fragment>
    )
}