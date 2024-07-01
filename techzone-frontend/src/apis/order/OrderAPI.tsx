import axios from 'axios'

const BACKEND_PREFIX = process.env.NEXT_PUBLIC_BACKEND_PREFIX
const ORDER_PORT = process.env.NEXT_PUBLIC_ORDER_PORT
// const HTTP_BACKEND_PREFIX = `${BACKEND_PREFIX}:${ORDER_PORT}`
const GATEWAY_PREFIX = process.env.NEXT_PUBLIC_GATEWAY_PREFIX

export interface Order {
    _id:             string;
    user:            User;
    shop:            Shop;
    products:        Product[];
    promotion:       null;
    paymentMethod:   PaymentMethod;
    shippingFee:     number;
    totalPrice:      number;
    profit:          number;
    shippingAddress: ShippingAddress;
    orderStatus:     OrderStatus[];
    __v:             number;
}

export interface OrderStatus {
    status:   string;
    complete: Date | null;
    time:     Date;
    deadline: Date;
    _id:      string;
}

export interface PaymentMethod {
    kind:       string;
    name:       string;
    zpTransId:  number;
    zpUserId:   string;
    appTransId: string;
    isPaid:     boolean;
    paidAt:     Date;
}

export interface Product {
    brand:           string;
    isFlashSale:     boolean;
    inventoryAmount: number;
    _id:             string;
    name:            string;
    attribute:       any[];
    description:     string;
    originalPrice:   number;
    category:        Category;
    subCategory:     SubCategory;
    shop:            string;
    platformFee:     number;
    status:          string;
    avgRating:       number;
    createAt:        Date;
    soldQuantity:    number;
    subCategoryType: SubCategoryType;
    images:          string[];
    createdAt:       Date;
    purchasedPrice:  number;
    quantity:        number;
}

export interface Category {
    _id:           string;
    name:          string;
    subCategories: any[];
    __v:           number;
    image:         string;
}

export interface SubCategory {
    _id:              string;
    name:             string;
    category:         string;
    subCategories:    any[];
    subCategoryTypes: any[];
    __v:              number;
}

export interface SubCategoryType {
    _id:         string;
    name:        string;
    subCategory: string;
    __v:         number;
}

export interface ShippingAddress {
    receiverName: string;
    street:       string;
    idProvince:   string;
    idDistrict:   string;
    idCommune:    string;
    country:      string;
    phoneNumber:  string;
    label:        string;
    isDefault:    boolean;
    _id:          string;
}

export interface Shop {
    _id:      string;
    name:     string;
    location: string;
}

export interface User {
    _id:      string;
    fullName: string;
}



export async function GET_GetAllOrders(userId: string) {
    const url = `${GATEWAY_PREFIX}/buyer/orders?userId=${userId}`
    try {
        const response = await axios.get(url);
        if (userId == null) {
            return { isDenied: true, message: "Unauthenticated", status: 403, data: undefined }
        }
        let responseData = response.data;
        if (response.status === 200) {
            let ordersData = responseData.data;
            return { isDenied: false, message: "Get orders successfully", status: response.status, data: ordersData }
        }
        else {
            return { isDenied: true, message: "Failed to get orders", status: 500, data: undefined }
        }
    } catch (error) {
        console.error("Failed to get orders: ", error)
        return { isDenied: true, message: "Failed to get orders", status: 500, data: undefined }
    }
}

export async function GET_GetOrderById(orderId: string) {
    const url = `${GATEWAY_PREFIX}/buyer/order?orderId=${orderId}`
    try {
        const response = await axios.get(url);
        let responseData = response.data;
        if (response.status === 200) {
            let orderData = responseData.data;
            return { isDenied: false, message: "Get order successfully", status: response.status, data: orderData }
        }
        else {
            return { isDenied: true, message: "Failed to Get order", status: 500, data: undefined }
        }
    } catch (error) {
        console.error("Failed to Get order: ", error)
        return { isDenied: true, message: "Failed to Get order", status: 500, data: undefined }
    }
}

export async function POST_createOrder(
    userId: string, 
    shippingAddressId: string,
    promotionId: string,
    paymentMethodId: string) 
{
    const url = `${GATEWAY_PREFIX}/buyer/order/create?userId=${userId}`
    try {
        const response = await axios.post(url, {
            shippingAddressId: shippingAddressId,
            promotionIds: [],
            paymentMethodId: paymentMethodId
        });
        if (userId === null) {
            return { isDenied: true, message: "Unauthenticated", status: 403, data: undefined }
        }
        let responseData = response.data;
        if (response.status === 200) {
            let orderData = responseData.data;
            return { isDenied: false, message: "Create order successfully", status: response.status, data: orderData }
        }
        else {
            return { isDenied: true, message: "Failed to create order", status: 500, data: undefined }
        }
    } catch (error) {
        console.error("Failed to create order: ", error)
        return { isDenied: true, message: "Failed to create order", status: 500, data: undefined }
    }
}