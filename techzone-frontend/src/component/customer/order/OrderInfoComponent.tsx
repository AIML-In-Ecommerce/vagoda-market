import { Order, POST_RepurchaseOrder, Product } from '@/apis/order/OrderAPI';
import { GET_GetShop } from '@/apis/shop/ShopAPI';
import { Currency } from '@/component/user/utils/CurrencyDisplay';
import { Button, Card, Image, message, Skeleton, Tooltip } from 'antd'
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react'
import { BiDetail } from 'react-icons/bi';
import { CiShop } from 'react-icons/ci';
import { FaCartArrowDown, FaPen, FaShippingFast } from 'react-icons/fa';
import { LiaTruckLoadingSolid } from 'react-icons/lia';
import { MdOutlinePendingActions } from 'react-icons/md';
import { SlWallet } from 'react-icons/sl';
import { TbHomeCancel, TbHomeCheck } from 'react-icons/tb';
import { TiInputChecked } from 'react-icons/ti';

const { Meta } = Card;

interface OrderInfoComponentProps {
    order: Order;
}

type ShopInfo = {
    _id: string,
    name: string,
}

enum OrderStatusType {
    WAITING_ONLINE_PAYMENT = "WAITING_ONLINE_PAYMENT",
    PENDING = "PENDING",
    PROCESSING = "PROCESSING",
    SHIPPING = "SHIPPING",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED",
}


let availableRepurchaseStatuses = [
    OrderStatusType.COMPLETED,
    OrderStatusType.CANCELLED
]

const getLatestOrderStatus = (order: Order) => {
    let orderStatusList = order.orderStatus;
    return orderStatusList.at(-1)?.status;
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

const displayOrderStatusLabel = (status: OrderStatusType) => {
    switch (status) {
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

export default function OrderInfoComponent(props: OrderInfoComponentProps) {

    const router = useRouter();
    const [shopInfos, setShopInfos] = useState<ShopInfo[]>();
    const [loading, setLoading] = useState<boolean>(true);
    const latestOrderStatus = useMemo(() => {
        return getLatestOrderStatus(props.order);
    }, [props.order]);


    const handleOrderDetail = (orderId: string) => {
        router.push(`/order/${orderId}`);
    }

    const handleRepurchaseOrder = async (orderId: string) => {
        const response = await POST_RepurchaseOrder(orderId as string, []);
        if (response.status === 200) {
            message.success(`Đã thêm sản phẩm vào giỏ hàng`)
        }
        else {
            message.error("Lỗi khi thêm sản phẩm");
        }
    }

    const calculateOrderTotalPrice = (products: Product[]) => {
        return products.reduce((sum, product) => sum + product.quantity * product.purchasedPrice, 0);
    }

    const filterShopName = (shopId: string) => {
        const shopName = shopInfos?.find(shopInfo => shopInfo._id === shopId)?.name;
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
        if (props.order.products) {
            fetchShopInfos(props.order.products);
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    }, [props.order.products]);

    useEffect(() => {
        router.refresh();
    }, [shopInfos]);

    return (
        <Card loading={loading} title={
            <div className="flex flex-row items-center gap-2">
                {loading ? (
                    <>
                        <Skeleton.Avatar active={loading} size={24} shape="circle" />
                        <Skeleton.Input active={loading} />
                    </>
                ) : <>
                    {displayOrderStatusIcon(props.order.orderStatus[props.order.orderStatus.length - 1].status as OrderStatusType)}
                    <div className="text-gray-500">
                        {displayOrderStatusLabel(props.order.orderStatus[props.order.orderStatus.length - 1].status as OrderStatusType)}
                    </div>
                </>}
            </div>
        }>
            <div className="flex flex-col overflow-auto">
                {
                    props.order.products.map((product) => (
                        <Card type="inner" className="mb-2 cursor-pointer select-none relative">
                            <Meta avatar=
                                {
                                    <div className="relative border-1 border-slate-100">
                                        <Image preview={false} width={60} height={60} src={product.images ? product.images[0] : ""} />
                                        <div className="absolute right-0 top-2/3 bg-slate-200 p-2 rounded-l-xl font-semibold">x{product.quantity}</div>
                                    </div>

                                }
                                title={product.name}
                                description={<div className="flex flex-row gap-2 items-center"><CiShop /> {filterShopName(product.shop)}</div>}>
                            </Meta>
                            <div className="absolute inset-y-1/3 right-2 text-lg">
                                <Currency value={product.quantity * product.purchasedPrice} />
                            </div>
                        </Card>
                    ))
                }
            </div>
            <div className="text-xl text-end mt-5">
                <span className="text-gray-500">Tông tiền:</span> <span className="text-red-500 font-semibold">
                    {/* <Currency value={calculateOrderTotalPrice(props.order.products)} /> */}
                    <Currency value={props.order.totalPrice} />
                </span>
            </div>
            <div className="flex flex-row gap-2 justify-end mt-2">
                {
                    latestOrderStatus ? availableRepurchaseStatuses.includes(latestOrderStatus as OrderStatusType) ?
                        (<Button className="flex items-center justify-center text-white bg-[#5c6856] border-2 group"
                            onClick={async () => await handleRepurchaseOrder(props.order._id)}>
                            <span className="group-hover:mr-2"><FaCartArrowDown /></span>
                            <span className="cursor-pointer text-white hidden group-hover:block">
                                Mua lại
                            </span>
                        </Button>) : <></> : <></>
                }
                <Button className="flex items-center justify-center text-white bg-blue-400 border-2 group"
                    onClick={() => handleOrderDetail(props.order._id)}>
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
