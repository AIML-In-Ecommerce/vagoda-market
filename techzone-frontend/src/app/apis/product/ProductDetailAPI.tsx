"use client";
import { ProductDetailType, ProductStatus } from "@/model/ProductType";
import axios from "axios";

const BACKEND_PREFIX = process.env.NEXT_PUBLIC_BACKEND_PREFIX;
const PRODUCT_PORT = process.env.NEXT_PUBLIC_PRODUCT_PORT;

interface Data {
  _id: string;
  name: string;
  //   attributes: [
  //     attribute: {
  //       type: string,
  //     },
  //     value: {
  //       type: string,
  //     }
  // ],
  description: string;
  originalPrice: number;
  finalPrice: number;
  category: string;
  subCategory: string[];
  shop: string;
  platformFee: number;
  status: ProductStatus;
  image: string[];
  avgRating: number;
  createdAt: Date;
  requiredAttribute: Object;
  soldQuantity: number;
}

interface ProductDetailResponse {
  status: number;
  data: Data;
  message: string;
}

export async function GET_GetProductDetail(id: string) {
  const url = (
    BACKEND_PREFIX?.toString() +
    ":" +
    PRODUCT_PORT?.toString() +
    "/product/" +
    id
  ).toString();

  try {
    // console.log(url);
    const response = await axios.get(url);
    const responseData: ProductDetailResponse = response.data;

    const processedData: ProductDetailType = {
      _id: id,
      name: responseData.data.name,
      // attribute: {
      //   ....
      // }
      description: responseData.data.description,
      originalPrice: responseData.data.originalPrice,
      finalPrice: responseData.data.finalPrice,
      category: responseData.data.category,
      shopId: responseData.data.shop,
      status: responseData.data.status,
      image: responseData.data.image,
      avgRating: responseData.data.avgRating,
      soldQuantity: responseData.data.soldQuantity,
    };

    if (responseData.status == 200) {
      return {
        isDenied: false,
        message: "Get product detail successfully",
        status: responseData.status,
        data: processedData,
      };
    } else {
      return {
        isDenied: true,
        message: "Failed to get product detail",
        status: responseData.status,
        data: processedData,
      };
    }
  } catch (err) {
    console.error(err);
    return {
      isDenied: true,
      message: "Failed to get product detail",
      status: 500,
      data: undefined,
    };
  }
}
