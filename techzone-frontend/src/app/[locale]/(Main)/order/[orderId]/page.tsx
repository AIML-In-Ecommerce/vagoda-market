"use client";
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useParams, useRouter } from "next/navigation";
import { PaymentMethod } from '@/apis/payment/PaymentAPI';
import { Currency } from '@/component/user/utils/CurrencyDisplay';
import { TableColumnsType, Button, Space, Skeleton, Table, Image, message, Timeline, Typography, Flex, Tooltip, TimelineItemProps, Divider } from 'antd';
import Link from 'next/link';
import { FaAngleDoubleLeft, FaShippingFast } from 'react-icons/fa';
import { GET_GetOrderById, Order, OrderStatus, POST_RepurchaseOrder, ProductInOrder } from '@/apis/order/OrderAPI';
import { getFullAddress } from '@/apis/cart/AddressAPI';
import { Address } from '@/model/AddressType';
import { AuthContext } from '@/context/AuthContext';
import { SlWallet } from 'react-icons/sl';
import { LiaTruckLoadingSolid } from 'react-icons/lia';
import { MdOutlinePendingActions } from 'react-icons/md';
import { TbHomeCheck, TbHomeCancel } from 'react-icons/tb';
import { LuClipboardList } from 'react-icons/lu';

interface OrderDetailPageProps {

}

interface ProductTableItem extends ProductInOrder {
    key: React.Key,
}
enum OrderStatusType {
    WAITING_ONLINE_PAYMENT = "WAITING_ONLINE_PAYMENT",
    PENDING = "PENDING",
    PROCESSING = "PROCESSING",
    SHIPPING = "SHIPPING",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED",
}

let availableReviewStatuses = [
    OrderStatusType.COMPLETED
]

let availableRepurchaseStatuses = [
    OrderStatusType.COMPLETED,
    OrderStatusType.CANCELLED
]

const getOrderStatusTimeline = (statusList: OrderStatus[]) => {
    let result: any[] = []

    let isOnlinePayment = false;
    isOnlinePayment = statusList.find(item => item.status === OrderStatusType.WAITING_ONLINE_PAYMENT) ? true : false;

    statusList.forEach((value: OrderStatus, index: number) => {
        let label = "", completeLabel = "";
        let color = "blue";
        // let childContent = ""
        let startTime: string = formatDate(value.time)
        let endTime: string = ""

        label = displayOrderStatusLabel(value.status);
        completeLabel = displayCompleteOrderStatusLabel(value.status);

        // childContent = startTime + "- ";

        //set color dot
        if (value.complete !== null) {
            if (value.complete > value.deadline && value.status !== OrderStatusType.SHIPPING) {
                color = "orange"
            }
            else {
                color = "green"
            }

            endTime = formatDate(value.complete)

        }
        else {
            endTime = "...";
        }

        //Bonus status "ORDER_SUCCESSFUL"
        const orderSucessfulDotPoint =
        {
            // label: label,
            dot: <div className={`${index !== statusList.length - 1 ? "border-gray-500 bg-gray-500" : "border-lime-500 bg-lime-500"}
            border-2 rounded-full p-1 text-white text-xl font-semibold`}>
                <LuClipboardList/>
            </div>,
            // color: "gray",
            children: <>
                <div>ĐẶT HÀNG THÀNH CÔNG</div>
                <Typography.Text className="w-full">{startTime}</Typography.Text>
            </>
        }

        const processingDotStartPoint =
        {
            // label: label,
            dot: (

                <div className={`${index !== statusList.length - 1 ? "border-gray-500 bg-gray-500" : "border-lime-500 bg-lime-500"}
                    border-2 rounded-full p-1 text-white text-xl font-semibold`}>
                    {displayOrderStatusIcon(value.status as OrderStatusType)}
                </div>
            ),
            // color: color,
            children: <>
                <div>{label}</div>
                <Typography.Text className="w-full">{startTime}</Typography.Text>
            </>
        }
        const processingDotEndPoint =
        {
            // label: completeLabel,
            dot: undefined,
            color: "gray",
            children: <>
                <div>{completeLabel}</div>
                <Typography.Text className="w-full">{endTime}</Typography.Text>
            </>
        }

        if (value.status === OrderStatusType.COMPLETED) {
            result.push({ ...processingDotStartPoint, color: "green" });

        }
        else {
            if (!isOnlinePayment && index === 0) result.push(orderSucessfulDotPoint);
            result.push(processingDotStartPoint);
            if (endTime !== "...") {
                result.push(processingDotEndPoint);
            }
            if (isOnlinePayment && value.status === OrderStatusType.WAITING_ONLINE_PAYMENT) {
                result.push(orderSucessfulDotPoint);
            }

        }
    })

    return result;
}

