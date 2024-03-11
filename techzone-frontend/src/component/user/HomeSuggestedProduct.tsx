'use client'


import { Button, Card, Carousel, Col, Flex, Row, Skeleton, Typography } from "antd"
import Link from "next/link"
import { useEffect, useState } from "react"
import { AiOutlineRight } from "react-icons/ai"
import SimpleProductCard from "./utils/SimpleProductCard"


interface HomeSuggestedProductProps
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

const MockData = 
[
    {
        _id: "test_01",
        name: "Macbook air 2023",
        attribute: {},
        description: "a laptop",
        originalPrice: undefined,
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
        originalPrice: undefined,
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
        originalPrice: undefined,
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


export default function HomeSuggestedProduct()
{
    const [products, setProducts] = useState<SimpleProductInfo[]>([])
    const numberOfDisplayedProductPerScreen = 6
    const gridColumnSpan = 4;
    const SuggestionProductsMoreDetailHref = "#"
    const autoPlayCarouselSpeed = 5000 //ms

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
            if(items.length == 0)
            {
                continue
            }
            const row = items.map((value: SimpleProductInfo, index:number) =>
            {
                return(
                    <Col key={value._id + new String(index)} span={gridColumnSpan}>
                        <SimpleProductCard info={value}/>
                    </Col>
                )
            })
            
            const rowWrapper = <Row key={startIndex.toString()+endIndex.toString()}>
                {row}
            </Row>

            result = result.concat(<div key={i.toString()+startIndex.toString()+endIndex.toString()}>{rowWrapper}</div>)
        }

        return result
    }

    return(
        <>
            <div className="w-full flex justify-center items-center">
                <div className="w-10/12">
                    <div className="invisible h-10 w-full">
                    </div>
                    <Card>
                        <Flex className="w-full mb-4" align="center">
                            <Typography.Text className="text-3xl font-semibold w-full">
                                Products you may like
                            </Typography.Text>
                            <Flex className="w-full px-4" justify="end" align="center">
                                <Link href={SuggestionProductsMoreDetailHref} prefetch={false}>
                                    <Typography.Text className="text-base underline">
                                        more details
                                    </Typography.Text>
                                </Link>
                                <Typography.Text className="text-base underline">
                                    <AiOutlineRight size={"16px"}/>
                                </Typography.Text>
                            </Flex>
                        </Flex>
                        <Carousel
                        autoplay
                        autoplaySpeed={autoPlayCarouselSpeed}
                        >
                            {productDisplay()}
                        </Carousel>
                    </Card>
                    <div className="invisible h-10 w-full">
                    </div>
                </div>
            </div>
        </>
    )
}