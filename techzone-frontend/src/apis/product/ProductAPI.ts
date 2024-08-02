import axios from "axios";

export interface ProductFilterInput {
  keyword?: string;
  shopId?: string;
  minPrice?: number;
  maxPrice?: number;
  category?: string[];
  subCategory?: string[];
  subCategoryType?: string[];
  avgRating?: number;
  sortBy?: string;
  index?: number;
  amount?: number;
}

const publicAPIURL = `${process.env.NEXT_PUBLIC_GATEWAY_PREFIX}`;
// const publicAPIURL = `${process.env.NEXT_PUBLIC_BACKEND_PREFIX}:${process.env.NEXT_PUBLIC_PRODUCT_PORT}`;

export const ProductAPI = {
  getProductByFilter: async (input: ProductFilterInput) => {
    const URL = `${publicAPIURL}/products/filter`;
    try {
      const response = await axios.post(URL, input);
      return response.data;
    } catch (error) {
      console.log("API_ERROR_ProductAPI_getProductByFilter: ", error);
    }
  },
  get4SuggestedProducts: async (input: { subCategories: string[] }) => {
    const URL = `${publicAPIURL}/revelantCategoryProducts`;
    try {
      const response = await axios.post(URL, input);
      return response.data;
    } catch (error) {
      console.log("API_ERROR_ProductAPI_get4SuggestedProducts: ", error);
    }
  },
};
