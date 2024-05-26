"use client";
import { Address, AddressType } from '@/model/AddressType'
import { Checkbox, CheckboxProps, Input, Select } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { getProvince, getDistrict, getCommune, Province, Commune, District, ShippingAddress } from '@/app/apis/cart/AddressAPI';

interface DeliveryInfoFormProps {
    currentAddress: ShippingAddress | undefined;
    setIsSavingAddress: (isSavingAddress: boolean) => void;
}

export default function DeliveryInfoForm(props: DeliveryInfoFormProps) {
    const addressInfo = useMemo(() => {
        const address = props.currentAddress;
        return address;
    }, [props.currentAddress]);

    const [name, setName] = useState<string>(addressInfo!.receiverName || '');
    const [phoneNumber, setPhoneNumber] = useState<string>(addressInfo!.phoneNumber || '');
    const [address, setAddress] = useState<Address | undefined>({
        street: addressInfo?.street,
        idProvince: addressInfo?.idProvince,
        idDistrict: addressInfo?.idDistrict,
        idCommune: addressInfo?.idCommune,
        country: addressInfo?.country,
    } as Address);
    const [provinceList, setProvinceList] = React.useState<Province[]>([]);
    const [districtList, setDistrictList] = React.useState<District[]>([]);
    const [communeList, setCommuneList] = React.useState<Commune[]>([]);
    const [provinceValue, setProvinceValue] = React.useState(address?.idProvince || "0");
    const [districtValue, setDistrictValue] = React.useState(address?.idDistrict || "0");
    const [communeValue, setCommuneValue] = React.useState(address?.idCommune || "0");
    const [isLoadingDistrict, setIsLoadingDistrict] = React.useState(false);
    const [isLoadingCommune, setIsLoadingCommune] = React.useState(false);
    const [checked, setIsChecked] = React.useState<boolean>(false);

    // useEffect(() => {
    //     getProvince().then((value: any) => setProvinceList(value));
    //     handleChangeProvince(provinceValue);
    //     handleChangeDistrict(districtValue);
    //     handleChangeCommune(communeValue);
    // },[]);

    const onSavingAddress: CheckboxProps['onChange'] = (e) => {
        props.setIsSavingAddress(e.target.checked);
        setIsChecked(e.target.checked);
    }

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

        if (value === "0") {
            setDistrictList([]);
            setCommuneList([]);
            setDistrictValue("0");
            setCommuneValue("0");
            return;
        }
        setIsLoadingDistrict(true);
        const districtList = getDistrict(value);
        setDistrictList(districtList);
        //Clear commune options, set default values for district and commune
        setCommuneList([]);
        setDistrictValue("0");
        setCommuneValue("0");
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

    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-5">
                <Input className="border-1 border-gray-400 rounded-xl"
                    size="large" placeholder='Họ tên'
                    value={name}
                    onChange={(e) => setName(e.target.value)}></Input>
                <Input className="border-1 border-gray-400 rounded-xl"
                    size="large" placeholder='Số điện thoại'
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}></Input>
            </div>
            <Input className="border-1 border-gray-400 rounded-xl" size="large" placeholder='Địa chỉ'
                value={address!.street}></Input>
            <div className="grid grid-cols-3 gap-5">
                <Select size="large" placeholder=" Chọn Thành Phố/Tỉnh"
                    defaultValue={provinceValue}
                    value={provinceValue}
                    options={provinceOptions}
                    onChange={handleChangeProvince}>
                </Select>
                <Select size="large" placeholder=" Chọn Quận/Huyện"
                    defaultValue={districtValue}
                    value={districtValue}
                    options={districtOptions}
                    loading={isLoadingDistrict}
                    onChange={handleChangeDistrict}>
                </Select>
                <Select size="large" placeholder=" Chọn Phường/Xã"
                    defaultValue={communeValue}
                    value={communeValue}
                    options={communeOptions}
                    loading={isLoadingCommune}
                    onChange={handleChangeCommune}>
                </Select>
            </div>
            <Input className="border-1 border-gray-400 rounded-xl" size="large" placeholder='Ghi chú thêm (Ví dụ: Giao hàng giờ hành chính)'></Input>
            <Checkbox checked={checked} onChange={onSavingAddress}>
                <div className="font-semibold">Lưu vào sổ địa chỉ để dùng cho lần giao hàng tiếp theo</div>
            </Checkbox>
        </div>
    )
}
