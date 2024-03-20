'use client'
import axios from 'axios'
import Cookies from 'js-cookie'

const NEXT_PUBLIC_BACKEND_PREFIX = process.env.NEXT_PUBLIC_BACKEND_PREFIX

interface Reply
{
    accessToken: string,
    refreshToken: string,
    refreshTokenExpiry: number
}

interface SignInResponse
{
    status: number,
    reply: Reply,
    message: string
}

export async function LocalSignIn(email:string, password:string)
{
    const url = NEXT_PUBLIC_BACKEND_PREFIX + "/auth/sign_in"
    const data = {
        email: email,
        password: password
    }

    const response = await axios.post(url, data)

    if(response.status == 200)
    {
        const responseData: SignInResponse = response.data
        const accessToken = responseData.reply.accessToken
        const refreshToken = responseData.reply.refreshToken
        const refExpiry = responseData.reply.refreshTokenExpiry
        
        Cookies.set('accessToken', `${accessToken}`)
        Cookies.set('refreshToken', `${refreshToken}`, {expires: new Date(refExpiry).getUTCMilliseconds()})
    }
    
    return response
}