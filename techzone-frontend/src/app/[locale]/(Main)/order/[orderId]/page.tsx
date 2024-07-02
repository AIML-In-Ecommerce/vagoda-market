"use client";
import React, { useEffect, useMemo, useState } from 'react'
import { useParams, useRouter } from "next/navigation";
import { PaymentMethod } from '@/apis/payment/PaymentAPI';
import { Currency } from '@/component/user/utils/CurrencyDisplay';
import { TableColumnsType, Button, Space, Skeleton, Table, Image } from 'antd';
import Link from 'next/link';
import { GET_GetShop } from '@/apis/shop/ShopAPI';
import { FaAngleDoubleLeft } from 'react-icons/fa';
import { GET_GetOrderById, Order, Product } from '@/apis/order/OrderAPI';
import { getFullAddress } from '@/apis/cart/AddressAPI';
import { Address } from '@/model/AddressType';

interface OrderDetailPageProps {

}

interface ProductTableItem extends Product {
    key: React.Key
}
enum OrderStatusType {
    WAITING_ONLINE_PAYMENT = "WAITING_ONLINE_PAYMENT",
    PENDING = "PENDING",
    PROCESSING = "PROCESSING",
    SHIPPING = "SHIPPING",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED",
}

type ShopInfo = {
    _id: string,
    name: string,
}

const formatDate = (date: Date | undefined) => {
    if (!date) {
        return ``;
    }
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
};

