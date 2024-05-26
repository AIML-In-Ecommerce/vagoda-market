import { Currency } from '@/component/user/utils/CurrencyDisplay';
import { Button, Card, Image, Tooltip } from 'antd'
import React from 'react'
import { BiDetail } from 'react-icons/bi';
import { BsTruckFront } from 'react-icons/bs'
import { FaCartArrowDown, FaPen } from 'react-icons/fa';

const { Meta } = Card;

export default function OrderInfoComponent() {
    const orderMockInfo = {
        id: 'order-info1',
        status: 'Giao hàng thành công',
        products: [
            {
                id: '1',
                name: 'product_1',
                quantity: '1',
                total: '100.000đ'
            },
            {
                id: '2',
                name: 'product_2',
                quantity: '1',
                total: '100.000đ'
            },
            {
                id: '3',
                name: 'product_3',
                quantity: '1',
                total: '100.000đ'
            },
            {
                id: '4',
                name: 'product_4',
                quantity: '1',
                total: '100.000đ'
            }
        ]
    }
    return (
        <Card title={
            <div className="flex flex-row items-center gap-2">
                <BsTruckFront />
                <div className="text-gray-500">
                    {orderMockInfo.status}
                </div>
            </div>
        }>
            <div className="flex flex-col h-64 overflow-auto">
                {
                    orderMockInfo.products.map((product) => (
                        <Card type="inner" className="mb-2 cursor-pointer select-none relative">
                            <Meta avatar=
                                {
                                    <div className="relative border-1 border-slate-100">
                                        <Image preview={false} width={60} height={60} src={`https://randomicle.com/static/media/sandwich_maker.4d17771a.jpg`} />
                                        <div className="absolute right-0 top-2/3 bg-slate-200 p-2 rounded-l-xl font-semibold">x{product.quantity}</div>
                                    </div>

                                }
                                title={product.name}
                                description="This is the description">
                            </Meta>
                            <div className="absolute inset-y-1/3 right-2 text-lg">{product.total}</div>
                        </Card>
                    ))
                }
            </div>
            <div className="text-xl text-end mt-5">
                <span className="text-gray-500">Tông tiền:</span> <span className="text-red-500 font-semibold"><Currency value={400000} /></span>
            </div>
            <div className="flex flex-row gap-2 justify-end mt-2">
                <Button className="flex items-center justify-center text-white bg-[#5c6856] border-2 group">
                    <span className="group-hover:mr-2"><FaCartArrowDown /></span>
                    <span className="cursor-pointer text-white hidden group-hover:block">
                        Mua lại
                    </span>
                </Button>
                <Button className="flex items-center justify-center text-white bg-blue-400 border-2 group">
                    <span className="group-hover:mr-2"><BiDetail /></span>
                    <span className="cursor-pointer text-white hidden group-hover:block">
                        Xem chi tiết
                    </span>
                </Button>
            </div>
            {/* <div className="flex flex-row gap-2 justify-end mt-2">
                <Tooltip title="Mua lại">
                    <Button className="flex items-center justify-center text-white bg-[#5c6856] border-2">
                        <span><FaCartArrowDown /></span>
                    </Button>
                </Tooltip>

                <Tooltip title="Xem chi tiết">
                    <Button className="flex items-center justify-center text-white bg-blue-400 border-2">
                        <span><BiDetail /></span>
                    </Button>
                </Tooltip>
            </div> */}

        </Card>
    )
}
