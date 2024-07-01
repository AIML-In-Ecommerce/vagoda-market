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
};

export default StatisticsAPIs;
