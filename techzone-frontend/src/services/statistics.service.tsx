import StatisticsAPIs from "@/apis/statistics/statistics.api"


const StatisticsService = 
{
    async setProductAccess(userId: string | null, productId: string, shopId: string, accessType: string)
    {
        const appTime = new Date()

        let result = null
        if(userId != null)
        {
            const response = await StatisticsAPIs.setAccessProductByAuthUser(userId, productId, shopId, accessType, appTime)
            if(response != null && response.status == 200)
            {
                const data = response.data
                result = data.data
            }
        }
        else
        {
            const response = await StatisticsAPIs.setAccessProductBySessionId(productId, shopId, accessType, appTime)
            if(response != null && response.status == 200)
            {
                const data = response.data
                result = data.data
            }
        }

        return null
    },

}

export default StatisticsService