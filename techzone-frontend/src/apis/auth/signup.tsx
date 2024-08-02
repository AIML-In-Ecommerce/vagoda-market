"use client";

import axios from "axios";
import { APIFunctionResponse, APIResponseSchema } from "../APIResponseSchema";

interface SignUpProps {
  email: string;
  password: string;
  fullName: string;
}

const accountType = "BUYER";

const GATEWAY_PREFIX = process.env.NEXT_PUBLIC_GATEWAY_PREFIX
const BACKEND_PREFIX = process.env.NEXT_PUBLIC_BACKEND_PREFIX;
const AUTH_PORT = process.env.NEXT_PUBLIC_AUTH_PORT;

// const publicAPIURL = `${BACKEND_PREFIX}:${AUTH_PORT}`
const publicAPIURL = `${GATEWAY_PREFIX}`

export async function POST_SignUpByEmailPassword(props: SignUpProps) {
  //   const publicAPIURL = process.env.NEXT_PUBLIC_API_GATEWAY;

  const url = `${publicAPIURL}/auth/register/`;

  const requestBody = {
    email: props.email,
    password: props.password,
    fullName: props.fullName,
    type: accountType,
  };

  try {
    const response = await axios.post(url, requestBody, {
      headers: {
        Accept: "*",
      },
    });

    return response;
  } catch (err) {
    console.error(err);
    return null;
  }
}
