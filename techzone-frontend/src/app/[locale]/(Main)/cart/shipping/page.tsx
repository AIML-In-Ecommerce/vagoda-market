"use client";
import { Button, Card, Space } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa6"
import { useRouter } from "next/navigation"
import { AddressForm } from "@/component/customer/shipping/AddressForm";
import { AddressType } from "@/model/AddressType";

//utils for testing process
//source: https://stackoverflow.com/questions/6860853/generate-random-string-for-div-id
function guidGenerator() {
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

export default function ShippingAddressPage() {
    const [formVisibility, setFormVisibility] = useState<boolean>(false);
    const [address, setAddress] = useState<AddressType[]>([]);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [currentAddress, setCurrentAddress] = useState<AddressType | undefined>(undefined);
    const componentRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();

    const addressTypeOptions = [
        { label: 'Nhà riêng / Chung cư', value: 'residential' },
        { label: 'Cơ quan / Công ty', value: 'workplace' },
    ];

    const getAddressTypeLabel = (value: string) => {
        const addressType = addressTypeOptions.find(option => option.value === value);
        return addressType ? addressType.label : '';
    };

    const scrollToComponent = () => {
        if (componentRef.current === null) return;
        componentRef.current.scrollIntoView({ behavior: 'smooth'});
        
    };

    //Scroll to the bottom of the screen when the user clicks on the "add address button"
    useEffect(() => {
        if (!formVisibility) return;
        scrollToComponent();
    }, [formVisibility, currentAddress, address])

    const fetchAddress = async () => {
        const userAddresses: AddressType[] = [
            {
                _id: '1',
                receiverName: 'Nguyễn Minh Quang',
                address: "135B Trần Hưng Đạo, Phường Cầu Ông Lãnh, Quận 1, Hồ Chí Minh, Việt Nam",
                phoneNumber: "0839994856",
                addressType: "residential",
                selectedAsDefault: true
            },
            {
                _id: '2',
                receiverName: 'Nguyễn Minh Quang',
                address: "227, đường Nguyễn Văn Cừ, Phường 4, Quận 5, Hồ Chí Minh, Việt Nam",
                phoneNumber: "0839994856",
                addressType: "workplace",
                selectedAsDefault: false
            },
            {
                _id: '3',
                receiverName: 'Lê Hoàng Khanh Nguyên',
                address: "106, đường Phạm Viết Chánh, Phường Nguyễn Cư Trinh, Quận 1, Hồ Chí Minh, Việt Nam",
                phoneNumber: "0773969851",
                addressType: "workplace",
                selectedAsDefault: false
            },
        ]
        setAddress(userAddresses);
    }

    const handleSetDefaultShippingAddress = (_address: AddressType | undefined) => {
        if (!_address) return;

        const updatedAddresses = address.map(item => {
            if (item._id !== _address._id) {
                return { ...item, selectedAsDefault: false };
            }
            return item;
        });
        setAddress(updatedAddresses);
    }

    const handleCreateShippingAddress = (_address: AddressType | undefined) => {
        if (!_address) return;
        let new_id = guidGenerator();
        let new_address: AddressType = { ..._address, _id: new_id }
        let updatedAddress = address.slice();
        updatedAddress.push(new_address)
        setAddress(updatedAddress);

        if (_address.selectedAsDefault) {
            handleSetDefaultShippingAddress(_address)
        }
        console.log("handleCreateShippingAddress", address)
    }

    const handleUpdateShippingAddress = (_address: AddressType | undefined) => {
        if (!_address) return;

        const updatedAddresses = address.map(item => {
            if (item._id === _address._id) {
                return { ..._address };
            }
            else if (_address.selectedAsDefault) return { ...item, selectedAsDefault: false };
            else return item;
        });
        setAddress(updatedAddresses);
    }

    const handleRemoveShippingAddress = (_id: string) => {
        const updatedAddresses = address.filter(item => item._id !== _id);
        setAddress(updatedAddresses);
    }

    const goToCartPage = (_address: AddressType) => {
        localStorage.setItem('shippingAddress', JSON.stringify(_address));
        router.push('/cart');
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
                        address.map((item: AddressType) => {
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
                                                onClick={() => goToCartPage(item)}
                                            >Giao đến địa chỉ này
                                            </Button>
                                            <Button className="bg-slate-400 text-white border font-medium"
                                                onClick={() => {
                                                    setIsEditMode(true);
                                                    setCurrentAddress(item);
                                                    console.log("Edit Mode", currentAddress);
                                                    setFormVisibility(true);
                                                }}>
                                                Sửa
                                            </Button>
                                            {
                                                item.selectedAsDefault ? null :
                                                    <Button className="bg-red-400 text-white border font-medium"
                                                        onClick={() => handleRemoveShippingAddress(item._id)}>Xóa</Button>
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
                            setIsEditMode(false);
                            setCurrentAddress(undefined);
                            console.log("Create Address", currentAddress)
                            setFormVisibility(true);
                            scrollToComponent();
                        }}
                        className="border-dashed border-gray-500">
                        Thêm địa chỉ giao hàng mới
                    </Button>
                </div>
                <div ref={componentRef}>
                    {
                        formVisibility ?
                            <AddressForm
                                setFormVisibility={setFormVisibility}
                                isEditMode={isEditMode}
                                currentAddress={currentAddress}
                                handleCreate={handleCreateShippingAddress}
                                handleUpdate={handleUpdateShippingAddress}
                            />
                            : <div></div>
                    }
                </div>
            </div>
        </React.Fragment>
    )
}