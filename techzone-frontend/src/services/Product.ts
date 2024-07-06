import { ProductAPI, ProductFilterInput } from "@/apis/product/ProductAPI";
import { _ProductType } from "@/model/ProductType";

export const ProductService = {
  getProductByFilter: async (
    input: ProductFilterInput
  ): Promise<{
    total: number;
    totalPages: number;
    products: _ProductType[];
  }> => {
    try {
      const response: any = await ProductAPI.getProductByFilter(input);

      if (response.data && Array.isArray(response.data)) {
        const formatedData: _ProductType[] = response.data;
        return {
          total: response.total,
          totalPages: response.totalPages,
          products: formatedData,
        };
      }

      return {
        total: 0,
        totalPages: 0,
        products: [],
      };
    } catch (error) {
      console.log("@SERVICE_getProductByFilter: ", error);

      return {
        total: 0,
        totalPages: 0,
        products: [],
      };
    }
  },
  get4SuggestedProducts: async (input: {
    subCategories: string[];
  }): Promise<_ProductType[]> => {
    try {
      const response: any = await ProductAPI.get4SuggestedProducts(input);

      if (response.data && Array.isArray(response.data)) {
        const formatedData: _ProductType[] = response.data;
        return formatedData;
      }

      return [];
    } catch (error) {
      console.log("@SERVICE_get4SuggestedProducts: ", error);

      return [];
    }
  },
};
