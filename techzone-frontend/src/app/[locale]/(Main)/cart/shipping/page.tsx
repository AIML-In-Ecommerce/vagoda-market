"use client";
import { Button, Card, Checkbox, CheckboxProps, Divider, Input, Radio, RadioChangeEvent, Select, Space, Form } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6"
import { useRouter } from "next/navigation"

type Address = {
    receiverName: string,
    address: string,
    phoneNumber: string,
    addressType: string,
    selectedAsDefault: boolean // is selected as default address
}

const addressTypeOptions = [
    { label: 'Nhà riêng / Chung cư', value: 'residential' },
    { label: 'Cơ quan / Công ty', value: 'workplace' },
];

const getAddressTypeLabel = (value: string) => {
    const addressType = addressTypeOptions.find(option => option.value === value);
    return addressType ? addressType.label : '';
};

export default function ShippingAddressPage() {
    const [formVisibility, setFormVisibility] = useState<boolean>(false)
    const [address, setAddress] = useState<Address[]>([]);
    const [addressType, setAddressType] = useState();
    const router = useRouter();

    const onAddressTypeChange = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setAddressType(e.target.value);
    };
    const onDefaultAddressChange: CheckboxProps['onChange'] = (e) => {
        console.log('checkbox checked', e.target.checked);
    };

    //Scroll to the bottom of the screen when the user clicks on the "add address button"
    useEffect(() => {
        if (!formVisibility) return;
        window.scroll({
            top: document.body.scrollHeight,
            behavior: 'smooth',
        });
    }, [formVisibility])

    const fetchAddress = async () => {
        const userAddresses: Address[] = [
            {
                receiverName: 'Nguyễn Minh Quang',
                address: "135B Trần Hưng Đạo, Phường Cầu Ông Lãnh, Quận 1, Hồ Chí Minh, Việt Nam",
                phoneNumber: "0839994856",
                addressType: "residential",
                selectedAsDefault: true
            },
            {
                receiverName: 'Nguyễn Minh Quang',
                address: "227, đường Nguyễn Văn Cừ, Phường 4, Quận 5, Hồ Chí Minh, Việt Nam",
                phoneNumber: "0839994856",
                addressType: "workplace",
                selectedAsDefault: false
            },
            {
                receiverName: 'Lê Hoàng Khanh Nguyên',
                address: "106, đường Phạm Viết Chánh, Phường Nguyễn Cư Trinh, Quận 1, Hồ Chí Minh, Việt Nam",
                phoneNumber: "0773969851",
                addressType: "workplace",
                selectedAsDefault: false
            },
        ]
        setAddress(userAddresses);
    }

    useEffect(() => {
        fetchAddress();
    }, []);

    return (
        <React.Fragment>
            <div className="container mx-auto p-5 flex flex-col mt-5 w-5/6">
                <div className="text-2xl font-bold mb-10">Địa chỉ giao hàng</div>
                <div className="text-base mb-10">Chọn địa chỉ giao hàng có sẵn bên dưới:</div>
                <Space direction="vertical" size="middle" className="grid lg:grid-cols-2 grid-cols-1">
                    {
                        address.map((item: Address) => {
                            return (
                                <Card size="small" className={item.selectedAsDefault ? `border-dashed border-green-600` : `border`}>
                                    <div className="flex flex-col relative">
                                        <p className="font-bold uppercase">{item.receiverName}</p>
                                        <p>Địa chỉ: {item.address}</p>
                                        <p>Số điện thoại: {item.phoneNumber}</p>
                                        <p>Loại địa chỉ: {getAddressTypeLabel(item.addressType)}</p>
                                        {
                                            item.selectedAsDefault ?
                                                <p className="absolute mx-auto right-0 top-0 text-green-600 font-semibold">
                                                    Mặc định
                                                </p>
                                                : null
                                        }
                                        <div className="mt-3 flex flex-row space-x-5">
                                            <Button className="bg-sky-400 text-white font-semibold"
                                                    onClick={() => router.push('/cart')}
                                            >Giao đến địa chỉ này
                                            </Button>
                                            <Button className="bg-slate-400 text-white border font-medium">Sửa</Button>
                                            {
                                                item.selectedAsDefault ? null :
                                                    <Button className="bg-red-400 text-white border font-medium">Xóa</Button>
                                            }
                                        </div>
                                    </div>
                                </Card>
                            )
                        })
                    }
                </Space>
                <div className="mt-5 flex flex-col text-lg space-x-2 space-y-2 self-center">
                    <div>Bạn muốn giao đến địa chỉ khác?</div>
                    <Button
                        icon={<FaPlus />}
                        onClick={() => {
                            setFormVisibility(true);
                        }}
                        className="border-dashed border-gray-500">
                        Thêm địa chỉ giao hàng mới
                    </Button>
                </div>
                <div className={`my-10 bg-gray-100 border ${formVisibility ? 'transition duration-150 ease-in-out' : 'hidden'}`}>
                    <div className="grid grid-cols-2 gap-4 lg:w-3/5 p-5 lg:p-0 mx-auto">
                        <div className="mt-5 font-semibold self-center">Họ tên</div>
                        <Input className="mt-5" placeholder="Nhập họ tên" />
                        <div className="font-semibold self-center">Điện thoại di động</div>
                        <Input placeholder="Nhập số điện thoại" />
                        <div className="font-semibold self-center">Tỉnh/Thành phố</div>
                        <Select placeholder="Chọn Tỉnh/Thành phố" />
                        <div className="font-semibold self-center">Quận/Huyện</div>
                        <Select placeholder="Chọn Quận/Huyện" />
                        <div className="font-semibold self-center">Phường/Xã</div>
                        <Select placeholder="Chọn Phường/Xã" />
                        <div className="font-semibold self-center">Địa chỉ</div>
                        <TextArea
                            // showCount
                            maxLength={100}
                            // onChange={onChange}
                            placeholder="Ví dụ: 227, đường Nguyễn Văn Cừ"
                            style={{ height: 100, resize: 'none' }}
                        />
                        <div className="font-semibold self-center">Loại địa chỉ</div>
                        <Radio.Group options={addressTypeOptions}
                            onChange={onAddressTypeChange}
                            value={addressType} />
                        <Checkbox className="col-start-2"
                            onChange={onDefaultAddressChange}>
                            Sử dụng địa chỉ này làm mặc định
                        </Checkbox>
                        <div className="col-start-2 flex flex-row gap-5 mb-5">
                            <Button className="bg-slate-400 text-white border font-medium"
                                onClick={() => setFormVisibility(false)}>
                                Hủy bỏ
                            </Button>
                            <Button className="bg-sky-400 text-white font-semibold">
                                Lưu thông tin
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}