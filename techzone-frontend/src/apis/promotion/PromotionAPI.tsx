"use client";

import { PromotionType } from "@/model/PromotionType";
import axios from "axios";

const GATEWAY_PREFIX = process.env.NEXT_PUBLIC_GATEWAY_PREFIX;
const BACKEND_PREFIX = process.env.NEXT_PUBLIC_BACKEND_PREFIX;
const PROMOTION_PORT = process.env.NEXT_PUBLIC_PROMOTION_PORT;

const publicAPIURL = `${GATEWAY_PREFIX}`;
// const publicAPIURL = `${BACKEND_PREFIX}:${PROMOTION_PORT}`

interface PromotionListResponse {
  status: number;
  data: PromotionType[];
  message: string;
}

export async function POST_GetPromotionList(ids: string[]) {
  const url = (publicAPIURL + "/promotion/list").toString();

  try {
    // console.log(url);
    const requestBody = {
      promotionIds: ids,
    };

    const response = await axios.post(url, requestBody);
    const responseData: PromotionListResponse = response.data;

    if (responseData.status == 200) {
      return {
        isDenied: false,
        message: "Get promotion successfully",
        status: responseData.status,
        data: responseData.data,
      };
    } else {
      return {
        isDenied: true,
        message: "Failed to get promotion",
        status: responseData.status,
        data: responseData.data,
      };
    }
  } catch (err) {
    console.error(err);
    return {
      isDenied: true,
      message: "Failed to get promotion",
      status: 500,
      data: undefined,
    };
  }
}

export async function GET_GetPromotionListByShop(shopId: string) {
  const url = (publicAPIURL + "/promotions/shop/" + shopId).toString();

  try {
    // console.log(url);
    const response = await axios.get(url);
    const responseData: PromotionListResponse = response.data;

    if (responseData.status == 200) {
      return {
        isDenied: false,
        message: "Get promotion successfully",
        status: responseData.status,
        data: responseData.data,
      };
    } else {
      return {
        isDenied: true,
        message: "Failed to get promotion",
        status: responseData.status,
        data: responseData.data,
      };
    }
  } catch (err) {
    console.error(err);
    return {
      isDenied: true,
      message: "Failed to get promotion",
      status: 500,
      data: undefined,
    };
  }
}
