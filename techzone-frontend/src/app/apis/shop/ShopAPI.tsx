import axios from 'axios'

const BACKEND_PREFIX = process.env.NEXT_PUBLIC_BACKEND_PREFIX
const SHOP_PORT = process.env.NEXT_PUBLIC_SHOP_PORT


export async function GET_getShopInfoById(shopId: string) {
    const url = `${BACKEND_PREFIX}:${SHOP_PORT}/shop/${shopId}`;
    try {
        const response = await axios.get(url);
        
        if (response.status === 200) {
            const responseData = response.data;
            return { isDenied: false, message: response.statusText, status: response.status, data: responseData }
        }
        else {
            return { isDenied: true, message: response.statusText, status: response.status, data: undefined }
        }
    } catch (error) {
        console.error("Failed to get shop info: ", error)
        return { isDenied: true, message: "Failed to get shop info", status: 500, data: undefined }
    }
}

