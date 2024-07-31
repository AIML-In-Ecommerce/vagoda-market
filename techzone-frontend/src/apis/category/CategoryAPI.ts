import axios from "axios";

// const publicAPIURL = `${process.env.NEXT_PUBLIC_BACKEND_PREFIX}:${process.env.NEXT_PUBLIC_CATEGORY_PORT}`;
const GATEWAY_PREFIX = process.env.NEXT_PUBLIC_GATEWAY_PREFIX

const publicAPIURL = `${GATEWAY_PREFIX}`

export const CategoryAPI = {
  getAllCategories: async () => {
    const URL = `${publicAPIURL}/categories`;
    try {
      const response = await axios.get(URL);
      return response.data;
    } catch (error) {
      console.log("API_ERROR_CategoryAPI_getAllCategories: ", error);
    }
  },
  getCategoryById: async (id: string) => {
    const URL = `${publicAPIURL}/category/${id}`;
    try {
      const response = await axios.get(URL);
      return response.data;
    } catch (error) {
      console.log("API_ERROR_CategoryAPI_getCategoryById: ", error);
    }
  },
  getSubCategoryById: async (id: string) => {
    const URL = `${publicAPIURL}/subCategory/${id}`;
    try {
      const response = await axios.get(URL);
      return response.data;
    } catch (error) {
      console.log("API_ERROR_CategoryAPI_getSubCategoryById: ", error);
    }
  },
  getSubCategoryTypeById: async (id: string) => {
    const URL = `${publicAPIURL}/subCategoryType/${id}`;
    try {
      const response = await axios.get(URL);
      return response.data;
    } catch (error) {
      console.log("getSubCategoryTypeById: ", error);
    }
  },
};
