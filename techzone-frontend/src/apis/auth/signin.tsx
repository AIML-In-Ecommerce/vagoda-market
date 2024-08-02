import axios from "axios";

interface SignInByEmailPasswordProps {
  email: string;
  password: string;
}

const accountType = "BUYER";
const GATEWAY_PREFIX = process.env.NEXT_PUBLIC_GATEWAY_PREFIX
const BACKEND_PREFIX = process.env.NEXT_PUBLIC_BACKEND_PREFIX;
const AUTH_PORT = process.env.NEXT_PUBLIC_AUTH_PORT;

// const publicAPIURL = `${BACKEND_PREFIX}:${AUTH_PORT}`
const publicAPIURL = `${GATEWAY_PREFIX}`

export async function POST_SignInByEmailPassword(
  props: SignInByEmailPasswordProps
) {
  //TODO: ask about the url please
  //   const publicAPIURL = process.env.NEXT_PUBLIC_API_GATEWAY;

  const url = `${publicAPIURL}/auth/login/`;

  try {
    const requestBody = {
      email: props.email,
      password: props.password,
      type: accountType,
    };

    const response = await axios.post(url, requestBody, {
      headers: {
        "Content-Type": "application/json",
        Accept: "*",
      },
    });

    return response;
  } catch (err) {
    console.error(err);
    return null;
  }
}