const formatDate = (date: Date | number | null | undefined) => {
    if (!date) {
        return ``;
    }
    let currentDate = new Date(date);
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear();

    return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
};

const displayOrderStatusLabel = (status: string) => {
    const enumStatus = status as OrderStatusType;
    switch (enumStatus) {
        case OrderStatusType.WAITING_ONLINE_PAYMENT:
            return "Chờ thanh toán".toUpperCase();
        case OrderStatusType.PENDING:
            return "Chờ xác nhận từ nhà bán".toUpperCase();
        case OrderStatusType.PROCESSING:
            return "Nhà bán đang chuẩn bị".toUpperCase();
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

const displayCompleteOrderStatusLabel = (status: string) => {
    const enumStatus = status as OrderStatusType;
    switch (enumStatus) {
        case OrderStatusType.WAITING_ONLINE_PAYMENT:
            return "Đã thanh toán".toUpperCase();
        case OrderStatusType.PENDING:
            return "Nhà bán đã xác nhận".toUpperCase();
        case OrderStatusType.PROCESSING:
            return "Đơn hàng đã đóng gói".toUpperCase();
        case OrderStatusType.SHIPPING:
            return "Đã vận chuyển".toUpperCase();
        case OrderStatusType.COMPLETED:
            return "Đã giao hàng".toUpperCase();
        case OrderStatusType.CANCELLED:
            return "Đã hủy".toUpperCase();
        default:
            return "";
    }
}

const displayOrderStatusIcon = (status: OrderStatusType) => {
    switch (status) {
        case OrderStatusType.WAITING_ONLINE_PAYMENT:
            return <SlWallet />;
        case OrderStatusType.PENDING:
            return <MdOutlinePendingActions />;
        case OrderStatusType.PROCESSING:
            return <LiaTruckLoadingSolid />;
        case OrderStatusType.SHIPPING:
            return <FaShippingFast />;
        case OrderStatusType.COMPLETED:
            return <TbHomeCheck />;
        case OrderStatusType.CANCELLED:
            return <TbHomeCancel />;
        default:
            return <></>;
    }
}

const calculateDiscountValue = (totalPrice: number, provisional: number, shippingFee: number) => {
    return Math.abs(totalPrice - provisional - shippingFee);
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
                                    <div>- <Currency value={calculateDiscountValue(total, provisional, shippingFee)}
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
    const context = useContext(AuthContext)
    const params = useParams();
    const { orderId } = params;
    const paymentMethod = PaymentMethod.ZALOPAY;
    const [loading, setLoading] = useState<boolean>(true);
    const [order, setOrder] = useState<Order>();
    // const [shopInfos, setShopInfos] = useState<ShopInfo[]>();
    const router = useRouter();

    const getLatestOrderStatus = (order: Order) => {
        let orderStatusList = order.orderStatus;
        return orderStatusList.at(-1);
    }
    const orderStatusTimeline = useMemo(() => {
        if (order)
            return getOrderStatusTimeline(order.orderStatus) as TimelineItemProps[]
        else return [] as TimelineItemProps[]
    }, [order]);


    const handleOrderDetails = () => {
        router.push('/order')
    }

    const handleNavigateToReviewPage = (itemId: string) => {
        console.log('itemId', itemId);
        router.push(`/review?orderId=${orderId}&itemId=${itemId}`)
    }

    const handleRepurchaseOrder = async (item: ProductInOrder) => {
        let itemId = item.itemId;
        const response = await POST_RepurchaseOrder(orderId as string, [itemId]);
        if (response.status === 200) {
            message.success(`Đã thêm sản phẩm "${item.name}" vào giỏ hàng`)
        }
        else {
            message.error("Lỗi khi thêm sản phẩm");
        }
    }

    useEffect(() => {
        const fetchOrder = async () => {
            if (!context.userInfo) return;
            setLoading(true);
            console.log(`Fetching order Id: ${orderId as string}`);
            await GET_GetOrderById(orderId as string, context.userInfo._id as string)
                .then((response) => {
                    setOrder(response.data);
                    console.log('Order fetch', response.data);
                    setLoading(false);
                })
        }
        fetchOrder();
    }, [context.userInfo]);

    const columns = useMemo<TableColumnsType<ProductInOrder>>(() => {
        const result: TableColumnsType<ProductInOrder> = [
            {
                title: <div className="flex flex-row gap-1 items-center text-gray-400">
                    <div className="lg:text-base text-sm">Sản phẩm</div>
                </div>,
                dataIndex: 'name',
                render: (text: string, record: ProductInOrder) =>
                    <Space align="start" size={12} className="flex flex-row">
                        {
                            loading ? <Skeleton.Image active /> :
                                <>
                                    {
                                        record.color ? <Image
                                            width={120}
                                            src={record.color.link}
                                            alt={""} /> : <Image.PreviewGroup
                                                items={record.images}>
                                            <Image
                                                width={120}
                                                src={record.images ? record.images[0] : ""}
                                                alt={""} />
                                        </Image.PreviewGroup>
                                    }
                                </>
                        }
                        {
                            loading ? <Skeleton paragraph={{ rows: 2 }
                            } active /> : (
                                <div className="flex flex-row">
                                    <div className="flex flex-col gap-1">
                                        <div className="text-sm font-bold text-ellipsis overflow-hidden">{record.name}</div>
                                        <div className="text-sm text-gray-500 mb-1">
                                            {record.color?.color.label.toUpperCase() ?? ""} {record.color?.color.label && record.size ? "/" : ""} {record.size ? record.size.toUpperCase() : ""}</div>
                                        <div className="text-sm text-gray-500 mb-1 flex flex-row gap-1">Cung cấp bởi <Link href={`/seller/${order?.shop._id}`}>{order?.shop.name}</Link></div>
                                        <div className="flex flex-row gap-2">
                                            {
                                                latestOrderStatus ? (
                                                    availableReviewStatuses.includes(latestOrderStatus.status as OrderStatusType) ? (
                                                        <Button onClick={() => { handleNavigateToReviewPage(record.itemId) }}>Viết nhận xét</Button>
                                                    ) : <></>) : <></>
                                            }
                                            {
                                                latestOrderStatus ? (
                                                    availableRepurchaseStatuses.includes(latestOrderStatus.status as OrderStatusType) ? (
                                                        <Button onClick={() => { handleRepurchaseOrder(record) }}>Mua lại</Button>
                                                    ) : <></>) : <></>
                                            }

                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </Space >
            },
            {
                title: <span className="lg:text-base text-sm text-gray-400">Giá</span>,
                dataIndex: 'purchasedPrice',
                render: (value: number, record: ProductInOrder) => (
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
            // {
            //     title: <span className="lg:text-base text-sm truncate text-gray-400">Giảm giá</span>,
            //     // dataIndex: 'quantity',
            //     render: () => <span className="text-base">
            //         - <Currency value={0}
            //             locales={"vi-VN"}
            //             currency={"VND"}
            //             minimumFractionDigits={0} />
            //     </span>


            // },
            {
                title: <span className="lg:text-base text-sm truncate text-gray-400">Tạm tính</span>,
                dataIndex: 'purchasedPrice',
                render: (value: number, record: ProductInOrder) => (
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
        return result;
    }, [context.userInfo, order]);

    const latestOrderStatus = useMemo(() => {
        if (!order) return null;
        const status = getLatestOrderStatus(order);
        return status;
    }, [order]);

    return (
        <React.Fragment>
            <div className="container flex flex-col lg:px-24 px-10 mx-auto lg:grid lg:grid-cols-3 items-center mb-10">
                <div className="lg:col-span-3 text-2xl lg:my-10 my-5">Chi tiết đơn hàng #{orderId}</div>
                {/* <div className="lg:col-start-3 text-sm text-right">Ngày đặt hàng: {formatDate(new Date(order?.orderStatus[0].time!))}</div> */}
                <div className="mt-10 lg:mt-5 flex flex-col h-full w-full bg-white">
                    <div className="p-3 font-semibold mt-3 ml-4">ĐỊA CHỈ NGƯỜI NHẬN</div>
                    <div className="ml-4 bg-white h-full lg:w-full w-3/5">
                        <div className="p-3">
                            <div className="font-semibold text-lg">{order?.shippingAddress.receiverName}</div>
                            <div className="text-md">Địa chỉ: {getFullAddress({
                                street: order?.shippingAddress.street,
                                idProvince: order?.shippingAddress.idProvince,
                                idDistrict: order?.shippingAddress.idDistrict,
                                idCommune: order?.shippingAddress.idCommune,
                                country: order?.shippingAddress.country
                            } as Address)}</div>
                            <div className="text-md">Điện thoại: {order?.shippingAddress.phoneNumber}</div>
                        </div>
                    </div>
                </div>
                <div className="lg:mt-5 flex flex-col h-full w-full bg-white">
                    <div className="p-3 font-semibold mt-3 ml-4">HÌNH THỨC THANH TOÁN</div>
                    <div className="ml-4 bg-white h-full">
                        <div className="p-3">
                            <div className="text-md">
                                {order?.paymentMethod?.kind as string === PaymentMethod.COD ? "Thanh toán tiền mặt khi nhận hàng" : `Thanh toán trực tuyến qua ${paymentMethod}`}
                            </div>
                            <div className="text-md">
                                {
                                    order?.paymentMethod?.kind as string === PaymentMethod.COD ?
                                        latestOrderStatus?.status === OrderStatusType.COMPLETED ?
                                            "Thanh toán lúc: " + formatDate(latestOrderStatus.time) : "Trạng thái: Chưa thanh toán" :
                                        <div className="flex flex-col">
                                            <div>
                                                {
                                                    formatDate(order?.paymentMethod.paidAt ?? new Date())
                                                }
                                            </div>
                                            <div>Mã giao dịch: <b>{order?.paymentMethod.zpUserId}</b></div>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:mt-5 flex flex-col h-full w-full bg-white">
                    <div className="p-3 font-semibold mt-3 ml-4">TRẠNG THÁI ĐƠN HÀNG</div>
                    <div className="ml-4 bg-white h-full">
                        <div className="p-6">
                            {/* <div className="text-sm">{displayOrderStatusLabel(order?.orderStatus[order?.orderStatus.length - 1].status as OrderStatusType)}</div> */}
                            <Timeline className="w-full" items={orderStatusTimeline} />
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-3 w-full my-5 lg:mb-10">
                    <Table
                        tableLayout='auto'
                        columns={columns}
                        dataSource={order?.products.map((product: ProductInOrder) => ({ ...product, key: product.itemId } as ProductTableItem)) || []}
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
