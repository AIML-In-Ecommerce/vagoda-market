"use client";
import { CartProductType } from "@/model/ProductType";
// import { CartType } from "@/model/CartType";
import axios from "axios";

const BACKEND_PREFIX = process.env.NEXT_PUBLIC_BACKEND_PREFIX;
const CART_PORT = process.env.NEXT_PUBLIC_CART_PORT;

interface CartResponse {
  status: number;
  //   data: CartType;
  data: any;
  message: string;
}

export async function GET_GetCart(id: string) {
  const url = (
    BACKEND_PREFIX?.toString() +
    ":" +
    CART_PORT?.toString() +
    "/cart/" +
    id
  ).toString();

  try {
    // console.log(url);
    const response = await axios.get(url);
    const responseData: CartResponse = response.data;

    if (responseData.status == 200) {
      return {
        isDenied: false,
        message: "Get cart successfully",
        status: responseData.status,
        data: responseData.data,
      };
    } else {
      return {
        isDenied: true,
        message: "Failed to get cart",
        status: responseData.status,
        data: responseData.data,
      };
    }
  } catch (err) {
    console.error(err);
    return {
      isDenied: true,
      message: "Failed to get cart",
      status: 500,
      data: undefined,
    };
  }
}

export async function PUT_UpdateCart(id: string, products: CartProductType[]) {
  const url = (
    BACKEND_PREFIX?.toString() +
    ":" +
    CART_PORT?.toString() +
    "/cart/user?userId=" +
    id
  ).toString();

  try {
    // console.log(url);
    const response = await axios.put(url, { products });
    const responseData: CartResponse = response.data;

    if (responseData.status == 200) {
      return {
        isDenied: false,
        message: "Update cart successfully",
        status: responseData.status,
        data: responseData.data,
      };
    } else {
      return {
        isDenied: true,
        message: "Failed to update cart",
        status: responseData.status,
        data: responseData.data,
      };
    }
  } catch (err) {
    console.error(err);
    return {
      isDenied: true,
      message: "Failed to update cart",
      status: 500,
      data: undefined,
    };
  }
}

export async function POST_AddToCart(id: string, products: CartProductType[]) {
  const url = (
    BACKEND_PREFIX?.toString() +
    ":" +
    CART_PORT?.toString() +
    "/cart/user/add?userId=" +
    id
  ).toString();

  try {
    // console.log(url);
    const response = await axios.post(url, { products });
    const responseData: CartResponse = response.data;

    if (responseData.status == 200) {
      return {
        isDenied: false,
        message: "Update cart successfully",
        status: responseData.status,
        data: responseData.data,
      };
    } else {
      return {
        isDenied: true,
        message: "Failed to update cart",
        status: responseData.status,
        data: responseData.data,
      };
    }
  } catch (err) {
    console.error(err);
    return {
      isDenied: true,
      message: "Failed to update cart",
      status: 500,
      data: undefined,
    };
  }
}
