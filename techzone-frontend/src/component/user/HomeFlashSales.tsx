'use client'

import { useEffect, useRef, useState } from "react"
import SimpleProductCard from "./utils/SimpleProductCard"
import { Button, Card, Carousel, Col, Flex, Row, Skeleton, Typography } from "antd"
import Link from "next/link"
import {AiOutlineRight} from "react-icons/ai"
import { CarouselArrow } from "./utils/CarouselArrow"

interface HomeFlashSalesProps
{

}

interface SimpleProductInfo
{
    _id: string,
    name: string,
    originalPrice: number,
    finalPrice: number,
    status: string,
    image: string,
}

enum WrapperType{
    paddingBlock,
    infoBlock
}

interface SimpleProductInfoWrapper
{
    type: WrapperType,
    productInfo: SimpleProductInfo
}

const paddingBlockProps: SimpleProductInfo =
{
    _id: "",
    name: "",
    originalPrice: 0,
    finalPrice: 0,
    status: "",
    image: "",
}

const MockData = 
[
    {
        _id: "test_01",
        name: "Macbook air 2023",
        attribute: {},
        description: "a laptop",
        originalPrice: 22000000,
        finalPrice: 20000000,
        category: "c_01",
        subCategory: "sc_01",
        shop: "sh_01",
        status: "SALE",
        image: ["https://img.freepik.com/free-photo/asian-woman-red-dress-holding-shopping-bags-gift-voucher-chinese-new-year-shopping_74952-3450.jpg?t=st=1714987933~exp=1714991533~hmac=0a52eb3a16833863cf20c9622bdabd6b599d4304f43e2e5c081ccb40efb21022&w=996"],
        avgRating: 4.5,
        createdAt: "",
        requiredAttribute: []
    },
    {
        _id: "test_02",
        name: "Macbook air 2024",
        attribute: {},
        description: "a laptop",
        originalPrice: 22000000,
        finalPrice: 22000000,
        category: "c_01",
        subCategory: "sc_01",
        shop: "sh_01",
        status: "SALE",
        image: ["https://img.freepik.com/free-photo/young-japanese-woman-portrait-sitting-chair_23-2148870794.jpg?t=st=1714987434~exp=1714991034~hmac=86f4474284a555dcbf48ec16b53723f0feae8827fe71dcdc763a15133b8f84ae&w=1380"],
        avgRating: 4.5,
        createdAt: "",
        requiredAttribute: []
    },
    {
        _id: "test_03",
        name: "Dell SuperLight",
        attribute: {},
        description: "a laptop",
        originalPrice: 26000000,
        finalPrice: 24000000,
        category: "c_01",
        subCategory: "sc_01",
        shop: "sh_01",
        status: "SALE",
        image: ["https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
        createdAt: "",
        requiredAttribute: []
    },
    {
        _id: "test_04",
        name: "Macbook air 2023",
        attribute: {},
        description: "a laptop",
        originalPrice: 22000000,
        finalPrice: 20000000,
        category: "c_01",
        subCategory: "sc_01",
        shop: "sh_01",
        status: "SALE",
        image: ["https://img.freepik.com/free-photo/young-people-standing-looking-different-direction_23-2148134027.jpg?t=st=1714987969~exp=1714991569~hmac=beb516848cd0f8f8f175b769400d7cf1ad913178e17c271e8093b9a4cee57000&w=1060"],
        avgRating: 4.5,
        createdAt: "",
        requiredAttribute: []
    },
    {
        _id: "test_05",
        name: "Macbook air 2024",
        attribute: {},
        description: "a laptop",
        originalPrice: 24000000,
        finalPrice: 22000000,
        category: "c_01",
        subCategory: "sc_01",
        shop: "sh_01",
        status: "SALE",
        image: ["https://img.freepik.com/free-photo/stack-clothes-white-background-closeup_93675-132527.jpg?t=st=1714988257~exp=1714991857~hmac=e4ec31c5bae5d6392b2c67b47a17473c30f149d2e56e6fbb2a125be4b4ad0f06&w=360"],
        avgRating: 4.5,
        createdAt: "",
        requiredAttribute: []
    },
    {
        _id: "test_06",
        name: "Dell SuperLight",
        attribute: {},
        description: "a laptop",
        originalPrice: 26000000,
        finalPrice: 24000000,
        category: "c_01",
        subCategory: "sc_01",
        shop: "sh_01",
        status: "SALE",
        image: ["https://img.freepik.com/free-vector/merchandising-stationery-mock-up_1102-92.jpg?w=740&t=st=1714988297~exp=1714988897~hmac=8f7b2d8daed2a9765188938b0038bf8ba01d43a225194ab655e61314693105c9"],
        createdAt: "",
        requiredAttribute: []
    },
    {
        _id: "test_07",
        name: "Macbook air 2023",
        attribute: {},
        description: "a laptop",
        originalPrice: 22000000,
        finalPrice: 20000000,
        category: "c_01",
        subCategory: "sc_01",
        shop: "sh_01",
        status: "SALE",
        image: ["https://img.freepik.com/free-photo/man-black-sweater-black-bucket-hat-youth-apparel-shoot_53876-102294.jpg?t=st=1714987421~exp=1714991021~hmac=b66a76d2bc0c3d9209351ba4bd0a1fc5328fb0fb564f46befc53085d361814bc&w=360"],
        avgRating: 4.5,
        createdAt: "",
        requiredAttribute: []
    },
    {
        _id: "test_08",
        name: "Macbook air 2024",
        attribute: {},
        description: "a laptop",
        originalPrice: 22000000,
        finalPrice: 22000000,
        category: "c_01",
        subCategory: "sc_01",
        shop: "sh_01",
        status: "SALE",
        image: ["https://img.freepik.com/free-photo/artist-props-photography_23-2148885621.jpg?t=st=1714988356~exp=1714991956~hmac=7eba5a1f3d22b64dd863babfb39920b9953e4b2414bb2b187f1064bdceb62f86&w=360"],
        avgRating: 4.5,
        createdAt: "",
        requiredAttribute: []
    },
    {
        _id: "test_09",
        name: "Dell SuperLight",
        attribute: {},
        description: "a laptop",
        originalPrice: 26000000,
        finalPrice: 24000000,
        category: "c_01",
        subCategory: "sc_01",
        shop: "sh_01",
        status: "SALE",
        image: ["https://img.freepik.com/free-photo/stack-clothes-white-background-closeup_93675-132527.jpg?t=st=1714988257~exp=1714991857~hmac=e4ec31c5bae5d6392b2c67b47a17473c30f149d2e56e6fbb2a125be4b4ad0f06&w=360"],
        createdAt: "",
        requiredAttribute: []
    },
    {
        _id: "test_10",
        name: "Macbook air 2023",
        attribute: {},
        description: "a laptop",
        originalPrice: 22000000,
        finalPrice: 20000000,
        category: "c_01",
        subCategory: "sc_01",
        shop: "sh_01",
        status: "SALE",
        image: ["https://img.freepik.com/free-vector/merchandising-stationery-mock-up_1102-92.jpg?w=740&t=st=1714988297~exp=1714988897~hmac=8f7b2d8daed2a9765188938b0038bf8ba01d43a225194ab655e61314693105c9"],
        avgRating: 4.5,
        createdAt: "",
        requiredAttribute: []
    },
    {
        _id: "test_11",
        name: "Macbook air 2024",
        attribute: {},
        description: "a laptop",
        originalPrice: 22000000,
        finalPrice: 22000000,
        category: "c_01",
        subCategory: "sc_01",
        shop: "sh_01",
        status: "SALE",
        image: ["https://img.freepik.com/free-photo/man-black-sweater-black-bucket-hat-youth-apparel-shoot_53876-102294.jpg?t=st=1714987421~exp=1714991021~hmac=b66a76d2bc0c3d9209351ba4bd0a1fc5328fb0fb564f46befc53085d361814bc&w=360"],
        avgRating: 4.5,
        createdAt: "",
        requiredAttribute: []
    },
    {
        _id: "test_12",
        name: "Dell SuperLight",
        attribute: {},
        description: "a laptop",
        originalPrice: 26000000,
        finalPrice: 24000000,
        category: "c_01",
        subCategory: "sc_01",
        shop: "sh_01",
        status: "SALE",
        image: ["https://img.freepik.com/free-photo/artist-props-photography_23-2148885621.jpg?t=st=1714988356~exp=1714991956~hmac=7eba5a1f3d22b64dd863babfb39920b9953e4b2414bb2b187f1064bdceb62f86&w=360"],
        createdAt: "",
        requiredAttribute: []
    },
    {
        _id: "test_13",
        name: "Macbook air 2023",
        attribute: {},
        description: "a laptop",
        originalPrice: 22000000,
        finalPrice: 20000000,
        category: "c_01",
        subCategory: "sc_01",
        shop: "sh_01",
        status: "SALE",
        image: ["https://img.freepik.com/free-psd/fashionable-hat-isolated_23-2151356980.jpg?w=826&t=st=1714988242~exp=1714988842~hmac=335bdf8fc3af754e4baafc2d140e8a9031a88739170fb6965cc06ba67a96ccf3"],
        avgRating: 4.5,
        createdAt: "",
        requiredAttribute: []
    },
    {
        _id: "test_14",
        name: "Macbook air 2024",
        attribute: {},
        description: "a laptop",
        originalPrice: 22000000,
        finalPrice: 22000000,
        category: "c_01",
        subCategory: "sc_01",
        shop: "sh_01",
        status: "SALE",
        image: ["https://img.freepik.com/free-photo/plaid-women-s-coat-outerwear-casual-fashion-with-design-space_53876-102118.jpg?t=st=1714988176~exp=1714991776~hmac=aeca31ca1155dcff0399a00b91fd9eaa690804e95ed52a7473bc20fe4eaeec47&w=360"],
        avgRating: 4.5,
        createdAt: "",
        requiredAttribute: []
    },
    {
        _id: "test_15",
        name: "Dell SuperLight",
        attribute: {},
        description: "a laptop",
        originalPrice: 26000000,
        finalPrice: 24000000,
        category: "c_01",
        subCategory: "sc_01",
        shop: "sh_01",
        status: "SALE",
        image: ["https://img.freepik.com/free-photo/pair-trainers_144627-3799.jpg?t=st=1714988110~exp=1714991710~hmac=d1beacb0e281ebd72582ae62a12f2ee4d82ed46f8cf5508ffed348a93087cdcc&w=826"],
        createdAt: "",
        requiredAttribute: []
    },
    {
        _id: "test_16",
        name: "Macbook air 2023",
        attribute: {},
        description: "a laptop",
        originalPrice: 22000000,
        finalPrice: 20000000,
        category: "c_01",
        subCategory: "sc_01",
        shop: "sh_01",
        status: "SALE",
        image: ["https://img.freepik.com/free-photo/pair-trainers_144627-3799.jpg?t=st=1714988110~exp=1714991710~hmac=d1beacb0e281ebd72582ae62a12f2ee4d82ed46f8cf5508ffed348a93087cdcc&w=826"],
        avgRating: 4.5,
        createdAt: "",
        requiredAttribute: []
    },
    {
        _id: "test_17",
        name: "Macbook air 2024",
        attribute: {},
        description: "a laptop",
        originalPrice: 22000000,
        finalPrice: 22000000,
        category: "c_01",
        subCategory: "sc_01",
        shop: "sh_01",
        status: "SALE",
        image: ["https://img.freepik.com/free-photo/beautiful-woman-basic-white-t-shirt-with-design-space_53876-102863.jpg?t=st=1714988070~exp=1714991670~hmac=385395a639464bf0fc7f954e0bbd0c6c547eca67d6aea27a94d89eb078ec9729&w=360"],
        avgRating: 4.5,
        createdAt: "",
        requiredAttribute: []
    },
    {
        _id: "test_18",
        name: "Dell SuperLight",
        attribute: {},
        description: "a laptop",
        originalPrice: 26000000,
        finalPrice: 24000000,
        category: "c_01",
        subCategory: "sc_01",
        shop: "sh_01",
        status: "SALE",
        image: ["https://img.freepik.com/free-photo/young-pretty-girl-with-two-braids-leather-jacket-skirt-with-black-backpack-shoulder-while-dreamily-looking-aside-beige-background_574295-4658.jpg?t=st=1714988026~exp=1714991626~hmac=ba592b33394b139b1eab031383722ba6ba60e7552a05e76c349ef2d11ee38b84&w=360"],
        createdAt: "",
        requiredAttribute: []
    }
]

export default function HomeFlashSales({}: HomeFlashSalesProps)
{
    const [products, setProducts] = useState<SimpleProductInfo[]>([])
    const numberOfDisplayedProductPerScreen = 10
    const numberOfDisplayedProductPerRow = 5

    const cardImageHeight = "250px"
    const cardImageWidth = undefined

    // const gridColumnSpan = 4

    const flashSaleMoreDetailHref = "#"

    useEffect(() =>
    {
        //fetch data here

        const data = MockData
        const tr_data: SimpleProductInfo[] = data.map((value: any) =>
        {
            const tr_item: SimpleProductInfo = {
                _id: value._id,
                name: value.name,
                originalPrice: value.originalPrice,
                finalPrice: value.finalPrice,
                image: value.image[0],
                status: value.status
            }

            return tr_item;

        })

        setProducts(tr_data)

        
    },
    [])

    const productDisplay = () => 
    {
        if(products.length < 1)
        {
            return (
                <Skeleton active/>
            )
        }

        let result: JSX.Element[] = []

        const max = products.length / numberOfDisplayedProductPerScreen;

        for(let i = 0; i <= max; i++)
        {
            const startIndex = i*numberOfDisplayedProductPerScreen
            const endIndex = startIndex + numberOfDisplayedProductPerScreen > products.length ? products.length : startIndex + numberOfDisplayedProductPerScreen
            const items = products.slice(startIndex, endIndex)
            const turn = numberOfDisplayedProductPerScreen / numberOfDisplayedProductPerRow
            let rows: JSX.Element[] = []
            for(let j = 0; j < turn; j++)
            {
                const leftIndex = j*numberOfDisplayedProductPerRow
                const rightIndex = (j+1)*numberOfDisplayedProductPerRow > items.length ? items.length : (j+1)*numberOfDisplayedProductPerRow
                let itemsPerRow = items.slice(leftIndex, rightIndex).map((value: SimpleProductInfo) => 
                {
                    const item: SimpleProductInfoWrapper = 
                    {
                        type: WrapperType.infoBlock,
                        productInfo: value
                    }
                    
                    return item
                })
                if(itemsPerRow.length < numberOfDisplayedProductPerRow)
                {
                    const complements = ((new Array(numberOfDisplayedProductPerRow - itemsPerRow.length)).fill(paddingBlockProps)).map((value: SimpleProductInfo) =>
                    {
                        const item: SimpleProductInfoWrapper = 
                        {
                            type: WrapperType.paddingBlock,
                            productInfo: value
                        }

                        return item
                    })

                    //insert paddings to itemsPerRow
                    itemsPerRow = itemsPerRow.concat(complements)
                }
                const row = itemsPerRow.map((valueWrapper:SimpleProductInfoWrapper, index: number) =>
                {
                    let isInvisible = ""
                    if(valueWrapper.type == WrapperType.paddingBlock)
                    {
                        isInvisible = "invisible "
                    }
                    const value = valueWrapper.productInfo

                    return(
                        <div className={isInvisible + "w-full"} key={value._id + new String(index)}>
                            <SimpleProductCard info={value} imageWidth={cardImageWidth} imageHeight={cardImageHeight} />
                        </div>
                    )
                })
                const rowWrapper = <Flex key={j.toString()+leftIndex.toString()+rightIndex.toString()} className="mb-3 px-1 h-full" justify={"space-evenly"} align="center" gap={8}>
                    {row}
                </Flex>

                rows = rows.concat(rowWrapper)
            }

            result = result.concat(<Flex vertical className="py-2 w-full h-full" key={i.toString()+startIndex.toString()+endIndex.toString()} gap={10}>{rows}</Flex>)
        }

        return result
    }

    return(
        <>
            <div className="w-full bg-gray-100 flex justify-center">
                <div className="container">
                    <div className="invisible h-10 w-full">
                    </div>
                        <Flex className="w-full mb-2 bg-stone-700 py-4 px-2 rounded-md" align="center">
                            <Typography.Text className="text-3xl font-semibold w-full text-white">
                                Flash sales
                            </Typography.Text>
                            <Flex className="w-full" justify="end" align="baseline"> 
                                <Link href={flashSaleMoreDetailHref} prefetch={false}>
                                    <Typography.Text className="text-white">
                                        Xem thêm
                                    </Typography.Text>
                                </Link>
                                <Typography.Text className="text-base text-white">
                                    <AiOutlineRight size={"12px"}/>
                                </Typography.Text>
                            </Flex>
                        </Flex>
                        {/* <div className="w-full h-px bg-amber-900 mt-3 mb-4"></div> */}
                        <div className="h-full">
                            <div className="block">
                                <Carousel
                                style={{maxHeight: undefined}}
                                className="h-full"
                                autoplay={true}
                                arrows
                                nextArrow={<CarouselArrow direction="right"/>}
                                prevArrow={<CarouselArrow direction="left"/>}
                                >
                                    {productDisplay()}
                                </Carousel>
                            </div>
                        </div>
                    <div className="invisible h-10 w-full">
                    </div>
                </div>
            </div>
        </>
    )
}