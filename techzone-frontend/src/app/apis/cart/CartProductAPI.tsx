import axios from 'axios'

const BACKEND_PREFIX = process.env.NEXT_PUBLIC_BACKEND_PREFIX
const CART_PORT = process.env.NEXT_PUBLIC_CART_PORT

export interface Cart {
    _id: string;
    user: string;
    products: Product[];
}

export interface Product {
    _id: string;
    name: string;
    originalPrice: number;
    finalPrice: number;
    image: string;
    category: Category;
    subCategory: SubCategory;
    shop: string;
    status: string;
    quantity: number;
}

export interface Category {
    _id: string;
    name: string;
    subCategories: any[];
    __v: number;
    image: string;
}

export interface SubCategory {
    _id: string;
    name: string;
    category: string;
    subCategories: any[];
    subCategoryTypes: any[];
    __v: number;
}

interface CartResponseData {
    status: number;
    data: Cart;
    message: string;
}


export async function GET_getUserCartProducts(userId: string) {
    const url = `${BACKEND_PREFIX}:${CART_PORT}/cart/user/${userId}`
    try {
        const response = await axios.get(url);
        if (userId == null) {
            return { isDenied: true, message: "Unauthenticated", status: 403, data: undefined }
        }
        let responseData = response.data as CartResponseData;
        if (response.status === 200) {
            const cart = responseData.data as Cart;
            return { isDenied: false, message: "Get cart products successfully", status: responseData.status, data: cart }
        }
        else {
            return { isDenied: true, message: "Failed to get cart products", status: 500, data: undefined }
        }
    } catch (error) {
        console.error("Failed to get cart products: ", error)
        return { isDenied: true, message: "Failed to get cart products", status: 500, data: undefined }
    }
}

//quantity: 0 -> delete product; quantity: > 0 -> if product is not in cart, then add to the cart else update quantity
export async function PUT_updateCartProduct(userId: string, productId: string, quantity: number) {
    const url = `${BACKEND_PREFIX}:${CART_PORT}/cart/user/${userId}`
    try {
        const response = await axios.put(url, {
            products: [
                {
                    "productId": productId,
                    "quantity": quantity
                }
            ]
        });
        if (userId == null) {
            return { isDenied: true, message: "Unauthenticated", status: 403, data: undefined }
        }
        if (response.status === 200) {
            return { isDenied: false, message: "Update product quantity successfully", status: response.status, data: undefined }
        }
        else {
            return { isDenied: true, message: "Failed to update product quantity", status: 500, data: undefined }
        }
    } catch (error) {
        console.error("Failed to get cart products: ", error)
        return { isDenied: true, message: "Failed to update product quantity", status: 500, data: undefined }
    }
}