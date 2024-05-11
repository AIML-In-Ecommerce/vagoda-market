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
        image: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
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
        image: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
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
        image: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
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
        image: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
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
        image: ["https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
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
        image: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
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
        image: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
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
        image: ["https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
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
        image: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
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
        image: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
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
        image: ["https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
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
        image: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
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
        image: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
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
        image: ["https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
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
        image: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
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
        image: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
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
        image: ["https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
        createdAt: "",
        requiredAttribute: []
    }
]

export default function HomeFlashSales({}: HomeFlashSalesProps)
{
    const [products, setProducts] = useState<SimpleProductInfo[]>([])
    const numberOfDisplayedProductPerScreen = 10
    const numberOfDisplayedProductPerRow = 5
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
                            <SimpleProductCard info={value}/>
                        </div>
                    )
                })
                const rowWrapper = <Flex key={j.toString()+leftIndex.toString()+rightIndex.toString()} className="my-1" justify={"space-evenly"} align="center" gap={8}>
                    {row}
                </Flex>

                rows = rows.concat(rowWrapper)
            }

            result = result.concat(<div className="py-2" key={i.toString()+startIndex.toString()+endIndex.toString()}>{rows}</div>)
        }

        return result
    }

    return(
        <>
            <div className="w-full bg-blue-50 flex justify-center">
                <div className="w-11/12">
                    <div className="invisible h-10 w-full">
                    </div>
                    <Card>
                        <Flex className="w-full mb-4" align="center">
                            <Typography.Text className="text-3xl font-semibold w-full text-orange-600">
                                Flash sale
                            </Typography.Text>
                            <Flex className="w-full px-4" justify="end" align="center">
                                <Link href={flashSaleMoreDetailHref} prefetch={false}>
                                    <Typography.Text className="text-base">
                                        Xem thêm
                                    </Typography.Text>
                                </Link>
                                <Typography.Text className="text-base">
                                    <AiOutlineRight size={"16px"}/>
                                </Typography.Text>
                            </Flex>
                        </Flex>
                        <div>
                            <div className="block">
                                <Carousel
                                autoplay={true}
                                arrows
                                nextArrow={<CarouselArrow direction="right"/>}
                                prevArrow={<CarouselArrow direction="left"/>}
                                >
                                    {productDisplay()}
                                </Carousel>
                            </div>
                        </div>
                    </Card>
                    <div className="invisible h-10 w-full">
                    </div>
                </div>
            </div>
        </>
    )
}