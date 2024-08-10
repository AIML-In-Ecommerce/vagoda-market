import axios from "axios";

const GATEWAY_PREFIX = process.env.NEXT_PUBLIC_GATEWAY_PREFIX
const BACKEND_PREFIX = process.env.NEXT_PUBLIC_BACKEND_PREFIX;
const AUTH_PORT = process.env.NEXT_PUBLIC_AUTH_PORT;

// const publicAPIURL = `${BACKEND_PREFIX}:${AUTH_PORT}`
const publicAPIURL = `${GATEWAY_PREFIX}`

export async function fetchSessionId(providedFingerprint: string) {
  //   const publicAPIURL = process.env.NEXT_PUBLIC_API_GATEWAY;
  const url = `${publicAPIURL}/auth/session`;
  const requestBody = {
    fingerprint: providedFingerprint
  }

  try {
    const response = await axios.post(url, requestBody)

    return response;
  } catch (error) {
    console.log("Axios error at fetchSessionId");
    return null;
  }
}
