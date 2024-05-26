'use client';

import axios from 'axios'
import { APIFunctionResponse, APIResponseSchema } from '../APIResponseSchema'

interface SignUpProps
{
    email: string,
    password: string,
    fullName: string
}

const accountType = "BUYER"

export async function POST_SignUpByEmailPassword(props: SignUpProps)
{
    const API_URL: string = process.env.NEXT_PUBLIC_AUTH_API_URL as string
    const AUTH_PORT: string = process.env.NEXT_PUBLIC_AUTH_PORT as string
    const url = `${API_URL}:${AUTH_PORT}/auth/register/`
    
    const requestBody = 
    {
        email: props.email,
        password: props.password,
        fullName: props.fullName,
        type: accountType
    }


    try
    {
        const response = await axios.post(url, requestBody,
            {
                headers:
                {
                    "Accept": "*",
                },
            }
        )

        return response
    }
    catch(err)
    {
        console.error(err)
        return null
    }
}