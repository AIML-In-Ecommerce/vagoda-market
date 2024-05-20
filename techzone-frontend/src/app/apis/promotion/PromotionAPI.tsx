"use client";

import { PromotionType } from "@/model/PromotionType";
import axios from "axios";

const BACKEND_PREFIX = process.env.NEXT_PUBLIC_BACKEND_PREFIX;
const PROMOTION_PORT = process.env.NEXT_PUBLIC_PROMOTION_PORT;

interface PromotionListResponse {
  status: number;
  data: PromotionType[];
  message: string;
}

export async function POST_GetPromotionList(ids: string[]) {
  const url = (
    BACKEND_PREFIX?.toString() +
    ":" +
    PROMOTION_PORT?.toString() +
    "/promotions/list"
  ).toString();

  try {
    // console.log(url);
    const requestBody = {
      ids: ids,
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
