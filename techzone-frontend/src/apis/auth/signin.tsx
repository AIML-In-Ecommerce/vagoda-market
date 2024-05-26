import axios from "axios";

interface SignInByEmailPasswordProps
{
    email: string,
    password: string,
}


const accountType = "BUYER"

export async function POST_SignInByEmailPassword(props: SignInByEmailPasswordProps)
{
    //TODO: ask about the url please
    const API_URL: string = process.env.NEXT_PUBLIC_AUTH_API_URL as string
    const AUTH_PORT:string = process.env.NEXT_PUBLIC_AUTH_PORT as string
    const url = `${API_URL}:${AUTH_PORT}/auth/login/`

    try
    {
        const requestBody =
        {
            email: props.email,
            password: props.password,
            type: accountType
        }

        const response = await axios.post(url, requestBody,
            {
                headers: 
                {
                    "Content-Type": "application/json",
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