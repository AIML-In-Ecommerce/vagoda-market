"use client";
import React, { useEffect, useState } from 'react'
import { useParams } from "next/navigation";
import { PaymentMethod } from '@/app/apis/payment/PaymentAPI';
import { GET_getUserCartProducts, Product } from '@/app/apis/cart/CartProductAPI';
import { Currency } from '@/component/user/utils/CurrencyDisplay';
import { QuantityControl } from '@/component/user/utils/QuantityControl';
import { TableColumnsType, Button, Space, Skeleton, Select, Table, Image } from 'antd';
import { FaRegTrashCan } from 'react-icons/fa6';
import Link from 'next/link';

interface OrderDetailPageProps {

}

interface ProductTableItem extends Product {
    key: React.Key
}


const OrderTransaction =
    (
        loading: boolean,
        provisional: number,
        discount: number,
        shippingFee: number,
        total: number
    ) => {
        return (
            <div className="flex flex-row">
                <div className="w-[70%]">&nbsp;</div>
                <div className="px-4 py-2 w-[30%] justify-end">
                    {loading ?
                        <Skeleton active /> : (
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between mt-3">
                                    <div>Tạm tính</div>
                                    <Currency value={provisional}
                                        locales={"vi-VN"}
                                        currency={"VND"}
                                        minimumFractionDigits={0} />
                                </div>
                                <div className="flex justify-between">
                                    <div>Phí vận chuyển</div>
                                    <Currency value={shippingFee}
                                        locales={"vi-VN"}
                                        currency={"VND"}
                                        minimumFractionDigits={0} />
                                </div>
                                <div className="flex justify-between">
                                    <div>Giảm giá</div>
                                    <div>- <Currency value={discount}
                                        locales={"vi-VN"}
                                        currency={"VND"}
                                        minimumFractionDigits={0} /></div>
                                </div>
                                <div className="flex justify-between">
                                    <div>Tổng tiền</div>
                                    <div className="flex flex-col space-y-3 grid">
                                        <div className="text-red-400 text-xl justify-self-end">
                                            <Currency value={total}
                                                locales={"vi-VN"}
                                                currency={"VND"}
                                                minimumFractionDigits={0} /></div>
                                    </div>
                                </div>
                            </div>)}
                </div>
            </div>
        )
    }


