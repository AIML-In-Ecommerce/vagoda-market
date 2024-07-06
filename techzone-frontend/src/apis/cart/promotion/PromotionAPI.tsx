import axios from 'axios';

export interface Promotion {
    _id: string;
    name: string;
    shop: string;
    description: string;
    discountTypeInfo: DiscountTypeInfo;
    activeDate: Date;
    expiredDate: Date;
    targetProducts: string[];
    quantity: number;
    redeemedTotal: number;
    status: string;
    code: string;
    createAt: Date;
    __v: number;
}

export interface DiscountTypeInfo {
    type: string;
    value: number;
    lowerBoundaryForOrder: number;
    limitAmountToReduce: number;
}

const GATEWAY_PREFIX = process.env.NEXT_PUBLIC_GATEWAY_PREFIX

export async function GET_GetAllPromotionByShopId(shopId: string) {
    const url = `${GATEWAY_PREFIX}/promotion/shop/all?shopId=${shopId}`
    try {
        const response = await axios.get(url);
        let responseData = response.data;
        if (response.status === 200) {
            let ordersData = responseData.data;
            return { isDenied: false, message: "Get promotions successfully", status: response.status, data: ordersData }
        }
        else {
            return { isDenied: true, message: "Failed to get promotions from shop", status: 500, data: undefined }
        }
    } catch (error) {
        console.error("Failed to get promotions from shop: ", error)
        return { isDenied: true, message: "Failed to get promotions from shop", status: 500, data: undefined }
    }
}
