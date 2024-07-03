import axios from "axios"


// const publicURL = `${process.env.NEXT_PUBLIC_BACKEND_PREFIX}:${process.env.NEXT_PUBLIC_USER_PORT}`
const publicURL = `${process.env.NEXT_PUBLIC_BACKEND_PREFIX}`

const UserInfoAPI = 
{
    // async getUserInfo(accessToken: string, useAddress: boolean)
    // {
    //     const url = `${publicURL}/user_info`
    //     try
    //     {
    //         const response = await axios.get(url, {
    //             headers:
    //             {
    //                 Authorization: `Bearer ${accessToken}`
    //             },
    //             params: 
    //             {
    //                 useAddress: useAddress
    //             }
    //         })

    //         if(response.status == 200)
    //         {
    //             const data = response.data
    //             return data.data
    //         }
    //         else
    //         {
    //             console.log(response.data)
    //             return null
    //         }
    //     }
    //     catch(error)
    //     {
    //         console.log("Axios error at getUserInfo")
    //         return null
    //     }
    // },


    async getUserInfo(userId: string, useAddress: boolean)
    {
        const url = `${publicURL}/user_info`
        try
        {
            const response = await axios.get(url, {
                params: 
                {
                    userId: userId,
                    useAddress: useAddress
                }
            })

            if(response.status == 200)
            {
                const data = response.data
                return data.data
            }
            else
            {
                console.log(response.data)
                return null
            }
        }
        catch(error)
        {
            console.log("Axios error at getUserInfo")
            return null
        }
    }

}

export default UserInfoAPI