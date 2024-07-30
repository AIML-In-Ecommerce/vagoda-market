import axios from "axios";

// const BACKEND_PREFIX = process.env.NEXT_PUBLIC_BACKEND_PREFIX
// const CART_PORT = process.env.NEXT_PUBLIC_CART_PORT
const GATEWAY_PREFIX = process.env.NEXT_PUBLIC_GATEWAY_PREFIX;

export interface Cart {
  _id: string;
  user: string;
  products: CartItem[];
}

export interface CartItem extends Product {
  itemId: string;
}

export interface Attribute {
  colors: ColorAttribute[];
  size: string[];
  material: string;
}

export interface ColorAttribute {
  _id?: string;
  color: ColorItemAttribute;
  link: string;
}

export interface ColorItemAttribute {
  label: string;
  value: string;
}

export interface Product {
  _id: string;
  name: string;
  originalPrice: number;
  finalPrice: number;
  images: string[];
  attribute: Attribute;
  color: ColorAttribute;
  size: string;
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

export interface CardProductUpdateInfo {
  itemId: string;
  product: string;
  color: ColorAttribute;
  size: string;
  quantity: number;
}

export async function GET_getUserCartProducts(userId: string) {
  const url = `${GATEWAY_PREFIX}/cart/user?userId=${userId}`;
  try {
    const response = await axios.get(url);
    if (userId == null) {
      return {
        isDenied: true,
        message: "Unauthenticated",
        status: 403,
        data: undefined,
      };
    }
    let responseData = response.data as CartResponseData;
    if (response.status === 200) {
      const cart = responseData.data as Cart;
      return {
        isDenied: false,
        message: "Get cart products successfully",
        status: responseData.status,
        data: cart,
      };
    } else {
      return {
        isDenied: true,
        message: "Failed to get cart products",
        status: 500,
        data: undefined,
      };
    }
  } catch (error) {
    console.error("Failed to get cart products: ", error);
    return {
      isDenied: true,
      message: "Failed to get cart products",
      status: 500,
      data: undefined,
    };
  }
}

//quantity: 0 -> delete product; quantity: > 0 -> if product is not in cart, then add to the cart else update quantity
export async function PUT_updateCartProduct(
  userId: string,
  updateProducts: CartItem[],
) {
  const url = `${GATEWAY_PREFIX}/cart/user/update?userId=${userId}`;
  const castUpdateInfo = updateProducts.map((item) => {
    return {
      itemId: item.itemId,
      product: item._id,
      color: item.color,
      size: item.size,
      quantity: item.quantity,
    } as CardProductUpdateInfo;
  });
  try {
    const response = await axios.put(url, {
      products: castUpdateInfo,
    });
    if (userId == null) {
      return {
        isDenied: true,
        message: "Unauthenticated",
        status: 403,
        data: undefined,
      };
    }
    if (response.status === 200) {
      return {
        isDenied: false,
        message: "Update product successfully",
        status: response.status,
        data: undefined,
      };
    } else {
      return {
        isDenied: true,
        message: "Failed to update product",
        status: 500,
        data: undefined,
      };
    }
  } catch (error) {
    console.error("Failed to get cart products: ", error);
    return {
      isDenied: true,
      message: "Failed to update product quantity",
      status: 500,
      data: undefined,
    };
  }
}
