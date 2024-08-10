import { APIFunctionResponse, APIResponseSchema } from "@/apis/APIResponseSchema"
import { POST_refreshToken } from "@/apis/auth/refresh"
import { fetchSessionId } from "@/apis/auth/session"
import { POST_SignInByEmailPassword } from "@/apis/auth/signin"
import { POST_SignUpByEmailPassword } from "@/apis/auth/signup"
import { SimpleUserInfoType } from "@/model/UserInfoType"


export interface SignInResponseData
{
    buyerInfo: SimpleUserInfoType,
    accessToken: string,
    accessTokenExpiredDate: string | Date,
    refreshToken: string,
    refreshTokenExpiredDate: string | Date
}

export interface RegisterResponseData
{
    userId: string,
    accountId: string
}

export interface RefreshTokenReponseData
{
    userId: string,
    accessToken: string,
    accessTokenExpiredDate: string | Date,
    refreshToken: string,
    refreshTokenExpiredDate: string | Date
}

const defaultErrorResponse: APIFunctionResponse =
{
    statusCode: 500,
    message: "Connection error",
    data: undefined
}

const AuthService = 
{
    async signIn(email: string, password: string)
    {
        const response = await POST_SignInByEmailPassword({email: email, password: password})
        if(response == null)
        {
            return defaultErrorResponse
        }

        const statusCode = JSON.parse(JSON.stringify(response.status))

        if(statusCode != 200 && statusCode != 201)
        {
            const result: APIFunctionResponse =
            {
                statusCode: statusCode,
                message: "Internal Server error",
                data: undefined
            }

            return result
        }

        const data: APIResponseSchema = JSON.parse(JSON.stringify(response.data))

        const result: APIFunctionResponse = 
        {
            
            statusCode: statusCode,
            message: data.message,
            data: data.data as SignInResponseData
        }

        return result
    },

    async register(email: string, password: string, fullName: string)
    {
        const response = await POST_SignUpByEmailPassword({
            email: email, password: password, fullName: fullName
        })
        if(response == null)
        {
            return defaultErrorResponse
        }

        const statusCode = JSON.parse(JSON.stringify(response.status))

        if(statusCode != 200 && statusCode != 201)
        {
            const result: APIFunctionResponse =
            {
                statusCode: statusCode,
                message: "Internal Server error",
                data: undefined
            }

            return result
        }
        
        const data: APIResponseSchema = JSON.parse(JSON.stringify(response.data))
        const result: APIFunctionResponse = 
        {
            statusCode: statusCode,
            message: data.message,
            data: data.data as RegisterResponseData
        }

        return result
    },

    async refreshToken(token:string)
    {
        const response = await POST_refreshToken(token)
        if(response == null)
        {
            return defaultErrorResponse
        }

        
        const statusCode = JSON.parse(JSON.stringify(response.status))

        if(statusCode == 500)
        {
            const result: APIFunctionResponse =
            {
                statusCode: statusCode,
                message: "Invalid token",
                data: undefined
            }

            return result
        }
        else if(statusCode != 200 && statusCode != 201)
        {
            const result: APIFunctionResponse =
            {
                statusCode: statusCode,
                message: "Internal Server Error",
                data: undefined
            }

            return result
        }

        const data: APIResponseSchema = JSON.parse(JSON.stringify(response.data))

        const result: APIFunctionResponse = 
        {
            statusCode: statusCode,
            message: data.message,
            data: data.data as RefreshTokenReponseData
        }

        return result
    },

    async fetchSessionId(providedFingerprint: string)
    {
        const response = await fetchSessionId(providedFingerprint)
        if(response == null)
        {
            return null
        }
        
        if(response.status == 200)
        {
            const data = response.data
            return data.data
        }
        else
        {
            return null
        }
    },
}

export default AuthService