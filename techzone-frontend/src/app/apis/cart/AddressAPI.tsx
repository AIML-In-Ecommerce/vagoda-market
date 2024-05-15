import axios from 'axios';
import './db.json';
import { Address } from '@/model/AddressType';

const apiUrl = "https://vietnam-administrative-division-json-server-swart.vercel.app";
const apiEndpointProvince = apiUrl + "/province";
const apiEndpointDistrict = apiUrl + "/district/?idProvince=";
const apiEndpointCommune = apiUrl + "/commune/?idDistrict=";

export async function getProvince() {
    const { data: provinceList } = await axios.get(
        apiEndpointProvince
    );
    return provinceList;
}

export async function getDistrict(idProvince: any) {
    const { data: districtList } = await axios.get(
        apiEndpointDistrict + idProvince
    );
    return districtList;
}

export async function getCommune(idDistrict: any) {
    const { data: communeList } = await axios.get(
        apiEndpointCommune + idDistrict
    );
    return communeList;
}

export async function getFullAddress(address: Address): Promise<string> {
    const { street, idProvince, idDistrict, idCommune, country } = address;

    try {
        const [provinces, districts, communes] = await Promise.all([
            getProvince(),
            getDistrict(idProvince),
            getCommune(idDistrict)
        ]);

        const province = provinces.find((p: any) => p.idProvince === idProvince);
        const district = districts.find((d: any) => d.idDistrict === idDistrict);
        const commune = communes.find((c: any) => c.idCommune === idCommune);

        const provinceName = province.name;
        const districtName = district.name;
        const communeName = commune.name;

        return `${street}, ${communeName}, ${districtName}, ${provinceName}, ${country}`;
    } catch (error) {
        console.error("Failed to get full address:", error);
        return 'Address not found';
    }
}

