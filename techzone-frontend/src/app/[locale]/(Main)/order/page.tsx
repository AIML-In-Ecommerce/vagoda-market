'use client';
import { GET_GetAllOrders, Order } from '@/app/apis/order/OrderAPI';
import OrderInfoComponent from '@/component/customer/order/OrderInfoComponent';
import { Button, Divider, Flex, Input, List, Tabs, Typography } from 'antd';
import Search from 'antd/es/input/Search';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6';

interface OrderOverviewProps {

}


enum OrderStatusType {
    WAITING_ONLINE_PAYMENT = "WAITING_ONLINE_PAYMENT",
    PENDING = "PENDING",
    PROCESSING = "PROCESSING",
    SHIPPING = "SHIPPING",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED",
}

const tabs =
    [
        {
            index: 0,
            key: "ALL_ORDER",
            label: "Tất cả đơn",
            children: <></>
        },
        {
            index: 1,
            key: OrderStatusType.WAITING_ONLINE_PAYMENT as string,
            label: "Chờ thanh toán",
            children: <></>
        },
        {
            index: 2,
            key: OrderStatusType.PENDING as string,
            label: "Chờ xác nhận",
            children: <></>
        },
        {
            index: 3,
            key: OrderStatusType.PROCESSING as string,
            label: "Đang xử lý",
            children: <></>
        },
        {
            index: 4,
            key: OrderStatusType.SHIPPING as string,
            label: "Đang vận chuyển",
            children: <></>
        },
        {
            index: 5,
            key: OrderStatusType.COMPLETED as string,
            label: "Đã giao hàng",
            children: <></>
        },
        {
            index: 6,
            key: OrderStatusType.CANCELLED as string,
            label: "Đã hủy",
            children: <></>
        }
    ]

const INITIAL_DISPLAY: number = 3;
const LOAD_DISPLAY: number = 2;

export default function OrderOverview(props: OrderOverviewProps) {
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState<Order[]>([]);
    const [displayOrders, setDisplayOrders] = useState<Order[]>([]);
    const [count, setCount] = useState<number>(INITIAL_DISPLAY);
    const defaultTabKey = OrderStatusType.WAITING_ONLINE_PAYMENT;
    const tabParams = useSearchParams();
    const tab = tabParams.get('tab');
    const activeTabFromUrl = tab || 'ALL_ORDER';
    const router = useRouter();
    const [selectedTabKey, setSelectedTabKey] = useState<string>(activeTabFromUrl)

    const onLoadMore = () => {
        const newDisplayItem = count + LOAD_DISPLAY < orders.length ? count + LOAD_DISPLAY : orders.length;
        setCount(newDisplayItem);
        const newDisplayOrders = filterOrders(selectedTabKey, orders).slice(0, newDisplayItem);
        // console.log('Total display: ', newDisplayItem, newDisplayOrders);
        setDisplayOrders(newDisplayOrders);
    };

    const loadMore =
        !initLoading && !loading && (count !== displayOrders.length) ? (
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 12,
                    height: 32,
                    lineHeight: '32px',
                }}
                className="mb-5"
            >
                <Button onClick={onLoadMore}>Xem thêm</Button>
            </div>
        ) : null;
    
    const handleTabKeyOnChange = (activeKey: string) => {
        setSelectedTabKey(activeKey);
    }

    const filterOrders = (filter: string, orders: Order[]) => {
        if (filter === 'ALL_ORDER') return orders;
        return orders.filter((order: Order) => order.orderStatus[order.orderStatus.length - 1].status === filter)
    }

    useEffect(() => {
        //api called
        const fetchOrders = async () => {
            await GET_GetAllOrders(process.env.NEXT_PUBLIC_USER_ID as string)
            .then((response) => {
                const responseData = response;
                // console.log('orders', responseData)
                setOrders(responseData.data);
                setDisplayOrders(filterOrders(selectedTabKey, responseData.data).slice(0, count));
            })
        }
        fetchOrders();
        setInitLoading(false);
    }, [])

    useEffect(() => {       
        if (orders && displayOrders) {
            setDisplayOrders(filterOrders(selectedTabKey, orders).slice(0, count));
            setCount(INITIAL_DISPLAY);
            router.push(`/order?tab=${selectedTabKey}`);
        }
    }, [selectedTabKey])

    return (
        <React.Fragment>
            <div className="container flex flex-col px-24 mx-auto">
                <div className="text-2xl my-10">Đơn hàng của tôi</div>
                <div className="bg-white w-[100%] px-4">
                    <Tabs
                        activeKey={selectedTabKey}
                        defaultActiveKey={defaultTabKey}
                        items={tabs.map((value) => {
                            const item = {
                                key: value.key,
                                label: value.label,
                                children: value.children
                            }
                            return item
                        })}
                        onChange={handleTabKeyOnChange}
                    />
                </div>
                <div className="bg-white w-[100%] mt-5">
                    <Input prefix={<FaMagnifyingGlass />} size="large"
                        placeholder="Tìm đơn hàng theo Mã đơn hàng, Nhà bán hoặc Tên sản phẩm"
                        suffix={
                            <div className="border-l-2 border-gray-500 px-4 mx-auto">
                                {/* <Divider type="vertical" style={{ border: "0.25px solid silver" }}></Divider> */}
                                <div className="text-blue-700 cursor-pointer hover:text-blue-900">Tìm đơn hàng</div>
                            </div>

                        }
                    />
                </div>
                <div className="bg-white w-[100%] mt-5 mb-10">
                    <List
                        loading={initLoading}
                        itemLayout="vertical"
                        loadMore={loadMore}
                        dataSource={displayOrders}
                        renderItem={(item) => (
                            <List.Item key={item._id}>
                                <OrderInfoComponent order={item} />
                            </List.Item>
                        )}>
                    </List>
                </div>
            </div>
        </React.Fragment >
    )
}
