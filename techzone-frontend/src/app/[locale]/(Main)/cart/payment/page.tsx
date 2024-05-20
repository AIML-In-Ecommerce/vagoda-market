"use client";
import PaymentStatusComponent from "@/component/customer/payment/PaymentStatusComponent";
import React, { useState } from "react"

export default function PaymentPage() {
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState(1);

    return (
        <React.Fragment>
            <div className="lg:container flex flex-col p-5 mx-auto my-5">
                <PaymentStatusComponent paymentMethod={undefined}/>
            </div>
        </React.Fragment>
    )
}