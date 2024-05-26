import axios from 'axios'
import { PaymentMethod } from '../payment/PaymentAPI'

const BACKEND_PREFIX = process.env.NEXT_PUBLIC_BACKEND_PREFIX
const ORDER_PORT = process.env.NEXT_PUBLIC_ORDER_PORT



export async function POST_createOrder(
    userId: string, 
    shippingAddressId: string,
    promotionId: string,
    paymentMethod: PaymentMethod) 
{
    const url = `${BACKEND_PREFIX}:${ORDER_PORT}/buyer/order/create?userId=${userId}`
    try {
        const response = await axios.post(url, {
            shippingAddressId: shippingAddressId,
            promotionId: promotionId,
            paymentMethod: paymentMethod
        });
        if (userId == null) {
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