
import axios from 'axios'
import Cookies from 'js-cookie'

export interface GetUserInfoResponse
{
    status: number,
    message: string,
    reply: UserInfo
}

const NEXT_PUBLIC_BACKEND_PREFIX = process.env.NEXT_PUBLIC_BACKEND_PREFIX

export async function POST_getUserInfo(userId: string)
{
    const url = NEXT_PUBLIC_BACKEND_PREFIX + "/api/user/info"
    //for testing

    try
    {

        if(userId == null)
        {
            return {isDenied: true, message: "Unauthenticated", status: 403 ,data: undefined}
        }

        const requestBody = 
        {
            user_id: userId
        }

        const accessToken = sessionStorage.getItem("accessToken")
        const refreshToken = Cookies.get("refreshToken")
        if (accessToken == undefined)
        {
            if(refreshToken != undefined)
            {
                //do refresh the access-token here
                
            }
            else
            {
                return {isDenied: true, message: "Unauthenticated", status: 403, data: undefined}
            }
        }

        const response =  await axios.post(url, requestBody, {
            headers: 
            {
                "Authorization": "Bearer " + accessToken
            }
        })

        const data: GetUserInfoResponse = JSON.parse(JSON.stringify(response.data))

        return {isDenied: false, message: "Get user info successfully", status: data.status , data: data.reply}
    }
    catch(err)
    {
        console.log(err)
        return {isDenied: true, message: "Connot connect to server", status: 500, data: undefined}
    }
}