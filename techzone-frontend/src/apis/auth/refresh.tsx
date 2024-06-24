import axios from "axios"


export async function POST_refreshToken(refreshToken: string)
{
    const publicAPIURL = process.env.NEXT_PUBLIC_API_GATEWAY
    const url = `${publicAPIURL}/auth/refresh_token/`
    try
    {
        const requestBody = 
        {
            refreshToken: refreshToken
        }

        const response = await axios.post(url, requestBody,
            {
                headers:
                {
                    "Accept": "*"
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
}