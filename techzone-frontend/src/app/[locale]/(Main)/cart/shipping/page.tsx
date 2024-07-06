"use client";
import { Button, Card, Empty, Skeleton, Space } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa6"
import { useRouter } from "next/navigation"
import { AddressForm } from "@/component/customer/shipping/AddressForm";
// import { Address, ShippingAddress } from "@/model/ShippingAddress";
import { DELETE_removeUserShippingAddress, GET_getUserShippingAddress, POST_addUserShippingAddress, PUT_updateUserShippingAddress, ShippingAddress, getFullAddress } from "@/apis/cart/AddressAPI";
import { Address } from "@/model/AddressType";
import { AuthContext } from "@/context/AuthContext";

//utils for testing process
//source: https://stackoverflow.com/questions/6860853/generate-random-string-for-div-id
function guidGenerator() {
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

const initialAddress = {
    _id: guidGenerator()
} as ShippingAddress

export default function ShippingAddressPage() {
    const context = useContext(AuthContext)
    const [formVisibility, setFormVisibility] = useState<boolean>(false);
    const [address, setAddress] = useState<ShippingAddress[]>([]);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [currentAddress, setCurrentAddress] = useState<ShippingAddress>(initialAddress);
    const [loading, setLoading] = useState<boolean>(false);

    const componentRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();

    const ShippingAddressOptions = [
        { label: 'Nhà riêng / Chung cư', value: 'HOME' },
        { label: 'Cơ quan / Công ty', value: 'OFFICE' },
    ];

    const getShippingAddressLabel = (value: string) => {
        const ShippingAddress = ShippingAddressOptions.find(option => option.value === value);
        return ShippingAddress ? ShippingAddress.label : '';
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
        // const userAddresses: ShippingAddress[] = [
        //     {
        //         _id: '1',
        //         receiverName: 'Nguyễn Minh Quang',
        //         address: {
        //             street: "135B Trần Hưng Đạo",
        //             idProvince: "79",
        //             idDistrict: "760",
        //             idCommune: "26752",
        //             country: "Việt Nam"
        //         },
        //         phoneNumber: "0839994856",
        //         ShippingAddress: "HOME",
        //         selectedAsDefault: true
        //     },
        //     {
        //         _id: '2',
        //         receiverName: 'Nguyễn Minh Quang',
        //         address: {
        //             street: "227 Nguyễn Văn Cừ",
        //             idProvince: "79",
        //             idDistrict: "774",
        //             idCommune: "27301",
        //             country: "Việt Nam"
        //         },
        //         phoneNumber: "0839994856",
        //         ShippingAddress: "OFFICE",
        //         selectedAsDefault: false
        //     },
        //     {
        //         _id: '3',
        //         receiverName: 'Lê Hoàng Khanh Nguyên',
        //         address: {
        //             street: "106, Phạm Viết Chánh",
        //             idProvince: "79",
        //             idDistrict: "760",
        //             idCommune: "26758",
        //             country: "Việt Nam"
        //         },
        //         phoneNumber: "0773969851",
        //         ShippingAddress: "OFFICE",
        //         selectedAsDefault: false
        //     },
        // ]
        setLoading(true);
        
        const data = (await GET_getUserShippingAddress(context.userInfo?._id as string)).data!;
        setAddress(data);
        setLoading(false);
    }

    const handleSetDefaultShippingAddress = (_address: ShippingAddress | undefined) => {
        if (!_address || !address) return;

        address.forEach(async (item) => {
            if (item._id !== _address._id) {
                await PUT_updateUserShippingAddress(
                    context.userInfo?._id as string,
                    { ...item, isDefault: false } as ShippingAddress);
            }
        });

    }

    const handleCreateShippingAddress = async (_address: ShippingAddress | undefined) => {
        if (!_address) return;

        await POST_addUserShippingAddress(context.userInfo?._id as string, _address);
        if (_address.isDefault) {
            handleSetDefaultShippingAddress(_address)
        }
        await fetchAddress();
        console.log("handleCreateShippingAddress", address)
    }

    const handleUpdateShippingAddress = async (_address: ShippingAddress | undefined) => {
        if (!_address) return;

        await PUT_updateUserShippingAddress(context.userInfo?._id as string, _address);
        await fetchAddress();
    }

    const handleRemoveShippingAddress = async (_id: string) => {
        await DELETE_removeUserShippingAddress(context.userInfo?._id as string, _id);
        await fetchAddress();
    }

    const goToCartPage = (_address: ShippingAddress) => {
        localStorage.setItem('shippingAddress', JSON.stringify(_address));
        router.push('/cart');
    }

    useEffect(() => {
        if (context.userInfo) {
            fetchAddress();
        }
    }, [context.userInfo]);

    return (
        <React.Fragment>
            <div className="container mx-auto p-5 flex flex-col mt-5 w-5/6">
                <div className="text-2xl font-bold mb-10">Địa chỉ giao hàng</div>
                <div className="text-base mb-10">Chọn địa chỉ giao hàng có sẵn bên dưới:</div>
                <Space direction="vertical" align="center" size="middle" className="grid lg:grid-cols-2 grid-cols-1">
                    {
                        loading ? <Skeleton active={loading} /> : address ? address.map((item: ShippingAddress, index: number) => {
                            const addressItem = {
                                street: item.street,
                                idProvince: item.idProvince,
                                idDistrict: item.idDistrict,
                                idCommune: item.idCommune,
                                country: item.country
                            } as Address;
                            return (
                                <div key={index}>
                                    <Card size="small" className={item.isDefault ? `border-dashed border-green-600` : `border`}>
                                        <div className="flex flex-col relative">
                                            <p className="font-bold uppercase">{item.receiverName}</p>
                                            <p className="truncate">Địa chỉ: {getFullAddress(addressItem)}</p>
                                            <p>Số điện thoại: {item.phoneNumber}</p>
                                            <p>Loại địa chỉ: {getShippingAddressLabel(item.label)}</p>
                                            {
                                                item.isDefault ?
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
                                                    item.isDefault ? null :
                                                        <Button className="bg-red-400 text-white border font-medium"
                                                            onClick={() => handleRemoveShippingAddress(item._id)}>Xóa</Button>
                                                }
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            )
                        }) : <Empty description={"Không có địa chỉ nào đã lưu"} />
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