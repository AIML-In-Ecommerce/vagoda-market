import axios from "axios";

const StatisticsAPIs = {
  async setAccessProductByAuthUser(
    userId: string,
    productId: string,
    shopId: string,
    accessType: string,
    appTime: Date | number | undefined
  ) {
    //   const publicAPIURL = process.env.NEXT_PUBLIC_API_GATEWAY;
    const publicAPIURL = process.env.NEXT_PUBLIC_GATEWAY_PREFIX;
    const url = `${publicAPIURL}/statistics/access/buyer/product`;

    const requestBody = {
      productId: productId,
      shopId: shopId,
      accessType: accessType,
      appTime: appTime,
    };

    try {
      const response = await axios.post(url, requestBody, {
        params: {
          userId: userId,
        },
      });

      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async setAccessProductBySessionId(
    sessionId: string,
    productId: string,
    shopId: string,
    accessType: string,
    appTime: Date | number | undefined
  ) {
    const publicAPIURL = process.env.NEXT_PUBLIC_GATEWAY_PREFIX;
    const url = `${publicAPIURL}/statistics/access/session/product`;

    const requestBody = {
      ssid: sessionId,
      productId: productId,
      shopId: shopId,
      accessType: accessType,
      appTime: appTime,
    };

    try {
      const response = await axios.post(url, requestBody);

      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async getRecentProductsByAuthUser(
    userId: string,
    startTime: Date | number | undefined,
    endTime: Date | number | undefined,
    accessType: string
  ) {
    const publicAPIURL = process.env.NEXT_PUBLIC_GATEWAY_PREFIX;
    const url = `${publicAPIURL}/statistics/access/buyer/product`;

    try {
      const response = await axios.get(url, {
        params: {
          userId: userId,
          amount: 6,
          startTime: startTime,
          endTime: endTime,
          accessType: accessType,
        },
      });

      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async getHotShops(
    startTime: Date | number | undefined,
    endTime: Date | number | undefined
  ) {
    const publicAPIURL = process.env.NEXT_PUBLIC_GATEWAY_PREFIX;
    const url = `${publicAPIURL}/statistics/shop/global_top_product_in_sales`;

    const requestBody = {
      amount: 6,
      startTime: startTime,
      endTime: endTime,
    };

    try {
      const response = await axios.post(url, requestBody);

      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async getHotProducts(
    startTime: Date | number | undefined,
    endTime: Date | number | undefined
  ) {
    const publicAPIURL = process.env.NEXT_PUBLIC_GATEWAY_PREFIX;
    const url = `${publicAPIURL}/statistics/product/top/in_global_sales`;

    const requestBody = {
      startTime: startTime,
      endTime: endTime,
      useProductInfo: true,
    };

    try {
      const response = await axios.post(url, requestBody);

      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async getHotSubCategories(
    startTime: Date | number | undefined,
    endTime: Date | number | undefined
  ) {
    const publicAPIURL = process.env.NEXT_PUBLIC_GATEWAY_PREFIX;
    const url = `${publicAPIURL}/statistics/category/global_sub_category/top/in_sales`;

    const requestBody = {
      amount: 14,
      startTime: startTime,
      endTime: endTime,
    };

    try {
      const response = await axios.post(url, requestBody);

      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async getSaleProducts() {
    const publicAPIURL = process.env.NEXT_PUBLIC_GATEWAY_PREFIX;
    const url = `${publicAPIURL}/products/global_flash_sales`;

    try {
      const response = await axios.get(url);

      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};

export default StatisticsAPIs;
