import axios from "axios";

const GATEWAY_PREFIX = process.env.NEXT_PUBLIC_GATEWAY_PREFIX
const BACKEND_PREFIX = process.env.NEXT_PUBLIC_BACKEND_PREFIX;
const AUTH_PORT = process.env.NEXT_PUBLIC_AUTH_PORT;

// const publicAPIURL = `${BACKEND_PREFIX}:${AUTH_PORT}`
const publicAPIURL = `${GATEWAY_PREFIX}`

export async function POST_refreshToken(refreshToken: string) {

  // const publicAPIURL = process.env.NEXT_PUBLIC_BACKEND_PREFIX;
  const url = `${publicAPIURL}/auth/refresh_token/`;
  try {
    const requestBody = {
      refreshToken: refreshToken,
    };

    const response = await axios.post(url, requestBody, {
      headers: {
        Accept: "*",
      },
    });

    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
}
