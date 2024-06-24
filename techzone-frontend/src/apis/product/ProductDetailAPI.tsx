"use client";
import {
  ProductDetailType,
  ProductStatus,
  ProductType,
} from "@/model/ProductType";
import axios from "axios";
import { GET_GetProductRating } from "../review/ReviewAPI";

const BACKEND_PREFIX = process.env.NEXT_PUBLIC_BACKEND_PREFIX;
const PRODUCT_PORT = process.env.NEXT_PUBLIC_PRODUCT_PORT;

interface ProductDetailResponse {
  status: number;
  data: ProductDetailType;
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

    const ratingResponse = await GET_GetProductRating(id);
    console.log("rating", ratingResponse);

    const response = await axios.get(url);
    const responseData: ProductDetailResponse = response.data;

    const processedData: ProductDetailType = {
      _id: id,
      name: responseData.data.name,
      description: responseData.data.description,
      originalPrice: responseData.data.originalPrice,
      finalPrice: responseData.data.finalPrice,
      category: responseData.data.category,
      shop: responseData.data.shop,
      status: responseData.data.status,
      images: responseData.data.images,
      // avgRating: responseData.data.avgRating,
      avgRating: ratingResponse.data,
      soldQuantity: responseData.data.soldQuantity,
      brand: responseData.data.brand,
      subCategory: "",
      subCategoryType: undefined,
      attribute: responseData.data.attribute,
      isFlashSale: false,
      inventoryAmount: 0,
      platformFee: 0,
      createAt: "",
      createdAt: "",
      profit: "",
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

export async function PUT_UpdateProductRating(id: string) {
  const url = (
    BACKEND_PREFIX?.toString() +
    ":" +
    PRODUCT_PORT?.toString() +
    "/product/" +
    id
  ).toString();

  try {
    // console.log(url);
    const ratingResponse = await GET_GetProductRating(id);

    // console.log("rating", ratingResponse);

    const response = await axios.put(url, { avgRating: ratingResponse.data });
    const responseData: ProductDetailResponse = response.data;

    if (responseData.status == 200) {
      return {
        isDenied: false,
        message: "Get product detail successfully",
        status: responseData.status,
        data: responseData,
      };
    } else {
      return {
        isDenied: true,
        message: "Failed to get product detail",
        status: responseData.status,
        data: undefined,
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

interface ProductListResponse {
  status: number;
  data: ProductDetailType[];
  message: string;
}

export async function POST_GetProductList(idList: string[]) {
  const url = (
    BACKEND_PREFIX?.toString() +
    ":" +
    PRODUCT_PORT?.toString() +
    "/products/list"
  ).toString();

  try {
    // console.log(url);
    const response = await axios.post(
      url,
      { ids: idList }
      // {
      //   headers: {
      //     Authorization: `Bearer ${auth.user?.access_token}`,
      //   },
      // }
    );
    const responseData: ProductListResponse = response.data;

    console.log(responseData.data);

    const processedData: ProductType[] = [];

    for (let i = 0; i < responseData.data.length; i++) {
      processedData.push({
        _id: responseData.data[i]._id,
        name: responseData.data[i].name,
        imageLink: responseData.data[i].images[0],
        rating: responseData.data[i].avgRating,
        soldAmount: responseData.data[i].soldQuantity,
        price: responseData.data[i].finalPrice,
        originalPrice: responseData.data[i].originalPrice,
        flashSale: responseData.data[i].status === ProductStatus.SALE,
        category: responseData.data[i].category,
      });
    }

    if (responseData.status == 200) {
      return {
        isDenied: false,
        message: "Get product list successfully",
        status: responseData.status,
        data: processedData,
      };
    } else {
      return {
        isDenied: true,
        message: "Failed to get product list",
        status: responseData.status,
        data: processedData,
      };
    }
  } catch (err) {
    console.error(err);
    return {
      isDenied: true,
      message: "Failed to get product list",
      status: 500,
      data: undefined,
    };
  }
}

export async function POST_GetProductListByShop(shopId: string) {
  const url = (
    BACKEND_PREFIX?.toString() +
    ":" +
    PRODUCT_PORT?.toString() +
    "/products/filter"
  ).toString();

  try {
    // console.log(url);
    const response = await axios.post(
      url,
      { shop: shopId }
      // {
      //   headers: {
      //     Authorization: `Bearer ${auth.user?.access_token}`,
      //   },
      // }
    );
    const responseData: ProductListResponse = response.data;

    // console.log(responseData.data);

    const processedData: ProductType[] = [];

    for (let i = 0; i < responseData.data.length; i++) {
      processedData.push({
        _id: responseData.data[i]._id,
        name: responseData.data[i].name,
        imageLink:
          responseData.data[i].images && responseData.data[i].images.length > 0
            ? responseData.data[i].images[0]
            : "",
        rating: responseData.data[i].avgRating,
        soldAmount: responseData.data[i].soldQuantity,
        price: responseData.data[i].finalPrice,
        originalPrice: responseData.data[i].originalPrice,
        flashSale: responseData.data[i].status === ProductStatus.SALE,
        category: responseData.data[i].category,
      });
    }

    if (responseData.status == 200) {
      return {
        isDenied: false,
        message: "Get product list successfully",
        status: responseData.status,
        data: processedData,
      };
    } else {
      return {
        isDenied: true,
        message: "Failed to get product list",
        status: responseData.status,
        data: processedData,
      };
    }
  } catch (err) {
    console.error(err);
    return {
      isDenied: true,
      message: "Failed to get product list",
      status: 500,
      data: undefined,
    };
  }
}

export async function GET_GetRelatedProduct(id: string) {
  const url = (
    BACKEND_PREFIX?.toString() +
    ":" +
    PRODUCT_PORT?.toString() +
    "/related/" +
    id
  ).toString();

  try {
    // console.log(url);
    const response = await axios.get(
      url
      // {
      //   headers: {
      //     Authorization: `Bearer ${auth.user?.access_token}`,
      //   },
      // }
    );
    const responseData: ProductListResponse = response.data;

    // console.log(responseData.data);

    const processedData: ProductType[] = [];

    for (let i = 0; i < responseData.data.length; i++) {
      processedData.push({
        _id: responseData.data[i]._id,
        name: responseData.data[i].name,
        imageLink:
          responseData.data[i].images && responseData.data[i].images.length > 0
            ? responseData.data[i].images[0]
            : "",
        rating: responseData.data[i].avgRating,
        soldAmount: responseData.data[i].soldQuantity,
        price: responseData.data[i].finalPrice,
        originalPrice: responseData.data[i].originalPrice,
        flashSale: responseData.data[i].status === ProductStatus.SALE,
        category: responseData.data[i].category,
      });
    }

    if (responseData.status == 200) {
      return {
        isDenied: false,
        message: "Get product list successfully",
        status: responseData.status,
        data: processedData,
      };
    } else {
      return {
        isDenied: true,
        message: "Failed to get product list",
        status: responseData.status,
        data: processedData,
      };
    }
  } catch (err) {
    console.error(err);
    return {
      isDenied: true,
      message: "Failed to get product list",
      status: 500,
      data: undefined,
    };
  }
}
