"use client";

import { RawReviewType, ReviewType } from "@/model/ReviewType";
import axios from "axios";

const BACKEND_PREFIX = process.env.NEXT_PUBLIC_BACKEND_PREFIX;
const REVIEW_PORT = process.env.NEXT_PUBLIC_REVIEW_PORT;

interface ReviewResponse {
  status: number;
  data: RawReviewType;
  message: string;
}

export async function GET_GetReview(id: string) {
  const url = (
    BACKEND_PREFIX?.toString() +
    ":" +
    REVIEW_PORT?.toString() +
    "/review/" +
    id
  ).toString();

  try {
    // console.log(url);
    const response = await axios.get(url);
    const responseData: ReviewResponse = response.data;

    if (responseData.status == 200) {
      return {
        isDenied: false,
        message: "Get review successfully",
        status: responseData.status,
        data: responseData.data,
      };
    } else {
      return {
        isDenied: true,
        message: "Failed to get review",
        status: responseData.status,
        data: responseData.data,
      };
    }
  } catch (err) {
    console.error(err);
    return {
      isDenied: true,
      message: "Failed to get review",
      status: 500,
      data: undefined,
    };
  }
}

export async function POST_CreateReview(props: RawReviewType) {
  const url = (
    BACKEND_PREFIX?.toString() +
    ":" +
    REVIEW_PORT?.toString() +
    "/review"
  ).toString();

  try {
    // console.log(url);
    const requestBody = {
      product: props.product,
      user: props.user, //user id
      rating: props.rating,
      content: props.content, //desc
      asset: props.asset, //image urls
      createdAt: props.createdAt,
      conversation: props.conversation,
      like: props.like,
    };

    const response = await axios.post(url, requestBody);
    const responseData: ReviewResponse = response.data;

    if (responseData.status == 200) {
      return {
        isDenied: false,
        message: "Create review successfully",
        status: responseData.status,
        data: responseData.data,
      };
    } else {
      return {
        isDenied: true,
        message: "Failed to create review",
        status: responseData.status,
        data: responseData.data,
      };
    }
  } catch (err) {
    console.error(err);
    return {
      isDenied: true,
      message: "Failed to create review",
      status: 500,
      data: undefined,
    };
  }
}

export async function DELETE_DeleteReview(id: string) {
  const url = (
    BACKEND_PREFIX?.toString() +
    ":" +
    REVIEW_PORT?.toString() +
    "/review/" +
    id
  ).toString();

  try {
    // console.log(url);
    const response = await axios.delete(url);
    const responseData: ReviewResponse = response.data;

    if (responseData.status == 200) {
      return {
        isDenied: false,
        message: "Delete review successfully",
        status: responseData.status,
        data: responseData.data,
      };
    } else {
      return {
        isDenied: true,
        message: "Failed to delete review",
        status: responseData.status,
        data: responseData.data,
      };
    }
  } catch (err) {
    console.error(err);
    return {
      isDenied: true,
      message: "Failed to delete review",
      status: 500,
      data: undefined,
    };
  }
}

export async function PUT_UpdateReview(props: RawReviewType) {
  const url = (
    BACKEND_PREFIX?.toString() +
    ":" +
    REVIEW_PORT?.toString() +
    "/review/" +
    props._id
  ).toString();

  try {
    // console.log(url);
    const requestBody = {
      product: props.product,
      user: props.user, //user id
      rating: props.rating,
      content: props.content, //desc
      asset: props.asset, //image urls
      createdAt: props.createdAt,
      conversation: props.conversation,
      like: props.like,
    };

    const response = await axios.put(url, requestBody);
    const responseData: ReviewResponse = response.data;

    if (responseData.status == 200) {
      return {
        isDenied: false,
        message: "Update review successfully",
        status: responseData.status,
        data: responseData.data,
      };
    } else {
      return {
        isDenied: true,
        message: "Failed to update review",
        status: responseData.status,
        data: responseData.data,
      };
    }
  } catch (err) {
    console.error(err);
    return {
      isDenied: true,
      message: "Failed to update review",
      status: 500,
      data: undefined,
    };
  }
}

interface ReviewListResponse {
  status: number;
  data: RawReviewType[];
  message: string;
}

export async function GET_GetReviewListByProduct(productId: string) {
  const url = (
    BACKEND_PREFIX?.toString() +
    ":" +
    REVIEW_PORT?.toString() +
    "/productReviews/" +
    productId
  ).toString();

  try {
    // console.log(url);
    const response = await axios.get(url);
    const responseData: ReviewListResponse = response.data;

    const processedData: ReviewType[] = [];

    responseData.data.forEach((data) => {
      processedData.push({
        id: data._id,
        productId: data.product,
        user: data.user,
        starRating: data.rating,
        desc: data.content,
        createdAt: data.createdAt,
        asset: data.asset,
        conversation: data.conversation,
        like: data.like,
      });
    });

    if (responseData.status == 200) {
      return {
        isDenied: false,
        message: "Get reviews successfully",
        status: responseData.status,
        data: processedData,
      };
    } else {
      return {
        isDenied: true,
        message: "Failed to get reviews",
        status: responseData.status,
        data: processedData,
      };
    }
  } catch (err) {
    console.error(err);
    return {
      isDenied: true,
      message: "Failed to get reviews",
      status: 500,
      data: undefined,
    };
  }
}

// export async function POST_GetReviewList(ids: string[]) {
//   const url = (
//     BACKEND_PREFIX?.toString() +
//     ":" +
//     REVIEW_PORT?.toString() +
//     "/reviews/list"
//   ).toString();

//   try {
//     // console.log(url);
//     const requestBody = {
//       ids: ids,
//     };

//     const response = await axios.post(url, requestBody);
//     const responseData: ReviewListResponse = response.data;

//     if (responseData.status == 200) {
//       return {
//         isDenied: false,
//         message: "Get review successfully",
//         status: responseData.status,
//         data: responseData.data,
//       };
//     } else {
//       return {
//         isDenied: true,
//         message: "Failed to get review",
//         status: responseData.status,
//         data: responseData.data,
//       };
//     }
//   } catch (err) {
//     console.error(err);
//     return {
//       isDenied: true,
//       message: "Failed to get review",
//       status: 500,
//       data: undefined,
//     };
//   }
// }