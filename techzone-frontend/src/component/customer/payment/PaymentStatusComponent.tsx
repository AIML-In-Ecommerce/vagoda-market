"use client";
import { Order } from '@/apis/order/OrderAPI';
import { PaymentMethod } from '@/apis/payment/PaymentAPI';
import { Currency, formatCurrencyFromValue } from '@/component/user/utils/CurrencyDisplay';
import { Button, ConfigProvider, Image, List, Skeleton, Tooltip } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useMemo, useState } from 'react'
import { BsShop } from 'react-icons/bs';
import { IoCheckmarkCircle } from "react-icons/io5";

const getTwoWeeksAfter = (today: Date): string => {
    const twoWeeksFromToday = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);

    // const randomTime = today.getTime() + Math.random() * (twoWeeksFromToday.getTime() - today.getTime());
    // const randomDate = new Date(randomTime);

    const day = String(twoWeeksFromToday.getDate()).padStart(2, '0');
    const month = String(twoWeeksFromToday.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = twoWeeksFromToday.getFullYear();

    return `${day}/${month}/${year}`;
}

interface PaymentStatusComponentProps {
    orders: Order[];
}

export default function PaymentStatusComponent(props: PaymentStatusComponentProps) {
    const router = useRouter();

    const navigateToHomePage = () => {
        router.push('/');
    }

    const navigateToOrderDetailPage = (orderId: string) => {
        router.push(`/order/${orderId}`);
    }

    const navigateToOrderPage = () => {
        router.push(`/order`);
    }

    const totalPurchase = useMemo(() => {
        if (props.orders.length === 0) return 0;
        const totalPrice = props.orders.reduce((acc, order) => acc + order.totalPrice, 0)
        return totalPrice;
    }, [props.orders]);

    const orderPaymentMethod = useMemo(() => {
        const representOrder = props.orders?.at(0);
        return representOrder?.paymentMethod?.kind ?? "COD";
    }, [props.orders])

    return (
        <div className="container bg-slate-100">
            <div className="bg-slate-200 p-10 sm:p-6">
                <div className="flex flex-row gap-3 items-center justify-center">
                    <div className="text-green-600 text-5xl my-2">
                        <IoCheckmarkCircle />
                    </div>
                    <div className="md:text-2xl text-3xl text-gray-900 font-semibold">Đặt hàng thành công!</div>
                </div>
                <div>
                    {
                        orderPaymentMethod === PaymentMethod.ZALOPAY ?
                        (<div className="mb-2 text-center">Thanh toán thành công <span><b>{formatCurrencyFromValue({value: totalPurchase ?? 0})}</b></span> với hình thức thanh toán <b>{orderPaymentMethod}</b>.</div>)
                        : <div className="mb-2">Đã chọn hình thức thanh toán bằng tiền mặt. Vui lòng trả <span><b>{formatCurrencyFromValue({value: totalPurchase ?? 0})}</b></span> cho người giao hàng.</div>
                    }
                    <div className="text-gray-600 mb-5 text-center">Cảm ơn bạn đã mua hàng tại VAGODA.</div>
                    {
                        props.orders ? <ConfigProvider
                            theme={{
                                token: {
                                    colorBorder: "#000000",
                                    colorSplit: "#000000",
                                    // lineType: 'solid',
                                    lineWidth: 1
                                },
                            }}
                        >
                            <List
                                className="lg:w-2/3 lg:mx-auto"
                                header={<div className="text-lg font-semibold">Các đơn đặt hàng đến nhà bán</div>}
                                footer={<div>Tổng cộng <span className="font-semibold text-red-500 text-lg">{props.orders.length}</span> đơn đặt hàng</div>}
                                bordered
                                dataSource={props.orders}
                                renderItem={(order) => (
                                    <List.Item>
                                        <div className="flex flex-col gap-2 mb-2">
                                            <div className="flex flex-row gap-2 items-center">
                                                {/* <Image preview={false} src={}></Image> */}
                                                <BsShop />
                                                <div>{order.shop.name}</div>
                                                <div className="italic text-sky-500 hover:text-sky-600 hover:font-semibold cursor-pointer"
                                                    onClick={() => navigateToOrderDetailPage(order._id)}>
                                                    Chi tiết đơn hàng
                                                </div>
                                            </div>
                                            <div className="text-left"> Mã số đơn hàng của bạn là <span className="italic">{order._id ?? ""}</span></div>
                                            <div className="text-left"> Thời gian dự kiến giao hàng đến ngày <b>{getTwoWeeksAfter(new Date(order.createAt))}</b></div>

                                        </div>
                                    </List.Item>
                                )}
                            />
                        </ConfigProvider> : <Skeleton></Skeleton>


                    }
                    <div className="mt-5 flex flex-row gap-5 lg:w-5/6 justify-end">
                        <Tooltip title={"Quay về trang chủ"} autoAdjustOverflow>
                            <Button type="text" size="large"
                                onClick={() => navigateToHomePage()}
                                className="border-2 bg-lime-500 border-lime-600 hover:bg-lime-600 text-white font-semibold">
                                TRANG CHỦ
                            </Button>
                        </Tooltip>
                        <Tooltip title={"Xem lịch sử đơn hàng"} autoAdjustOverflow>
                            <Button type="text" size="large"
                                onClick={() => navigateToOrderPage()}
                                className="border-2 bg-lime-500 border-lime-600 hover:bg-lime-600 text-white font-semibold">
                                ĐƠN HÀNG
                            </Button>
                        </Tooltip>
                    </div>
                </div>
            </div>
        </div>
    )
}
