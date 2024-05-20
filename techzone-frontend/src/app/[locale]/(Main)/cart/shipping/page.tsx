"use client";
import { Button, Card, Space } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa6"
import { useRouter } from "next/navigation"
import { AddressForm } from "@/component/customer/shipping/AddressForm";
import { Address, AddressType } from "@/model/AddressType";
import { getFullAddress } from "@/app/apis/cart/AddressAPI";

//utils for testing process
//source: https://stackoverflow.com/questions/6860853/generate-random-string-for-div-id
function guidGenerator() {
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

const initialAddress = {
    _id: guidGenerator(),
    receiverName: "",
    address: {
        street: "",
        idCommune: "",
        idDistrict: "",
        idProvince: "",
        country: ""
    } as Address,
    phoneNumber: "",
    addressType: "residential",
    selectedAsDefault: false
} as AddressType

export default function ShippingAddressPage() {
    const [formVisibility, setFormVisibility] = useState<boolean>(false);
    const [address, setAddress] = useState<AddressType[]>([]);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [currentAddress, setCurrentAddress] = useState<AddressType>(initialAddress);

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
        componentRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    //Scroll to the bottom of the screen when the user clicks on the "add address button"
    useEffect(() => {
        scrollToComponent();
    }, [formVisibility])

    const fetchAddress = async () => {
        const userAddresses: AddressType[] = [
            {
                _id: '1',
                receiverName: 'Nguyễn Minh Quang',
                address: {
                    street: "135B Trần Hưng Đạo",
                    idProvince: "79",
                    idDistrict: "760",
                    idCommune: "26752",
                    country: "Việt Nam"
                },
                phoneNumber: "0839994856",
                addressType: "residential",
                selectedAsDefault: true
            },
            {
                _id: '2',
                receiverName: 'Nguyễn Minh Quang',
                address: {
                    street: "227 Nguyễn Văn Cừ",
                    idProvince: "79",
                    idDistrict: "774",
                    idCommune: "27301",
                    country: "Việt Nam"
                },
                phoneNumber: "0839994856",
                addressType: "workplace",
                selectedAsDefault: false
            },
            {
                _id: '3',
                receiverName: 'Lê Hoàng Khanh Nguyên',
                address: {
                    street: "106, Phạm Viết Chánh",
                    idProvince: "79",
                    idDistrict: "760",
                    idCommune: "26758",
                    country: "Việt Nam"
                },
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
                        address.map((item: AddressType, index: number) => {
                            return (
                                <div key={index}>
                                    <Card size="small" className={item.selectedAsDefault ? `border-dashed border-green-600` : `border`}>
                                        <div className="flex flex-col relative">
                                            <p className="font-bold uppercase">{item.receiverName}</p>
                                            <p className="truncate">Địa chỉ: {getFullAddress(item.address)}</p>
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
                                                        setFormVisibility(false);
                                                        console.log("Edit Mode");
                                                        setIsEditMode(true);
                                                        setCurrentAddress(item);
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
                                </div>
                            )
                        })
                    }
                </Space>
                <div className="mt-5 flex flex-col text-lg space-x-2 space-y-2 self-center">
                    <div>Bạn muốn giao đến địa chỉ khác?</div>
                    <Button
                        icon={<FaPlus />}
                        onClick={() => {
                            setFormVisibility(false);
                            console.log("Create Mode");
                            setIsEditMode(false);
                            setCurrentAddress(initialAddress);
                            setFormVisibility(true);
                        }}
                        className="border-dashed border-gray-500">
                        Thêm địa chỉ giao hàng mới
                    </Button>
                </div>
                <div ref={componentRef}>
                    {
                        formVisibility ? <AddressForm
                            setFormVisibility={setFormVisibility}
                            isEditMode={isEditMode}
                            currentAddress={currentAddress}
                            handleCreate={handleCreateShippingAddress}
                            handleUpdate={handleUpdateShippingAddress}
                        /> : <></>
                    }
                </div>
            </div>
        </React.Fragment>
    )
}