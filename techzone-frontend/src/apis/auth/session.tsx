import axios from "axios"


export async function fetchSessionId()
{
    const publicAPIURL = process.env.NEXT_PUBLIC_API_GATEWAY
    const url = `${publicAPIURL}/auth/session`

    const appTime = new Date()
    try
    {
        const response = await axios.get(url, {
            params: {
                appTime: appTime
            }
        })

        return response
    }
    catch(error)
    {
        console.log(error)
        return null
    }
}