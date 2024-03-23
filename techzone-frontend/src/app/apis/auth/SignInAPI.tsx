'use client'
import { message } from 'antd'
import axios from 'axios'
import Cookies from 'js-cookie'

const NEXT_PUBLIC_BACKEND_PREFIX = process.env.NEXT_PUBLIC_BACKEND_PREFIX

interface Reply
{
    accessToken: string,
    refreshToken: string,
    refreshTokenExpiry: number
    role: string,
    userId: string
}

interface SignInResponse
{
    status: number,
    reply: Reply,
    message: string
}

export async function POST_LocalSignIn(email:string, password:string)
{
    const url = NEXT_PUBLIC_BACKEND_PREFIX + "/api/auth/sign_in"
    const data = {
        email: email,
        password: password
    }

    try
    {
        const response = await axios.post(url, data)
        const responseData: SignInResponse = response.data

        if(responseData.status == 200)
        {
            // const accessToken = responseData.reply.accessToken
            // const refreshToken = responseData.reply.refreshToken
            // const refExpiry = responseData.reply.refreshTokenExpiry
            // const userId = responseData.reply.userId
            
            // Cookies.set('accessToken', `${accessToken}`)
            // Cookies.set('refreshToken', `${refreshToken}`, {expires: new Date(refExpiry).getUTCMilliseconds()})
            // localStorage.setItem("userId", `${userId}`)
    
            return {isDenied: false, message: "Sign in successfully", status: responseData.status, data: responseData.reply}
    
        }
        else
        {
            return {isDenied: true, message: "Failed to sign in", status: responseData.status, data: responseData.reply}
        }
    }
    catch(err)
    {
        console.error(err)
        return {isDenied: true, message: "Failed to sign in", status: 500 ,data: undefined}
    }

}