const displayOrderStatusLabel = (status: string) => {
    const enumStatus = status as OrderStatusType;
    switch (enumStatus) {
        case OrderStatusType.WAITING_ONLINE_PAYMENT:
            return "Chờ thanh toán".toUpperCase();
        case OrderStatusType.PENDING:
            return "Chờ xác nhận".toUpperCase();
        case OrderStatusType.PROCESSING:
            return "Đang xử lý".toUpperCase();
        case OrderStatusType.SHIPPING:
            return "Đang vận chuyển".toUpperCase();
        case OrderStatusType.COMPLETED:
            return "Đã giao hàng".toUpperCase();
        case OrderStatusType.CANCELLED:
            return "Đã hủy".toUpperCase();
        default:
            return "";
    }
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
                <div className="lg:w-[70%]">&nbsp;</div>
                <div className="px-4 py-2 lg:w-[30%] w-[100%] lg:justify-end">
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
    const [loading, setLoading] = useState<boolean>(true);
    const [order, setOrder] = useState<Order>();
    const [shopInfos, setShopInfos] = useState<ShopInfo[]>();
    const router = useRouter();

    const handleOrderDetails = () => {
        router.push('/order')
    }

    const filterShopName = (shopId: string) => {
        const shopName = shopInfos!.find(shopInfo => shopInfo._id === shopId)!.name;
        return shopName;
    }

    const fetchShopInfos = (products: Product[]) => {
        const shopInfosList: ShopInfo[] = [];
        const shopIdList: string[] = [];
        products.forEach(async (product: Product) => {
            if (!shopIdList.includes(product.shop)) {
                shopIdList.push(product.shop);
            }
        })
        shopIdList.forEach(async (item: string) => {
            await GET_GetShop(item)
                .then((response) => shopInfosList.push({
                    _id: item,
                    name: response.data?.name,
                } as ShopInfo));
        })
        setShopInfos(shopInfosList);
    }

    useEffect(() => {
        const fetchOrder = async () => {
            setLoading(true);
            console.log(`Fetching order Id: ${orderId as string}`);
            await GET_GetOrderById(orderId as string, process.env.NEXT_PUBLIC_USER_ID as string)
                .then((response) => {
                    setOrder(response.data);
                    console.log('Order fetch', response.data);
                })
        }
        fetchOrder();
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        if (order) {
            setLoading(true);
            fetchShopInfos(order.products);
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    }, [order]);

    useEffect(() => {
        // console.log('ShopInfos', shopInfos);
        router.refresh();
    }, [shopInfos]);


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
                                src={record.images[0]}
                                alt={""}
                                preview={false} />
                    }
                    {
                        loading ? <Skeleton paragraph={{ rows: 2 }
                        } active /> : (
                            <div className="flex flex-row">
                                <div className="flex flex-col gap-1">
                                    <div className="text-sm font-bold text-ellipsis overflow-hidden">{record.name}</div>
                                    <div className="text-sm text-gray-500 mb-1 flex flex-row gap-1">Cung cấp bởi <Link href={''}>{filterShopName(record.shop)}</Link></div>
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
                    <Currency value={record.purchasedPrice}
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
                            <Currency value={(record.purchasedPrice * (record.quantity || 1))}
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
            <div className="container flex flex-col lg:px-24 px-10 mx-auto lg:grid lg:grid-cols-3 items-center gap-5 mb-10">
                <div className="lg:col-span-3 text-2xl lg:my-10 my-5">Chi tiết đơn hàng #{orderId}</div>
                <div className="lg:col-start-3 text-sm text-right">Ngày đặt hàng: {formatDate(new Date(order?.orderStatus[0].time!))}</div>
                <div className="mt-10 lg:mt-5 flex flex-col h-full w-full">
                    <div>ĐỊA CHỈ NGƯỜI NHẬN</div>
                    <div className="mt-4 bg-white h-full">
                        <div className="p-3">
                            <div className="font-semibold">{order?.shippingAddress.receiverName}</div>
                            <div className="text-sm">Địa chỉ: {getFullAddress({
                                street: order?.shippingAddress.street,
                                idProvince: order?.shippingAddress.idProvince,
                                idDistrict: order?.shippingAddress.idDistrict,
                                idCommune: order?.shippingAddress.idCommune,
                                country: order?.shippingAddress.country
                            } as Address)}</div>
                            <div className="text-sm">Điện thoại: {order?.shippingAddress.phoneNumber}</div>
                        </div>
                    </div>
                </div>
                <div className="lg:mt-5 flex flex-col h-full w-full">
                    <div>TRẠNG THÁI ĐƠN HÀNG</div>
                    <div className="mt-4 bg-white h-full">
                        <div className="p-3">
                            <div className="text-sm">{displayOrderStatusLabel(order?.orderStatus[order?.orderStatus.length - 1].status as OrderStatusType)}</div>
                        </div>
                    </div>
                </div>
                <div className="lg:mt-5 flex flex-col h-full w-full">
                    <div>HÌNH THỨC THANH TOÁN</div>
                    <div className="mt-4 bg-white h-full">
                        <div className="p-3">
                            <div className="text-sm">
                                {order?.paymentMethod?.kind as string === PaymentMethod.COD ? "Thanh toán tiền mặt khi nhận hàng" : `Thanh toán trực tuyến qua ${paymentMethod}`}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-3 w-full mb-5 lg:mb-10">
                    <Table
                        tableLayout='auto'
                        columns={columns}
                        dataSource={order?.products.map((product: Product) => ({ ...product, key: product._id } as ProductTableItem)) || []}
                        // onRow={(record) => ({
                        //         onClick: () => handleRowClick(record),
                        //       })}
                        loading={loading}
                        pagination={false}
                        scroll={{ x: 'min-content' }}
                        footer={() =>
                            // OrderTransaction(loading, provisional, discount, shippingFee, total)
                            OrderTransaction(
                                loading,
                                order?.products.reduce((sum, item) => sum + (item.purchasedPrice * item.quantity), 0)!,
                                0,
                                0,
                                order?.totalPrice || 0)

                        }
                    />
                </div>
                <div className="flex flex-row items-center gap-2 text-lg text-blue-700 cursor-pointer hover:text-blue-900"
                    onClick={() => handleOrderDetails()}>
                    <FaAngleDoubleLeft /> Quay lại đơn hàng của tôi
                </div>
            </div>
        </React.Fragment>
    )
}
