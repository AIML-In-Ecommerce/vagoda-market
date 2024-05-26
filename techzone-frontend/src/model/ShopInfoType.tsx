

export type SimpleShopInfoType =
{
    _id: string,
    name: string,
    location: string,
    description: string,
    design: string[],
    shopInfoDesign:
    {
        color: string,
        avatarUrl: string,
        banner: string,
        _id: string
    }
}