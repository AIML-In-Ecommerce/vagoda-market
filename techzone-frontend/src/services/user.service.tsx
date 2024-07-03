import UserInfoAPI from "@/apis/info/UserInfoAPI"
import { UserInfoType } from "@/model/UserInfoType"


const UserService = 
{
    async getUserInfo(userId: string, useAddress: boolean)
    {
        const userInfo = await UserInfoAPI.getUserInfo(userId, useAddress) as UserInfoType

        return userInfo
    }
}

export default UserService