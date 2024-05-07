
export type CategoryType = 
{
    _id: string,
    key: string,
    urlKey: string,
    image: string,
    name: string,
}

export type SubCategoryTypeType = 
{
    key: string,
    urlKey: string,
    name: string,
    subCategory: string[]
}

export type SubCategoryType = 
{
    _id: string,
    key: string,
    urlKey: string,
    name: string,
    image: string
}