export default function OrderDetailPage() {
    const params = useParams();
    const { orderId } = params;
    const paymentMethod = PaymentMethod.ZALOPAY;
    const [loading, setLoading] = useState<boolean>(false);
    const [products, setProducts] = useState<Product[]>();

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
        ],
        createdDate: new Date("2024-03-24T12:30:00")
    }

    const fetchProducts = async () => {
        await GET_getUserCartProducts(process.env.NEXT_PUBLIC_USER_ID as string)
            .then(response => setProducts(response.data?.products || undefined));
        setTimeout(() => {
            setLoading(false);
        }, 1000);
        ;
    }

    useEffect(() => {
        fetchProducts();
    }, [])

    const columns: TableColumnsType<Product> = [
        {
            title: <div className="flex flex-row gap-1 items-center text-gray-400">
                <div className="lg:text-base text-sm">Sản phẩm</div>
            </div>,
            dataIndex: 'name',
            render: (text: string, record: Product) =>
                <Space align="start" size={12} className="flex flex-row">
                    {
                        loading ? <Skeleton.Image active /> :
                            <Image
                                width={120}
                                src={record.image}
                                alt={""}
                                preview={false} />
                    }
                    {
                        loading ? <Skeleton paragraph={{ rows: 2 }
                        } active /> : (
                            <div className="flex flex-row">
                                <div className="flex flex-col gap-1">
                                    <div className="text-sm font-bold text-ellipsis overflow-hidden">{record.name}</div>
                                    <div className="text-sm text-gray-500 mb-1 flex flex-row gap-1">Cung cấp bởi <Link href={''}>{record.shop}</Link></div>
                                    <div className="flex flex-row gap-2">
                                        <Button onClick={() => { }}>Viết nhận xét</Button>
                                        <Button onClick={() => { }}>Mua lại</Button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </Space >
        },
        {
            title: <span className="lg:text-base text-sm text-gray-400">Giá</span>,
            dataIndex: 'finalPrice',
            render: (value: number, record: Product) => (
                <span className="text-base">
                    <Currency value={record.finalPrice}
                        locales={"vi-VN"}
                        currency={"VND"}
                        minimumFractionDigits={0} />
                </span>
            )
        },
        {
            title: <span className="lg:text-base text-sm text-gray-400">Số lượng</span>,
            dataIndex: 'quantity',

        },
        {
            title: <span className="lg:text-base text-sm truncate text-gray-400">Giảm giá</span>,
            // dataIndex: 'quantity',
            render: () => <span className="text-base">
                - <Currency value={0}
                    locales={"vi-VN"}
                    currency={"VND"}
                    minimumFractionDigits={0} />
            </span>


        },
        {
            title: <span className="lg:text-base text-sm truncate text-gray-400">Tạm tính</span>,
            dataIndex: 'finalPrice',
            render: (value: number, record: Product) => (
                loading ? <Skeleton.Input active /> : (
                    <div className="flex flex-col gap-1">
                        <span className="text-base">
                            <Currency value={(record.finalPrice * (record.quantity || 1))}
                                locales={"vi-VN"}
                                currency={"VND"}
                                minimumFractionDigits={0} />
                        </span>
                    </div>

                )
            ),
        },
    ];

    return (
        <React.Fragment>
            <div className="container flex flex-col lg:px-24 mx-auto lg:grid lg:grid-cols-3 items-center gap-5 mb-10">
                <div className="lg:col-span-3 text-2xl lg:my-10 my-5">Chi tiết đơn hàng #{orderId}</div>
                <div className="lg:col-start-3 text-sm text-right">Ngày đặt hàng: {orderMockInfo.createdDate.toLocaleString()}</div>
                <div className="mt-10 lg:mt-5 flex flex-col lg:h-[148px] w-full">
                    <div>ĐỊA CHỈ NGƯỜI NHẬN</div>
                    <div className="mt-4 bg-white h-full">
                        <div className="p-3">
                            <div className="font-semibold">NGUYỄN MINH QUANG</div>
                            <div className="text-sm">Địa chỉ: {"135B Trần Hưng Đạo, Phường Cầu Ông Lãnh, Quận 1, Hồ Chí Minh, Việt Nam"}</div>
                            <div className="text-sm">Điện thoại: {"0839994855"}</div>
                        </div>
                    </div>
                </div>
                <div className="lg:mt-5 flex flex-col lg:h-[148px] w-full">
                    <div>TRẠNG THÁI ĐƠN HÀNG</div>
                    <div className="mt-4 bg-white h-full">
                        <div className="p-3">
                            <div className="text-sm">Giao hàng thành công</div>
                        </div>
                    </div>
                </div>
                <div className="lg:mt-5 flex flex-col lg:h-[148px] w-full">
                    <div>HÌNH THỨC THANH TOÁN</div>
                    <div className="mt-4 bg-white h-full">
                        <div className="p-3">
                            <div className="text-sm">
                                {paymentMethod as string === PaymentMethod.COD ? "Thanh toán tiền mặt khi nhận hàng" : `Thanh toán trực tuyến qua ${paymentMethod}`}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-3 w-full">
                    <Table
                        tableLayout='auto'
                        columns={columns}
                        dataSource={products?.map(product => ({ ...product, key: product._id } as ProductTableItem))}
                        // onRow={(record) => ({
                        //         onClick: () => handleRowClick(record),
                        //       })}
                        loading={loading}
                        pagination={false}
                        scroll={{ x: 'min-content' }}
                        footer={() =>
                            // OrderTransaction(loading, provisional, discount, shippingFee, total)
                            OrderTransaction(loading, 0, 0, 0, 0)

                        }
                    />
                </div>
            </div>
        </React.Fragment>
    )
}
