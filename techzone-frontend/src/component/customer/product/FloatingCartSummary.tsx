"use client";
import { Currency } from "@/component/user/utils/CurrencyDisplay"
import { AddressType } from "@/model/AddressType"
import { Affix, Space, Card, Skeleton, Divider, Tag, Tooltip, Button } from "antd"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { FaRegCircleQuestion } from "react-icons/fa6"
import { TiTicket } from "react-icons/ti"

interface CardSummaryProps {
    goToShippingAddressPage: () => void
    loading: boolean
    selectedRowKeys: React.Key[]
    provisional: number
    discount: number
    total: number
    currentAddress: AddressType
    showPromotionModal: () => void
}

const isEmpty = (quantity: number) => {
    return quantity === 0 ? true : false;
}
const promotion_help = "Áp dụng tối đa 1 Mã giảm giá Sản Phẩm và 1 Mã Vận Chuyển"

export default function FloatingCartSummary(props: CardSummaryProps) {
    const router = useRouter();

    return (
        <div className="lg:sticky lg:mx-0 mx-auto lg:w-4/5 w-full lg:top-10 block">
            <Space direction="vertical" size="middle"
                className="flex bg-slate-50">
                <Card title={
                    <div className="flex flex-row justify-between">
                        <span className="text-slate-400 text-lg">Giao tới</span>
                        <Link className="text-sky-500 hover:text-blue-700 self-center" href={"/cart/shipping"}
                            onClick={props.goToShippingAddressPage}>
                            Thay đổi
                        </Link>
                    </div>
                } size="small">
                    {/* Skeleton for current address */}
                    {props.loading ? (
                        <Skeleton active />
                    ) : (
                        <>
                            <div className="flex flex-row font-bold space-x-5">
                                <div className="lg:text-base text-sm uppercase">{props.currentAddress.receiverName}</div>
                                <Divider type="vertical" style={{ height: "auto", border: "0.25px solid silver" }}></Divider>
                                <div className="lg:text-base text-sm lg:mx-5">{props.currentAddress.phoneNumber}</div>
                            </div>
                            <div>
                                {props.currentAddress.addressType === "residential" ?
                                    <span><Tag color="#87d068">Nhà</Tag></span> :
                                    <span><Tag color="#b168d0">Văn phòng</Tag></span>
                                }
                                <span className="mx-2 text-slate-500">{props.currentAddress.address}</span>
                            </div>
                        </>
                    )}
                </Card>
                <Card size="small">
                    <div className="flex flex-col">
                        {props.loading ? <Skeleton active /> : (<>
                            <div className="flex flex-row justify-between">
                                <div className="font-semibold">Techzone Khuyến Mãi</div>
                                <div className="flex flex-row space-x-2">
                                    <div className="text-slate-500">Có thể chọn 2</div>
                                    <Tooltip placement="bottom" title={promotion_help}>
                                        <div className="text-slate-500"><FaRegCircleQuestion /></div>
                                    </Tooltip>
                                </div>
                            </div>
                            <div className="mt-10 flex gap-2 text-sky-500 hover:text-blue-700 font-semibold"
                                onClick={() => props.showPromotionModal()}>
                                <TiTicket className="text-lg self-center" />
                                <div>Chọn hoặc nhập Khuyến mãi khác</div>
                            </div>
                        </>
                        )}
                    </div>
                </Card>
                <Card size="small">
                    {props.loading ? <Skeleton active /> : (<>
                        <div className="flex justify-between">
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
                        <Divider></Divider>
                        <div className="flex justify-between">
                            <div>Tổng tiền</div>
                            <div className="flex flex-col space-y-3 grid">
                                <div className="text-red-400 text-lg font-bold justify-self-end">
                                    <Currency value={props.total}
                                        locales={"vi-VN"}
                                        currency={"VND"}
                                        minimumFractionDigits={0} /></div>
                                <div className="text-slate-400 text-base justify-self-end">(Đã bao gồm VAT nếu có)</div>
                            </div>
                        </div>
                    </>
                    )}
                </Card>
                <Button type="primary" size="large" danger block
                    disabled={isEmpty(props.selectedRowKeys.length)}
                    onClick={() => { router.push('/cart/payment') }}>
                    Mua Hàng ({props.selectedRowKeys.length})
                </Button>
            </Space>
        </div>
    )
}