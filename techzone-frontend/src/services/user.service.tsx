import UserInfoAPI from "@/apis/info/UserInfoAPI"
import { UserInfoType } from "@/model/UserInfoType"


const UserService = 
{
    async getUserInfo(accessToken: string, useAddress: boolean)
    {
        const userInfo = await UserInfoAPI.getUserInfo(accessToken, useAddress) as UserInfoType

        return userInfo
    }
}

export default UserService