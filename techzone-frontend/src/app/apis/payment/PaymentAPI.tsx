import axios from 'axios'
import { Product } from '../cart/CartProductAPI';

const BACKEND_PREFIX = process.env.NEXT_PUBLIC_BACKEND_PREFIX
//local testing...
const BACKEND_PREFIX_FOR_PAYMENT = 'http://localhost'
const PAYMENT_PORT = process.env.NEXT_PUBLIC_PAYMENT_PORT

export enum PaymentMethod {
    COD = 'COD',
    ZALOPAY = 'ZALOPAY',
    PAYPAL = 'PAYPAL',
    //Add more payment methods
}

export interface ZalopayResponseData {
    return_code: number;
    return_message: string;
    sub_return_code: number;
    sub_return_message: string;
    zp_trans_token: string;
    order_url: string;
    order_token: string;
}

//return gateway url (if available)
export async function POST_processTransaction(userId: string, products: Product[], totalPrice: number, paymentMethod: PaymentMethod) {
    const method = paymentMethod.toLowerCase();
    
    // local testing...
    const url = `${BACKEND_PREFIX_FOR_PAYMENT}:${PAYMENT_PORT}/${method}/payment`
    // const url = `${BACKEND_PREFIX}:${PAYMENT_PORT}/${method}/payment`
    
    try {
        const response = await axios.post(url, {
            products: products,
            amount: totalPrice,
            userId: userId,
        });
        if (userId == null) {
            return {
                isDenied: true,
                message: "Unauthenticated",
                status: 403,
                data: undefined
            }
        }
        let responseData = response.data;
        if (response.status === 200) {
            if (paymentMethod === PaymentMethod.ZALOPAY) {
                let zalopayAPIGatewayResponse = responseData as ZalopayResponseData;
                return {
                    isDenied: false,
                    message: `Process transaction successfully with ${paymentMethod}`,
                    status: response.status,
                    data: zalopayAPIGatewayResponse.order_url,
                }
            }
            else if (paymentMethod === PaymentMethod.COD) {

            }
            else if (paymentMethod === PaymentMethod.PAYPAL) {

            }
        }
        else {
            return { isDenied: true, message: `Failed in payment process with ${paymentMethod}`, status: 500, data: undefined }
        }
    } catch (error) {
        console.error(`Failed in payment process with ${paymentMethod}`, error)
        return { isDenied: true, message: `Failed in payment process with ${paymentMethod}`, status: 500, data: undefined }
    }
}