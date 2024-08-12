'use client';
import { GET_GetAllOrders, Order } from '@/apis/order/OrderAPI';
import OrderInfoComponent from '@/component/customer/order/OrderInfoComponent';
import { AuthContext } from '@/context/AuthContext';
import { Button, Divider, Flex, Input, List, Tabs, Typography } from 'antd';
import Search from 'antd/es/input/Search';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState, useContext, useMemo } from 'react'
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

const INITIAL_DISPLAY: number = 3;
const LOAD_DISPLAY: number = 2;

const filterSearchQuery = (array: any[], query: string) => {
    const normalizedQuery = query.trim().toLowerCase();

    const searchInObject = (obj: any, keyword: string) => {
        if (typeof obj !== 'object' || obj === null) {
            return false;
        }
        for (let key in obj) {
            if (typeof obj[key] === 'object') {
                if (searchInObject(obj[key], keyword)) {
                    return true;
                }
            } else if (obj[key].toString().toLowerCase().includes(keyword.toLowerCase())) {
                return true;
            }
        }   
        return false;
    };

    const filteredArray = array.filter(item => searchInObject(item, normalizedQuery))
    return filteredArray;
}

export default function OrderOverview(props: OrderOverviewProps) {
    const context = useContext(AuthContext)
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState<Order[]>([]);
    const [displayOrders, setDisplayOrders] = useState<Order[]>([]);
    const [count, setCount] = useState<number>(INITIAL_DISPLAY);
    const defaultTabKey = OrderStatusType.WAITING_ONLINE_PAYMENT;
    const tabParams = useSearchParams();
    const tab = tabParams.get('tab');
    const activeTabFromUrl = tab || 'ALL_ORDER';
    const router = useRouter();
    const [selectedTabKey, setSelectedTabKey] = useState<string>(activeTabFromUrl);

    const filterOrders = (filter: string, orders: Order[]) => {
        if (filter === 'ALL_ORDER') return orders;
        return orders.filter(
                (order: Order) => 
                    order.orderStatus[order.orderStatus.length - 1].status === filter)
    }

    const tabs = useMemo(() => {
        const orderTabs =
    [
        {
            index: 0,
            key: "ALL_ORDER",
            label: `Tất cả đơn (${filterOrders("ALL_ORDER", orders).length})`,
            children: <></>
        },
        {
            index: 1,
            key: OrderStatusType.WAITING_ONLINE_PAYMENT as string,
            label: `Chờ thanh toán (${filterOrders(OrderStatusType.WAITING_ONLINE_PAYMENT, orders).length})`,
            children: <></>
        },
        {
            index: 2,
            key: OrderStatusType.PENDING as string,
            label: `Chờ xác nhận (${filterOrders(OrderStatusType.PENDING, orders).length})`,
            children: <></>
        },
        {
            index: 3,
            key: OrderStatusType.PROCESSING as string,
            label: `Đang xử lý (${filterOrders(OrderStatusType.PROCESSING, orders).length})`,
            children: <></>
        },
        {
            index: 4,
            key: OrderStatusType.SHIPPING as string,
            label: `Đang vận chuyển (${filterOrders(OrderStatusType.SHIPPING, orders).length})`,
            children: <></>
        },
        {
            index: 5,
            key: OrderStatusType.COMPLETED as string,
            label: `Đã giao hàng (${filterOrders(OrderStatusType.COMPLETED, orders).length})`,
            children: <></>
        },
        {
            index: 6,
            key: OrderStatusType.CANCELLED as string,
            label: `Đã hủy (${filterOrders(OrderStatusType.CANCELLED, orders).length})`,
            children: <></>
        }
    ]
        return orderTabs;
    }, [orders])
    
    const handleSearchQuery = (query: string) => {
        setDisplayOrders(filterSearchQuery(orders, query));
    }

    const onLoadMore = () => {
        const newDisplayItem = count + LOAD_DISPLAY < orders.length ? count + LOAD_DISPLAY : orders.length;
        setCount(newDisplayItem);
        const newDisplayOrders = filterOrders(selectedTabKey, orders).slice(0, newDisplayItem);
        setDisplayOrders(newDisplayOrders);
    };

    const loadMore = useMemo(() => {
        let maxDisplayItems = filterOrders(selectedTabKey, orders).length;
        return (!initLoading && !loading && (displayOrders.length < maxDisplayItems) ? (
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 12,
                    height: 32,
                    lineHeight: '32px',
                }}
                className="mb-5"
            >
                <Button size="large" onClick={onLoadMore}>
                    <div className="text-lg">Xem thêm</div>
                </Button>
            </div>
        ) : null);
    },[initLoading, loading, displayOrders, orders]);

    const handleTabKeyOnChange = (activeKey: string) => {
        setSelectedTabKey(activeKey);
    }

    useEffect(() => {
        //api called
        if (!context.userInfo) return;
        const fetchOrders = async () => {
            setLoading(true);
            await GET_GetAllOrders(context.userInfo?._id as string)
                .then((response) => {
                    const responseData = response;
                    console.log('orders', responseData)
                    const ordersData = responseData.data;
                    const latedTimeOrderStatus = (order: Order) => {
                        const lastIndex = order.orderStatus.length - 1;
                        return order.orderStatus[lastIndex].time;
                    }
                    ordersData.sort((a: Order, b: Order) => latedTimeOrderStatus(a) < latedTimeOrderStatus(b) ? 1 : -1);
                    setOrders(responseData.data);
                    setDisplayOrders(filterOrders(selectedTabKey, responseData.data).slice(0, count));
                })
        }
        fetchOrders();
        setInitLoading(false);
        setLoading(false);
    }, [context.userInfo])

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
                        onChange={(e) => handleSearchQuery(e.target.value)}
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
                            <List.Item>
                                <div key={item._id}>
                                    <OrderInfoComponent order={item} />
                                </div>
                            </List.Item>
                        )}>
                    </List>
                </div>
            </div>
        </React.Fragment >
    )
}
