import React from 'react'
import { Currency } from "@/component/user/utils/CurrencyDisplay"
import { AddressType } from "@/model/AddressType"
import { Affix, Space, Card, Skeleton, Divider, Tag, Tooltip, Button } from "antd"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { FaRegCircleQuestion } from "react-icons/fa6"
import { TiTicket } from "react-icons/ti"

interface TransactionSectionProps {
    selectedRowKeys: any;
    loading: boolean;
    provisional: any;
    discount: any;
    shippingFee: any;
    total: any;
}

const isEmpty = (quantity: number) => {
    return quantity === 0 ? true : false;
}

export default function TransactionSection(props: TransactionSectionProps) {
    const router = useRouter();

    return (
        <div className="bg-white px-4 py-2">
            {props.loading ? <Skeleton active /> : (
            <div className="flex flex-col gap-2">
                <div className="flex justify-between mt-3">
                    <div>Tạm tính</div>
                    <Currency value={props.provisional}
                        locales={"vi-VN"}
                        currency={"VND"}
                        minimumFractionDigits={0} />
                </div>
                <div className="flex justify-between">
                    <div>Giảm giá</div>
                    <div>- <Currency value={props.discount}
                        locales={"vi-VN"}
                        currency={"VND"}
                        minimumFractionDigits={0} /></div>
                </div>
                <div className="flex justify-between">
                    <div>Phí giao hàng</div>
                    <Currency value={props.shippingFee}
                        locales={"vi-VN"}
                        currency={"VND"}
                        minimumFractionDigits={0} />
                </div>
                <Divider></Divider>
                <div className="flex justify-between">
                    <div>Tổng tiền</div>
                    <div className="flex flex-col space-y-3 grid">
                        <div className="text-red-400 text-xl font-extrabold justify-self-end">
                            <Currency value={props.total}
                                locales={"vi-VN"}
                                currency={"VND"}
                                minimumFractionDigits={0} /></div>
                        <div className="text-slate-400 text-base justify-self-end">(Đã bao gồm VAT nếu có)</div>
                    </div>
                </div>
            </div>
            )}
            <Button type="primary" size="large" danger block
                disabled={isEmpty(props.selectedRowKeys.length)}
                onClick={() => { router.push('/cart/payment') }}>
                Mua Hàng ({props.selectedRowKeys.length})
            </Button>
        </div>
    )
}
