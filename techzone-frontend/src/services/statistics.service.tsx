import StatisticsAPIs from "@/apis/statistics/statistics.api";

const StatisticsService = {
  async setProductAccess(
    userId: string | null,
    sessionId: string | null,
    productId: string,
    shopId: string,
    accessType: string
  ) {
    const appTime = new Date();

    let result = null;
    if (userId != null) {
      const response = await StatisticsAPIs.setAccessProductByAuthUser(
        userId,
        productId,
        shopId,
        accessType,
        appTime
      );
      if (response != null && response.status == 200) {
        const data = response.data;
        result = data.data;
      }
    } else {
      if (sessionId != null) {
        const response = await StatisticsAPIs.setAccessProductBySessionId(
          sessionId,
          productId,
          shopId,
          accessType,
          appTime
        );
        if (response != null && response.status == 200) {
          const data = response.data;
          result = data.data;
        }
      }
    }

    return null;
  },

  async getRecentProducts(userId: string | null, accessType: string) {
    let result = null;

    const startTime = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const endTime = new Date();

    if (userId != null) {
      const response = await StatisticsAPIs.getRecentProductsByAuthUser(
        userId,
        startTime,
        endTime,
        accessType
      );
      if (response != null && response.status == 200) {
        const data = response.data;
        result = data.data;
      }
    }

    return result;
  },

  async getHotShops() {
    let result = null;

    const startTime = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const endTime = new Date();

    const response = await StatisticsAPIs.getHotShops(startTime, endTime);
    if (response != null && response.status == 200) {
      const data = response.data;
      result = data.data;
    }

    return result;
  },

  async getHotProducts() {
    let result = null;

    const startTime = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const endTime = new Date();

    const response = await StatisticsAPIs.getHotProducts(startTime, endTime);
    if (response != null && response.status == 200) {
      const data = response.data;
      result = data.data;
    }

    return result;
  },

  async getHotCategories() {
    let result = null;

    const startTime = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const endTime = new Date();

    const response = await StatisticsAPIs.getHotSubCategories(
      startTime,
      endTime
    );
    if (response != null && response.status == 200) {
      const data = response.data;
      result = data.data;
    }

    return result;
  },

  async getSaleProducts() {
    let result = null;

    const response = await StatisticsAPIs.getSaleProducts();
    if (response != null && response.status == 200) {
      const data = response.data;
      result = data.data;
    }

    return result;
  },
};

export default StatisticsService;
