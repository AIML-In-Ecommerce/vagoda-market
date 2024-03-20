"use client";
import { AddressType } from '@/model/AddressType';
import { Select, Radio, Checkbox, Button, Input, CheckboxProps, RadioChangeEvent, Form } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect, useState } from 'react';

interface AddressFormProps {
    setFormVisibility: (value: boolean) => void
    isEditMode: boolean // true: edit mode or false: create mode
    currentAddress?: AddressType
    handleCreate: (_address: AddressType | undefined) => void
    handleUpdate: (_address: AddressType | undefined) => void
}

const addressTypeOptions = [
    { label: 'Nhà riêng / Chung cư', value: 'residential' },
    { label: 'Cơ quan / Công ty', value: 'workplace' },
];

const getAddressTypeLabel = (value: string) => {
    const addressType = addressTypeOptions.find(option => option.value === value);
    return addressType ? addressType.label : '';
};


export function AddressForm(props: AddressFormProps) {
    const [form] = Form.useForm();
    const [addressInfo, setAddressInfo] = useState<AddressType | undefined>(props.currentAddress);
    const [name, setName] = useState<string | undefined>(props.currentAddress?.receiverName);
    const [phoneNumber, setPhoneNumber] = useState<string | undefined>(props.currentAddress?.phoneNumber);
    const [address, setAddress] = useState<string | undefined>(props.currentAddress?.address);
    const [selectedAsDefault, setSelectedAsDefault] = useState<boolean | undefined>(props.currentAddress?.selectedAsDefault);
    const [addressType, setAddressType] = useState<string | undefined>(props.currentAddress?.addressType);

    useEffect(() => {
        console.log("AddressForm: ", name, phoneNumber, address, addressType, selectedAsDefault);
        setAddressInfo({
            ...addressInfo, receiverName: name,
            phoneNumber: phoneNumber,
            address: address,
            addressType: addressType,
            selectedAsDefault: selectedAsDefault
        } as AddressType)
    }, [name, phoneNumber, address, selectedAsDefault, addressType])


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
                    <Input placeholder={`${phoneNumber ?? "Nhập số điện thoại"}`}
                        value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                </Form.Item>
                <Form.Item label={
                    <span className="font-semibold text-base">
                        Tỉnh/Thành phố
                    </span>
                }
                    hasFeedback>
                    <Select placeholder="Chọn Tỉnh/Thành phố" />
                </Form.Item>
                <Form.Item label={
                    <span className="font-semibold text-base">
                        Quận/Huyện
                    </span>
                }
                    hasFeedback>
                    <Select placeholder="Chọn Quận/Huyện" />
                </Form.Item>
                <Form.Item label={
                    <span className="font-semibold text-base">
                        Phường/Xã
                    </span>
                }
                    hasFeedback>
                    <Select placeholder="Chọn Phường/Xã" />
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
                        placeholder={`${address ?? "Ví dụ: 227, đường Nguyễn Văn Cừ"}`}
                        style={{ height: 100, resize: 'none' }}
                        value={address} onChange={(e) => setAddress(e.target.value)}
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