'use client';
import OrderInfoComponent from '@/component/customer/order/OrderInfoComponent';
import { Button, Divider, Flex, Input, Tabs, Typography } from 'antd';
import Search from 'antd/es/input/Search';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6';

interface OrderOverviewProps {

}

export default function OrderOverview(props: OrderOverviewProps) {

    const tabs =
        [
            {
                index: 0,
                key: "all_order",
                label: "Tất cả đơn",
                children: <></>
            },
            {
                index: 1,
                key: "awaiting_payment",
                label: "Chờ thanh toán",
                children: <></>
            },
            {
                index: 2,
                key: "processing",
                label: "Đang xử lý",
                children: <></>
            },
            {
                index: 3,
                key: "shipping",
                label: "Đang vận chuyển",
                children: <></>
            },
            {
                index: 4,
                key: "delivered",
                label: "Đã giao hàng",
                children: <></>
            },
            {
                index: 5,
                key: "canceled",
                label: "Đã hủy",
                children: <></>
            }
        ]

    const defaultTabKey = "awaiting_confirmation"
    const defaultTabLabelProp =
        <div className="w-full">
            <Flex vertical justify="center" align="center">
                <Typography.Text>
                    Tab
                </Typography.Text>
                <Typography.Text>
                    -
                </Typography.Text>
            </Flex>
        </div>

    const tabParams = useSearchParams();
    const tab = tabParams.get('tab');
    const activeTabFromUrl = tab || 'all_order';
    const router = useRouter();
    const [selectedTabKey, setSelectedTabKey] = useState<string>(activeTabFromUrl)


    function handleTabKeyOnChange(activeKey: string) {
        setSelectedTabKey(activeKey);
        router.push(`/order?tab=${activeKey}`);
    }

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
                <div className="bg-white w-[100%] mt-5">
                    <OrderInfoComponent/>
                    <OrderInfoComponent/>
                </div>
            </div>
        </React.Fragment>
    )
}
