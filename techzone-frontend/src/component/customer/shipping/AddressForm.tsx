"use client";
import { getProvince, getDistrict, getCommune, Commune, District, Province, ShippingAddress } from '@/app/apis/cart/AddressAPI';
import { Address, AddressType } from '@/model/AddressType';
import { Select, Radio, Checkbox, Button, Input, CheckboxProps, RadioChangeEvent, Form } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect, useMemo, useState } from 'react';

interface AddressFormProps {
    setFormVisibility: (value: boolean) => void
    isEditMode: boolean // true: edit mode or false: create mode
    currentAddress: ShippingAddress | undefined
    handleCreate: (_address: ShippingAddress | undefined) => void
    handleUpdate: (_address: ShippingAddress | undefined) => void
}

const addressTypeOptions = [
    { label: 'Nhà riêng / Chung cư', value: 'HOME' },
    { label: 'Cơ quan / Công ty', value: 'OFFICE' },
];

const getAddressTypeLabel = (value: string) => {
    const addressType = addressTypeOptions.find(option => option.value === value);
    return addressType ? addressType.label : '';
};


export function AddressForm(props: AddressFormProps) {
    const [form] = Form.useForm();

    const [name, setName] = useState<string>(props.currentAddress?.receiverName || "");
    const [phoneNumber, setPhoneNumber] = useState<string>(props.currentAddress?.phoneNumber || "");
    const [street, setStreet] = useState<string>(props.currentAddress?.street || "");
    const [selectedAsDefault, setSelectedAsDefault] = useState<boolean>(props.currentAddress?.isDefault || false);

    const [provinceList, setProvinceList] = React.useState<Province[]>([]);
    const [districtList, setDistrictList] = React.useState<District[]>([]);
    const [communeList, setCommuneList] = React.useState<Commune[]>([]);
    const [provinceValue, setProvinceValue] = React.useState<string>(props.currentAddress?.idProvince || "0");
    const [districtValue, setDistrictValue] = React.useState<string>(props.currentAddress?.idDistrict || "0");
    const [communeValue, setCommuneValue] = React.useState<string>(props.currentAddress?.idCommune || "0");
    const [isLoadingDistrict, setIsLoadingDistrict] = React.useState(false);
    const [isLoadingCommune, setIsLoadingCommune] = React.useState(false);
    const [addressType, setAddressType] = React.useState<string>(props.currentAddress?.label || "HOME");

    const address = useMemo<Address>(() => {
        const currentAddress = {
            ...props.currentAddress,
            street: street,
            idCommune: communeValue,
            idDistrict: districtValue,
            idProvince: provinceValue,
        } as Address;
        return currentAddress;
    }, [street, communeValue, districtValue, provinceValue]);

    const addressInfo = useMemo<ShippingAddress>(() => ({
        ...props.currentAddress,
        receiverName: name,
        phoneNumber: phoneNumber,
        label: addressType,
        isDefault: selectedAsDefault,
        street: address.street,
        idProvince: address.idProvince,
        idDistrict: address.idDistrict,
        idCommune: address.idCommune,
        country: address.country,
        coordinite: null,
    } as ShippingAddress), [name, phoneNumber, addressType, address, selectedAsDefault, props.currentAddress]);

    useEffect(() => {
        console.log("AddressForm " + props.isEditMode, props.currentAddress);
    }, [props.currentAddress])

    // useEffect(() => {
    //     getProvince().then((value: any) => setProvinceList(value));
    //     handleChangeProvince(provinceValue);
    //     handleChangeDistrict(districtValue);
    //     handleChangeCommune(communeValue);
    // }, []);

    useEffect(() => {
        const fetchAddressData = async () => {
            const provinces = getProvince();
            setProvinceList(provinces);

            if (provinceValue !== "0") {
                setIsLoadingDistrict(true);
                const districts = getDistrict(provinceValue);
                setDistrictList(districts);
                setIsLoadingDistrict(false);
            }

            if (districtValue !== "0") {
                setIsLoadingCommune(true);
                const communes = getCommune(districtValue);
                setCommuneList(communes);
                setIsLoadingCommune(false);
            }
        };

        fetchAddressData();
    }, [provinceValue, districtValue, communeValue]);


    const provinceOptions = useMemo(() => {
        return [
            { label: "Chọn Tỉnh/Thành phô...", value: "0" },
            ...provinceList.map((province: any) => ({
                label: province.name,
                value: province.idProvince,
            }))
        ];
    }, [provinceList]);

    const districtOptions = useMemo(() => {
        return [
            { label: "Chọn Quận/Huyện...", value: "0" },
            ...districtList.map((district: any) => ({
                label: district.name,
                value: district.idDistrict,
            }))
        ];
    }, [districtList]);

    const communeOptions = useMemo(() => {
        return [
            { label: "Chọn Phường/Xã...", value: "0" },
            ...communeList.map((commune: any) => ({
                label: commune.name,
                value: commune.idCommune,
            }))
        ];
    }, [communeList]);

    const handleChangeProvince = async (idProvince: string) => {
        const value = idProvince;
        setProvinceValue(idProvince);
        console.log("Province value changed", idProvince);

        if (value === "0") {
            setDistrictList([]);
            setCommuneList([]);
            setDistrictValue("0");
            setCommuneValue("0");
            return;
        }
        setIsLoadingDistrict(true);
        const districtList = getDistrict(value);
        //Clear commune options, set default values for district and commune
        setCommuneList([]);
        setDistrictValue("0");
        setCommuneValue("0");
        setDistrictList(districtList);
        setIsLoadingDistrict(false);
    };

    const handleChangeDistrict = async (idDistrict: string) => {
        const value = idDistrict;
        setDistrictValue(value);
        if (value === "0") {
            setCommuneList([]);
            setCommuneValue("0");
        } else {
            setIsLoadingCommune(true);
            const communeList = getCommune(value);
            setCommuneList(communeList);
            //Clear commune options, set default value for commune
            setCommuneValue("0");
            setIsLoadingCommune(false);
        }
    };
    const handleChangeCommune = (idCommnue: string) => {
        setCommuneValue(idCommnue);
    };

    const onConfirmation = () => {
        if (props.isEditMode) {
            props.handleUpdate(addressInfo);
        }
        else {
            props.handleCreate(addressInfo);
        }
    }

    const onFinish = () => {
        onConfirmation();
        props.setFormVisibility(false);
    }

    return (
        <div className="my-10 bg-gray-100 border">
            {
                props.isEditMode ?
                    <div className="mt-5 text-center font-bold uppercase text-xl">CẬP NHẬT</div>
                    : <div className="mt-5 text-center font-bold uppercase text-xl">THÊM ĐỊA CHỈ</div>
            }
            <Form labelCol={{ span: 6 }} wrapperCol={{ span: 15 }}
                className="mt-5 lg:w-1/2 p-5 lg:p-0 mx-auto"
                form={form} onFinish={onFinish} scrollToFirstError>
                <Form.Item name="name" initialValue={name}
                    label={
                        <span className="font-semibold text-base">
                            Họ tên
                        </span>
                    }
                    hasFeedback
                    rules={[{ required: true, message: 'Vui lòng nhập họ tên người nhận' }]}>
                    <Input placeholder={"Nhập họ tên"}
                        value={name} onChange={(e) => setName(e.target.value)}
                    />
                </Form.Item>
                <Form.Item name="phoneNumber" initialValue={phoneNumber}
                    label={
                        <span className="font-semibold text-base">
                            Số điện thoại
                        </span>
                    }
                    hasFeedback
                    rules={[{ required: true, message: 'Vui lòng nhập số điện thoại người nhận' }]}>
                    <Input placeholder={`Ví dụ: 0123456789`}
                        value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                </Form.Item>
                <Form.Item label={
                    <span className="font-semibold text-base">
                        Tỉnh/Thành phố
                    </span>
                }
                    hasFeedback>
                    <Select placeholder=" Chọn Thành Phố/Tỉnh"
                        defaultValue={provinceValue}
                        value={provinceValue}
                        options={provinceOptions}
                        onChange={handleChangeProvince}>
                    </Select>
                </Form.Item>
                <Form.Item label={
                    <span className="font-semibold text-base">
                        Quận/Huyện
                    </span>
                }
                    hasFeedback>
                    <Select placeholder=" Chọn Quận/Huyện"
                        defaultValue={districtValue}
                        value={districtValue}
                        options={districtOptions}
                        loading={isLoadingDistrict}
                        onChange={handleChangeDistrict}>
                    </Select>
                </Form.Item>
                <Form.Item label={
                    <span className="font-semibold text-base">
                        Phường/Xã
                    </span>
                }
                    hasFeedback>
                    <Select placeholder=" Chọn Phường/Xã"
                        defaultValue={communeValue}
                        value={communeValue}
                        options={communeOptions}
                        loading={isLoadingCommune}
                        onChange={handleChangeCommune}>
                    </Select>
                </Form.Item>
                <Form.Item label={
                    <span className="font-semibold text-base">
                        Địa chỉ
                    </span>
                }
                    hasFeedback>
                    <TextArea
                        // showCount
                        maxLength={100}
                        // onChange={onChange}
                        placeholder={`Ví dụ: 227, đường Nguyễn Văn Cừ`}
                        style={{ height: 100, resize: 'none' }}
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                    />
                </Form.Item>
                <Form.Item label={
                    <span className="font-semibold text-base">
                        Loại địa chỉ
                    </span>
                }
                    required
                    rules={[{ required: true, message: 'Vui lòng chọn loại địa chỉ' }]}
                    hasFeedback>
                    <Radio.Group
                        options={addressTypeOptions}
                        onChange={(e) => setAddressType(e.target.value)}
                        value={addressType} />
                </Form.Item>
                <Form.Item wrapperCol={{ span: 25, offset: 6 }}>
                    <Checkbox
                        className="text-base"
                        onChange={(e) => setSelectedAsDefault(e.target.checked)}
                        checked={selectedAsDefault}>
                        Sử dụng địa chỉ này làm mặc định
                    </Checkbox>
                </Form.Item>
                <Form.Item wrapperCol={{ span: 25, offset: 6 }}>
                    <div className="flex gap-6">
                        <Button className="bg-slate-400 text-white border font-medium"
                            onClick={() => props.setFormVisibility(false)}>
                            Hủy bỏ
                        </Button>
                        <Button className="bg-sky-400 text-white font-semibold"
                            htmlType="submit">
                            Lưu thông tin
                        </Button>
                    </div>
                </Form.Item>
            </Form >
        </div >
    )
}