import { Button } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { IoCheckmarkCircle } from "react-icons/io5";

const navigateToHomePage = (router: any) => {
    router.push('/');
}

const navigateToOrderPage = (router: any) => {
    router.push('/order');
}

interface PaymentStatusComponentProps {
    paymentMethod: any;
}

export default function PaymentStatusComponent(props: PaymentStatusComponentProps) {
    const router = useRouter();

    return (
        <div className="bg-slate-100">
            <div className="bg-slate-200 p-6 md:mx-auto">
                <div className="flex flex-row gap-3 items-center justify-center">
                    <div className="text-green-600 text-5xl text-center my-2">
                        <IoCheckmarkCircle />
                    </div>
                    <div className="md:text-2xl text-3xl text-gray-900 font-semibold text-center">Đặt hàng thành công!</div>
                </div>
                <div className="text-center">
                    <div className="mb-2">Thanh toán thành công xxx.xxxđ với hình thức thanh toán X.</div>
                    {/* <div className="mb-2">Đã chọn hình thức thanh toán bằng tiền mặt. Vui lòng trả xxx.xxxđ cho người giao hàng.</div> */}
                    <div className="text-gray-600 mb-2">Cảm ơn bạn đã mua hàng tại FashionStyle.</div>
                    <div> Mã số đơn hàng của bạn là ORDER_ID</div>
                    <div> Thời gian dự kiến giao hàng đến ngày dd/mm/yyyy</div>
                    <div className="mt-5 flex flex-row gap-5 items-center justify-center">
                        <Button type="text" size="large"
                            onClick={() => navigateToHomePage(router)}
                            className="border-2 bg-lime-500 border-lime-600 hover:bg-lime-600 text-white font-semibold">
                            TRANG CHỦ
                        </Button>
                        <Button type="text" size="large"
                            onClick={() => navigateToOrderPage(router)}
                            className="border-2 bg-lime-500 border-lime-600 hover:bg-lime-600 text-white font-semibold">
                            ĐƠN HÀNG
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
