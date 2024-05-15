"use client";
// import FloatingCartSummary from "@/component/customer/product/FloatingCartSummary"
import { Address, AddressType } from "@/model/AddressType";
import { PromotionType } from "@/model/PromotionType";
import { Input, Radio, RadioChangeEvent, Space, Image } from "antd";
import React, { useState } from "react"

export default function PaymentPage() {
    const [promotions, setPromotions] = useState<PromotionType[]>([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [loading, setLoading] = useState(false);
    const [top, setTop] = React.useState<number>(50);
    const [provisional, setProvisional] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [discounts, setDiscounts] = useState<PromotionType[]>([]);
    const [total, setTotal] = useState(0);
    const [currentAddress, setCurrentAddress] = useState<AddressType>({
        _id: '1',
        receiverName: 'Nguyễn Minh Quang',
        address: {
            street: "227 Nguyễn Văn Cừ",
            idProvince: "79",
            idDistrict: "774",
            idCommune: "27301",
            country: "Việt Nam"
        },
        phoneNumber: "0839994856",
        addressType: "residential",
        selectedAsDefault: true
    });

    const [value, setValue] = useState(1);

    const onChange = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    const options = [
        { label: 'Thanh toán bằng tiền mặt khi nhận hàng', value: 'cash_on_delivery', icon: 'https://salt.tikicdn.com/ts/upload/92/b2/78/1b3b9cda5208b323eb9ec56b84c7eb87.png' },
        { label: 'Thanh toán bằng ví MoMo', value: 'momo_wallet', icon: "https://salt.tikicdn.com/ts/upload/ce/f6/e8/ea880ef285856f744e3ffb5d282d4b2d.jpg" },
        { label: 'Thanh toán bằng ví ZaloPay', value: 'zalopay_wallet', icon: "https://salt.tikicdn.com/ts/upload/2f/43/da/dd7ded6d3659036f15f95fe81ac76d93.png" },
        { label: 'Thanh toán thẻ quốc tế Visa, Master...', value: 'credit_card', icon: "https://salt.tikicdn.com/ts/upload/7e/48/50/7fb406156d0827b736cf0fe66c90ed78.png" },
    ];

    return (
        <React.Fragment>
            <div className="lg:container flex flex-col p-5 mx-auto my-5">
                <div className="text-xl font-bold">THANH TOÁN</div>
                <div className="mt-5 flex xs:flex-col sm:flex-col md:flex-col lg:grid lg:grid-cols-3 gap-5 relative">
                    <div className="lg:col-start-1 lg:col-span-2 rounded-lg lg:mb-0 mb-10 lg:w-auto w-full">
                        <Radio.Group onChange={onChange} value={value}>
                            <Space direction="vertical">
                                {
                                    options.map(item => {
                                        return (
                                            <Radio value={item.value}>
                                                <div className="flex flex-row items-center">
                                                    <span className="mr-3">
                                                        <Image src={item.icon} preview={false} width={40}></Image>
                                                    </span>
                                                    <span>{item.label}</span>

                                                </div>
                                            </Radio>
                                        )
                                    })
                                }
                            </Space>
                        </Radio.Group>

                    </div>

                    <div className="lg:col-start-3 lg:col-span-1 lg:w-auto w-full">

                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}