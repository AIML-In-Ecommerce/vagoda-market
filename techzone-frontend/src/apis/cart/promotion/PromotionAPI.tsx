import axios from 'axios';

export interface ShopSmallInfo {
    _id: string;
    name: string;
    avatarUrl: string;
}

export interface Promotion {
    _id: string;
    name: string;
    shop: ShopSmallInfo;
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
}

export enum DiscountType {
    PERCENTAGE = "PERCENTAGE",
    DIRECT_PRICE = "DIRECT_PRICE",
  }

export interface DiscountTypeInfo {
    type: DiscountType;
    value: number;
    lowerBoundaryForOrder: number;
    limitAmountToReduce: number;
}

export interface ShopInfo {
    _id: string;
    name: string;
    account: string;
    avatar: string;
    location: string;
    description: string;
    design: string[];
    imageCollection: string[];
    shopInfoDesign: ShopInfoDesign;
    shopDetail: ShopDetail;
    createAt: Date;
}

export interface ShopDetail {
    cancelPercentage: number;
    refundPercentage: number;
    sinceYear: number;
    totalProductNumber: number;
    rating: number;
    replyPercentage: number;
    _id: string;
}

export interface ShopInfoDesign {
    color: string;
    avatarUrl: string;
    bannerUrl: string;
    _id: string;
}


const GATEWAY_PREFIX = process.env.NEXT_PUBLIC_GATEWAY_PREFIX
const BACKEND_PREFIX = process.env.NEXT_PUBLIC_BACKEND_PREFIX;
const CART_PORT = process.env.NEXT_PUBLIC_CART_PORT;

// const publicAPIURL = `${BACKEND_PREFIX}:${CART_PORT}`
const publicAPIURL = `${GATEWAY_PREFIX}`

export async function GET_GetAllPromotionByShopId(shopId: string) {
    const url = `${publicAPIURL}/promotion/shop/all?shopId=${shopId}`
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

export async function GET_GetPromotionWithSelection(
    shopId: string,
    lowerBoundaryForOrder?: number,
    targetProducts?: string[],
    inActive?: boolean
) {
    const url = `${publicAPIURL}/promotion/shop/selection`
    try {
        const response = await axios.post(url, {
            "shopId": shopId,
            "lowerBoundaryForOrder": lowerBoundaryForOrder ?? null,
            "targetProducts": targetProducts ?? [],
            "inActive": inActive ?? null
        });
        let responseData = response.data;
        if (response.status === 200) {
            let promotionsData = responseData.data;
            return { isDenied: false, message: "Get promotions successfully", status: response.status, data: promotionsData }
        }
        else {
            return { isDenied: true, message: "Failed to get promotions from shop", status: 500, data: undefined }
        }
    } catch (error) {
        console.error("Failed to get promotions from shop: ", error)
        return { isDenied: true, message: "Failed to get promotions from shop", status: 500, data: undefined }
    }
}