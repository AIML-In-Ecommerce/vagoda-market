"use client";

import { usePathname, useRouter } from "next/navigation";
import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import { SimpleUserInfoType, UserInfoType } from "@/model/UserInfoType";
import AuthService, {
  RefreshTokenReponseData,
  SignInResponseData,
} from "@/services/auth.service";
import { stringifyError } from "next/dist/shared/lib/utils";
import UserService from "@/services/user.service";

const sessionIdKey = "ssid";

interface AuthContextProviderInitProps {
  children: ReactNode;
}

const authLocalStorageID = "#auth-context-user-info-record-ID";

const matcher: string[] = [
  "/",
  "/product",
  "/product-list"
];

interface AuthContextProps {
  userInfo: SimpleUserInfoType | null;
  methods: AuthContextFunctions | null;
}

interface AuthContextFunctions {
  // validateAuthRequest: (sessionInfoID: string) => boolean,
  login: (authInfo: SignInResponseData) => boolean;
  forceSignIn: () => void;
  logout: () => void;
  refreshToken: () => Promise<string | null>;
  getAccessToken: () => string | null;
  getSessionId: () => string | null;
}

const defaultContextValue: AuthContextProps = {
  userInfo: null,
  methods: null,
};

export const AuthContext = createContext<AuthContextProps>(defaultContextValue);

export default function AuthContextProvider({
  children,
}: AuthContextProviderInitProps) {
  const accessTokenCookieKey = "#client_access_token_@";
  const refreshTokenCookieKey = "#client_refresh_token@";

  const [userInfo, setUserInfo] = useState<SimpleUserInfoType | null>(null);

  const router = useRouter();
  const currentPathname = usePathname();

  useEffect(() => {
    async function fetchSessionId() {
      const currentSessionId = Cookies.get(sessionIdKey);
      if (currentSessionId == null) {
        const sessionId = await AuthService.fetchSessionId();
        if (sessionId != null) {
          Cookies.set(sessionIdKey, sessionId);
        }
      }
    }

    fetchSessionId();
  }, []);

  async function validateClientAuth() {
    //TODO: check whether the user has already been authenticated
    const refreshToken = Cookies.get(refreshTokenCookieKey);
    if (refreshToken == null) {
      return -1;
    }

    const accessToken = Cookies.get(accessTokenCookieKey);

    if (accessToken == null) {
      return 0;
    }

    return 1;
  }

  function login(authInfo: SignInResponseData) {
    // function login()
    try {
      const stringifiedBuyerInfo = JSON.stringify(authInfo.buyerInfo);
      localStorage.setItem(authLocalStorageID, stringifiedBuyerInfo);
      Cookies.set(accessTokenCookieKey, authInfo.accessToken, {
        expires: new Date(authInfo.accessTokenExpiredDate),
      });
      Cookies.set(refreshTokenCookieKey, authInfo.refreshToken, {
        expires: new Date(authInfo.refreshTokenExpiredDate),
      });
      setUserInfo(authInfo.buyerInfo);
      return true;
    } catch (error) {
      return false;
    }
  }

  function getAccessToken() {
    return Cookies.get(accessTokenCookieKey);
  }

  async function refreshToken() {
    const currentRefreshToken = Cookies.get(refreshTokenCookieKey);
    if (currentRefreshToken == null) {
      //reture false to force the user re-authenticate
      return null;
    }
    const response = await AuthService.refreshToken(currentRefreshToken);
    if (response.statusCode == 500) {
      return null;
    } else if (response.statusCode != 200 && response.statusCode != 201) {
      return null;
    }
    const data = response.data as RefreshTokenReponseData;

    Cookies.set(accessTokenCookieKey, data.accessToken, {
      expires: new Date(data.accessTokenExpiredDate),
    });
    Cookies.set(refreshTokenCookieKey, data.refreshToken, {
      expires: new Date(data.refreshTokenExpiredDate),
    });

    return data.userId;
  }

  async function reloadUserInfo(userId: string) {
    //should call this function when the accessToken has existed
    try {
      if (userInfo == null) {
        const stringifiedInfo = localStorage.getItem(authLocalStorageID);
        if (stringifiedInfo != null) {
          const initUserInfo = JSON.parse(stringifiedInfo) as UserInfoType;
          setUserInfo(() => initUserInfo);
          return true;
        }

        const newUserInfo = await UserService.getUserInfo(userId, false);
        if (newUserInfo == null) {
          return false;
        }

        localStorage.setItem(authLocalStorageID, JSON.stringify(newUserInfo));
        setUserInfo(() => newUserInfo);
      }
    } catch (error) {
      return false;
    }
  }

  function logout() {
    localStorage.removeItem(authLocalStorageID);
    //remove token here
    Cookies.remove(accessTokenCookieKey);
    Cookies.remove(refreshTokenCookieKey);
  }

  function forceSignIn() {
    logout();
    router.replace("/auth/account");
  }

  function getSessionId() {
    return Cookies.get(sessionIdKey);
  }

  const supportMethodValue: AuthContextFunctions = {
    // validateAuthRequest: validateAuthRequest,
    login: login,
    logout: logout,
    forceSignIn: forceSignIn,
    refreshToken: refreshToken,
    getAccessToken: getAccessToken,
    getSessionId: getSessionId,
  };

  const [supportMethods, setSupportMethods] =
    useState<AuthContextFunctions | null>(supportMethodValue);

  //check authentication
  useEffect(() => {
    console.log(currentPathname)
    const storedValue = localStorage.getItem(authLocalStorageID);
    if (storedValue != null && userInfo == null) {
      const currentuserInfo = JSON.parse(
        storedValue as string
      ) as SimpleUserInfoType;
      setUserInfo(currentuserInfo);
    }

    async function checkAuthentication() {
      // if (matcher.includes(currentPathname) == false) {
        const authCase = await validateClientAuth();
        switch (authCase) {
          case 1: {
            break;
          }
          case 0: {
            //no available access token -> refresh token
            const refreshUserId = await refreshToken();
            if (refreshUserId == null) {
              // force to login
              logout();
              router.replace("/auth");
            }
            else
            {
              await reloadUserInfo(refreshUserId as string);
              break;
            }
          }
          case -1: {
            // no refresh token -> re-authenticate (login again)
            logout();
            router.replace("/auth");
            break;
          }
        }
      // }
    }

    checkAuthentication();
  }, [currentPathname]);

  const value: AuthContextProps = useMemo(() => {
    const newValue: AuthContextProps = {
      userInfo: userInfo,
      methods: supportMethods,
    };

    return newValue;
  }, [userInfo, supportMethods]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
