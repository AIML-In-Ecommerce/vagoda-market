'use client'

import { usePathname, useRouter } from "next/navigation";
import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import { SimpleUserInfoType, UserInfoType } from "@/model/UserInfoType";
import AuthService, { RefreshTokenReponseData } from "@/service/auth.service";
import { stringifyError } from "next/dist/shared/lib/utils";


interface AuthContextProviderInitProps
{
    children: ReactNode
}

const authLocalStorageID = "#auth-context-user-info-record-ID"

const matcher: string[] = 
[
    
]

interface AuthContextProps
{
    userInfo: SimpleUserInfoType | null,
    methods: AuthContextFunctions | null
}

interface AuthContextFunctions
{
    // validateAuthRequest: (sessionInfoID: string) => boolean,
    login: (stringifiedInfo: string, accessToken: string, 
        refreshToken: string, refreshTokenExpiredDate: string | Date) => boolean,
    // login: () => boolean,
    logout: () => void,
    getAccessToken: () => string | null
}

const defaultContextValue: AuthContextProps = 
{
    userInfo: null,
    methods: null,
}

export const AuthContext = createContext<AuthContextProps>(defaultContextValue)

export default function AuthContextProvider({children}: AuthContextProviderInitProps)
{
    const accessTokenCookieKey = "#access_token@"
    const refreshTokenCookieKey = "#refresh_token@"

    const [userInfo, setUserInfo] = useState<SimpleUserInfoType | null>(null)

    const router = useRouter()
    const currentPathname = usePathname()

    async function validateClientAuth()
    {
        //TODO: check whether the user has already been authenticated
        const refreshToken = Cookies.get(refreshTokenCookieKey)
        if(refreshToken == null)
        {
            return -1
        }

        const accessToken = Cookies.get(accessTokenCookieKey)

        if(accessToken == null)
        {
            return 0
        }

        return 1
    }

    // function validateAuthRequest(receivedSessionInfoID: string)
    // {
    //     const stringifiedObject = sessionStorage.getItem(receivedSessionInfoID)
    //     if(stringifiedObject == null)
    //     {
    //         return false
    //     }

    //     const parsedObject: SimpleUserInfoType = JSON.parse(stringifiedObject)
        
    //     localStorage.setItem(authLocalStorageID, receivedSessionInfoID)
    //     setUserInfo(parsedObject)
    //     setSessionInfoID(receivedSessionInfoID)

    //     return true
    // }

    function login(stringifiedInfo: string, accessToken: string, 
        refreshToken: string, refreshTokenExpiredDate: string | Date)
    // function login()
    {
        try
        {
            localStorage.setItem(authLocalStorageID, stringifiedInfo)
            Cookies.set(accessTokenCookieKey, accessToken)
            Cookies.set(refreshTokenCookieKey, refreshToken, {expires: new Date(refreshTokenExpiredDate)})
            return true
        }
        catch(error)
        {
            return false
        }
    }

    function getAccessToken()
    {
        return Cookies.get(accessTokenCookieKey)
    }

    async function refreshToken()
    {
        const currentRefreshToken = Cookies.get(refreshTokenCookieKey)
        if(currentRefreshToken == null) //reture false to force the user re-authenticate
        {
            return false
        }
        const response = await AuthService.refreshToken(currentRefreshToken)
        if(response.statusCode == 500)
        {
            return false
        }
        else if(response.statusCode != 200 && response.statusCode != 201)
        {
            return false
        }

        const data = response.data as RefreshTokenReponseData

        Cookies.set(accessTokenCookieKey, data.accessToken)
        Cookies.set(refreshTokenCookieKey, data.refreshToken, {expires: data.refreshTokenExpiredDate})

        return true
    }

    async function reloadUserInfo()
    {
        //should call this function when the accessToken has existed
        try
        {
            if(userInfo == null)
            {
                const stringifiedInfo = localStorage.getItem(authLocalStorageID)
                if(stringifiedInfo != null)
                {
                    const initUserInfo = JSON.parse(stringifiedInfo) as UserInfoType
                    setUserInfo(() => initUserInfo)
                    return
                }

                
            }
        }
        catch(error)
        {

        }

    }

    function logout()
    {
        localStorage.removeItem(authLocalStorageID)
        //remove token here
        Cookies.remove(accessTokenCookieKey)
        Cookies.remove(refreshTokenCookieKey)
    }

    const supportMethodValue: AuthContextFunctions =
    {
        // validateAuthRequest: validateAuthRequest,
        login: login,
        logout: logout,
        getAccessToken: getAccessToken,
    }

    const [supportMethods, setSupportMethods] = useState<AuthContextFunctions | null>(supportMethodValue)


    //check authentication
    useEffect(() =>
    {
        console.log("current pathname: " + currentPathname)

        async function checkAuthentication()
        {
            
        if(matcher.includes(currentPathname) == true)
            {
                const authCase = await validateClientAuth()
                switch(authCase)
                {
                    case 1:
                    {
                        
                        break;
                    }
                    case 0: //no available access token -> refresh token
                    {
                        const isRefreshedSuccessfully = await refreshToken()
                        if(isRefreshedSuccessfully == false)
                        {
                            // force to login
                            logout()
                            router.replace("/auth")
                        }
                        break;
                    }
                    case -1: // no refresh token -> re-authenticate (login again)
                    {
                        logout()
                        router.replace("/auth")
                        break;
                    }
                }
            }
        }

        checkAuthentication()
    }, [currentPathname])

    const value:AuthContextProps = useMemo(() =>
    {
        const newValue: AuthContextProps =
        {
            userInfo: userInfo,
            methods: supportMethods
        }

        return newValue
    },
    [userInfo, supportMethods])

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}