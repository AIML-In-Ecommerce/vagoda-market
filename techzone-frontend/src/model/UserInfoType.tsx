
interface SimpleUserAddress
{
    receiverName: string,
    address: string,
    phoneNumber: string
}

interface UserInfo
{
    _id: string,
    fullname: string,
    avatar: string,
    dob: string,
    phoneNumber: string,
    address: SimpleUserAddress[],
    account: string
}