import axios from "axios"


const StatisticsAPIs = 
{
    async setAccessProductByAuthUser(userId: string, productId: string, shopId: string, accessType: string, appTime: Date | number | undefined)
    {
        const publicAPIURL = process.env.GATEWAY_URL
        const url = `${publicAPIURL}/statistics/access/buyer/product`
        
        const requestBody = {
            productId: productId,
            shopId: shopId,
            accessType: accessType,
            appTime: appTime
        }

        try
        {
            const response = await axios.post(url, requestBody,
                {
                    withCredentials: true,
                    params:
                    {
                        userId: userId
                    }
                }
            )

            return response
        }
        catch(error)
        {
            console.log(error)
            return null
        }
    },

    async setAccessProductBySessionId(productId: string, shopId: string, accessType: string, appTime: Date | number | undefined)
    {
        const publicAPIURL = process.env.GATEWAY_URL
        const url = `${publicAPIURL}/statistics/access/session/product`
        
        const requestBody = {
            productId: productId,
            shopId: shopId,
            accessType: accessType,
            appTime: appTime
        }

        try
        {
            const response = await axios.post(url, requestBody,
                {
                    withCredentials: true
                }
            )

            return response
        }
        catch(error)
        {
            console.log(error)
            return null
        }
    }

}

export default StatisticsAPIs