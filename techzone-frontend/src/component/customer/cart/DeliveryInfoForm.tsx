"use client";
import { Address, AddressType } from '@/model/AddressType'
import { Checkbox, Input, Select } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { getProvince, getDistrict, getCommune } from '@/app/apis/cart/AddressAPI';

interface DeliveryInfoFormProps {
    currentAddress: AddressType | undefined;
}

export default function DeliveryInfoForm(props: DeliveryInfoFormProps) {
    const addressInfo = useMemo(() => {
        const address = props.currentAddress;
        return address;
    }, [props.currentAddress]);

    const [name, setName] = useState<string>(addressInfo!.receiverName || '');
    const [phoneNumber, setPhoneNumber] = useState<string>(addressInfo!.phoneNumber || '');
    const [address, setAddress] = useState<Address | undefined>(addressInfo!.address);
    // const [selectedAsDefault, setSelectedAsDefault] = useState<boolean | undefined>(props.currentAddress?.selectedAsDefault);

    const [provinceList, setProvinceList] = React.useState([]);
    const [districtList, setDistrictList] = React.useState([]);
    const [communeList, setCommuneList] = React.useState([]);
    const [provinceValue, setProvinceValue] = React.useState(address?.idProvince || "0");
    const [districtValue, setDistrictValue] = React.useState(address?.idDistrict || "0");
    const [communeValue, setCommuneValue] = React.useState(address?.idCommune || "0");
    const [isLoadingDistrict, setIsLoadingDistrict] = React.useState(false);
    const [isLoadingCommune, setIsLoadingCommune] = React.useState(false);

    // useEffect(() => {
    //     getProvince().then((value: any) => setProvinceList(value));
    //     handleChangeProvince(provinceValue);
    //     handleChangeDistrict(districtValue);
    //     handleChangeCommune(communeValue);
    // },[]);

    useEffect(() => {
        const fetchAddressData = async () => {
            const storedProvinces = localStorage.getItem('provinceList');
            const storedDistricts = localStorage.getItem('districtList');
            const storedCommunes = localStorage.getItem('communeList');

            if (storedProvinces && storedDistricts && storedCommunes) {
                setProvinceList(JSON.parse(storedProvinces));
                setDistrictList(JSON.parse(storedDistricts));
                setCommuneList(JSON.parse(storedCommunes));
            } else {
                const provinces = await getProvince();
                setProvinceList(provinces);
                localStorage.setItem('provinceList', JSON.stringify(provinces));

                if (provinceValue !== "0") {
                    setIsLoadingDistrict(true);
                    const districts = await getDistrict(provinceValue);
                    setDistrictList(districts);
                    localStorage.setItem('districtList', JSON.stringify(districts));
                    setIsLoadingDistrict(false);

                    if (districtValue !== "0") {
                        setIsLoadingCommune(true);
                        const communes = await getCommune(districtValue);
                        setCommuneList(communes);
                        localStorage.setItem('communeList', JSON.stringify(communes));
                        setIsLoadingCommune(false);
                    }
                }
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
        const districtList = await getDistrict(value);
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
            const communeList = await getCommune(value);
            setCommuneList(communeList);
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
            <Checkbox><div className="font-semibold">Lưu vào sổ địa chỉ để dùng cho lần giao hàng tiếp theo</div></Checkbox>
        </div>
    )
}
