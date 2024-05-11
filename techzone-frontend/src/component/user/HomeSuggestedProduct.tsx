'use client'


import { Card, Carousel, Flex, Skeleton, Typography,  } from "antd"
import { useEffect, useState } from "react"
import ProductItem from "./utils/ProductItem"
import Link from "next/link";
import { AiOutlineRight } from "react-icons/ai";
import { CarouselArrow } from "./utils/CarouselArrow";

// import SimpleProductCard from "./utils/SimpleProductCard"


interface HomeSuggestedProductProps
{

}

// interface SimpleProductInfo
// {
//     _id: string,
//     name: string,
//     originalPrice: number,
//     finalPrice: number,
//     status: string,
//     image: string,
// }

interface ProductItemProps 
{
    _id: string
    imageLink: string;
    name: string;
    rating: number;
    soldAmount: number;
    price: number;
    isFlashSale: boolean;
    originalPrice: number;
    inWishlist: boolean;
}

enum WrapperType{
    paddingBlock,
    infoBlock
}

interface ProductItemPropsWrapper
{
    type: WrapperType,
    productInfo: ProductItemProps
}

const paddingBlockProps: ProductItemProps =
{
    _id: "",
    imageLink: "",
    name: "padding",
    rating: 0.0,
    soldAmount: 0,
    price: 0,
    isFlashSale: false,
    originalPrice: 0,
    inWishlist: false
}

// const MockData = 
// [
//     {
//         _id: "test_01",
//         name: "Macbook air 2023",
//         attribute: {},
//         description: "a laptop",
//         originalPrice: undefined,
//         finalPrice: 20000000,
//         category: "c_01",
//         subCategory: "sc_01",
//         shop: "sh_01",
//         status: "SALE",
//         image: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
//         avgRating: 4.5,
//         createdAt: "",
//         requiredAttribute: []
//     },
//     {
//         _id: "test_02",
//         name: "Macbook air 2024",
//         attribute: {},
//         description: "a laptop",
//         originalPrice: 22000000,
//         finalPrice: 22000000,
//         category: "c_01",
//         subCategory: "sc_01",
//         shop: "sh_01",
//         status: "SALE",
//         image: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
//         avgRating: 4.5,
//         createdAt: "",
//         requiredAttribute: []
//     },
//     {
//         _id: "test_03",
//         name: "Dell SuperLight",
//         attribute: {},
//         description: "a laptop",
//         originalPrice: undefined,
//         finalPrice: 24000000,
//         category: "c_01",
//         subCategory: "sc_01",
//         shop: "sh_01",
//         status: "SALE",
//         image: ["https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
//         createdAt: "",
//         requiredAttribute: []
//     },
//     {
//         _id: "test_04",
//         name: "Macbook air 2023",
//         attribute: {},
//         description: "a laptop",
//         originalPrice: 22000000,
//         finalPrice: 20000000,
//         category: "c_01",
//         subCategory: "sc_01",
//         shop: "sh_01",
//         status: "SALE",
//         image: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
//         avgRating: 4.5,
//         createdAt: "",
//         requiredAttribute: []
//     },
//     {
//         _id: "test_05",
//         name: "Macbook air 2024",
//         attribute: {},
//         description: "a laptop",
//         originalPrice: undefined,
//         finalPrice: 22000000,
//         category: "c_01",
//         subCategory: "sc_01",
//         shop: "sh_01",
//         status: "SALE",
//         image: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
//         avgRating: 4.5,
//         createdAt: "",
//         requiredAttribute: []
//     },
//     {
//         _id: "test_06",
//         name: "Dell SuperLight",
//         attribute: {},
//         description: "a laptop",
//         originalPrice: 26000000,
//         finalPrice: 24000000,
//         category: "c_01",
//         subCategory: "sc_01",
//         shop: "sh_01",
//         status: "SALE",
//         image: ["https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
//         createdAt: "",
//         requiredAttribute: []
//     },
//     {
//         _id: "test_07",
//         name: "Macbook air 2023",
//         attribute: {},
//         description: "a laptop",
//         originalPrice: 22000000,
//         finalPrice: 20000000,
//         category: "c_01",
//         subCategory: "sc_01",
//         shop: "sh_01",
//         status: "SALE",
//         image: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
//         avgRating: 4.5,
//         createdAt: "",
//         requiredAttribute: []
//     },
//     {
//         _id: "test_08",
//         name: "Macbook air 2024",
//         attribute: {},
//         description: "a laptop",
//         originalPrice: 22000000,
//         finalPrice: 22000000,
//         category: "c_01",
//         subCategory: "sc_01",
//         shop: "sh_01",
//         status: "SALE",
//         image: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
//         avgRating: 4.5,
//         createdAt: "",
//         requiredAttribute: []
//     },
//     {
//         _id: "test_09",
//         name: "Dell SuperLight",
//         attribute: {},
//         description: "a laptop",
//         originalPrice: 26000000,
//         finalPrice: 24000000,
//         category: "c_01",
//         subCategory: "sc_01",
//         shop: "sh_01",
//         status: "SALE",
//         image: ["https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
//         createdAt: "",
//         requiredAttribute: []
//     },
//     {
//         _id: "test_10",
//         name: "Macbook air 2023",
//         attribute: {},
//         description: "a laptop",
//         originalPrice: 22000000,
//         finalPrice: 20000000,
//         category: "c_01",
//         subCategory: "sc_01",
//         shop: "sh_01",
//         status: "SALE",
//         image: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
//         avgRating: 4.5,
//         createdAt: "",
//         requiredAttribute: []
//     },
//     {
//         _id: "test_11",
//         name: "Macbook air 2024",
//         attribute: {},
//         description: "a laptop",
//         originalPrice: 22000000,
//         finalPrice: 22000000,
//         category: "c_01",
//         subCategory: "sc_01",
//         shop: "sh_01",
//         status: "SALE",
//         image: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
//         avgRating: 4.5,
//         createdAt: "",
//         requiredAttribute: []
//     },
//     {
//         _id: "test_12",
//         name: "Dell SuperLight",
//         attribute: {},
//         description: "a laptop",
//         originalPrice: 26000000,
//         finalPrice: 24000000,
//         category: "c_01",
//         subCategory: "sc_01",
//         shop: "sh_01",
//         status: "SALE",
//         image: ["https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
//         createdAt: "",
//         requiredAttribute: []
//     },
//     {
//         _id: "test_13",
//         name: "Macbook air 2023",
//         attribute: {},
//         description: "a laptop",
//         originalPrice: 22000000,
//         finalPrice: 20000000,
//         category: "c_01",
//         subCategory: "sc_01",
//         shop: "sh_01",
//         status: "SALE",
//         image: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
//         avgRating: 4.5,
//         createdAt: "",
//         requiredAttribute: []
//     },
//     {
//         _id: "test_14",
//         name: "Macbook air 2024",
//         attribute: {},
//         description: "a laptop",
//         originalPrice: 22000000,
//         finalPrice: 22000000,
//         category: "c_01",
//         subCategory: "sc_01",
//         shop: "sh_01",
//         status: "SALE",
//         image: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
//         avgRating: 4.5,
//         createdAt: "",
//         requiredAttribute: []
//     },
//     {
//         _id: "test_15",
//         name: "Dell SuperLight",
//         attribute: {},
//         description: "a laptop",
//         originalPrice: 26000000,
//         finalPrice: 24000000,
//         category: "c_01",
//         subCategory: "sc_01",
//         shop: "sh_01",
//         status: "SALE",
//         image: ["https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
//         createdAt: "",
//         requiredAttribute: []
//     },
//     {
//         _id: "test_16",
//         name: "Macbook air 2023",
//         attribute: {},
//         description: "a laptop",
//         originalPrice: 22000000,
//         finalPrice: 20000000,
//         category: "c_01",
//         subCategory: "sc_01",
//         shop: "sh_01",
//         status: "SALE",
//         image: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
//         avgRating: 4.5,
//         createdAt: "",
//         requiredAttribute: []
//     },
//     {
//         _id: "test_17",
//         name: "Macbook air 2024",
//         attribute: {},
//         description: "a laptop",
//         originalPrice: 22000000,
//         finalPrice: 22000000,
//         category: "c_01",
//         subCategory: "sc_01",
//         shop: "sh_01",
//         status: "SALE",
//         image: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
//         avgRating: 4.5,
//         createdAt: "",
//         requiredAttribute: []
//     },
//     {
//         _id: "test_18",
//         name: "Dell SuperLight",
//         attribute: {},
//         description: "a laptop",
//         originalPrice: 26000000,
//         finalPrice: 24000000,
//         category: "c_01",
//         subCategory: "sc_01",
//         shop: "sh_01",
//         status: "SALE",
//         image: ["https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
//         createdAt: "",
//         requiredAttribute: []
//     }
// ]

const MockData = 
[
    {
        _id: "sp-01",
        imageLink: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Lenovo 15i",
        rating: 4.5,
        soldAmount: 20,
        price: 15000000,
        isFlashSale: true,
        originalPrice: 17000000,
        inWishlist: false
    },
    {
        _id: "sp-02",
        imageLink: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Dell Vostro",
        rating: 4.5,
        soldAmount: 32,
        price: 17000000,
        isFlashSale: false,
        originalPrice: 17000000,
        inWishlist: false
    },
    {
        _id: "sp-03",
        imageLink: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Dell SuperLight",
        rating: 4.5,
        soldAmount: 10,
        price: 22000000,
        isFlashSale: true,
        originalPrice: 20000000,
        inWishlist: false
    },
    {
        _id: "sp-04",
        imageLink: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Lenovo 15i",
        rating: 4.5,
        soldAmount: 20,
        price: 15000000,
        isFlashSale: true,
        originalPrice: 17000000,
        inWishlist: false
    },
    {
        _id: "sp-05",
        imageLink: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Dell Vostro",
        rating: 4.5,
        soldAmount: 32,
        price: 17000000,
        isFlashSale: false,
        originalPrice: 17000000,
        inWishlist: false
    },
    {
        _id: "sp-06",
        imageLink: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Dell SuperLight",
        rating: 4.5,
        soldAmount: 10,
        price: 22000000,
        isFlashSale: true,
        originalPrice: 20000000,
        inWishlist: false
    },
    {
        _id: "sp-07",
        imageLink: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Lenovo 15i",
        rating: 4.5,
        soldAmount: 20,
        price: 15000000,
        isFlashSale: true,
        originalPrice: 17000000,
        inWishlist: false
    },
    {
        _id: "sp-08",
        imageLink: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Dell Vostro",
        rating: 4.5,
        soldAmount: 32,
        price: 17000000,
        isFlashSale: false,
        originalPrice: 17000000,
        inWishlist: false
    },
    {
        _id: "sp-09",
        imageLink: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Dell SuperLight",
        rating: 4.5,
        soldAmount: 10,
        price: 22000000,
        isFlashSale: true,
        originalPrice: 20000000,
        inWishlist: false
    },
    {
        _id: "sp-10",
        imageLink: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Lenovo 15i",
        rating: 4.5,
        soldAmount: 20,
        price: 15000000,
        isFlashSale: true,
        originalPrice: 17000000,
        inWishlist: false
    },
    {
        _id: "sp-11",
        imageLink: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Dell Vostro",
        rating: 4.5,
        soldAmount: 32,
        price: 17000000,
        isFlashSale: false,
        originalPrice: 17000000,
        inWishlist: false
    },
    {
        _id: "sp-12",
        imageLink: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Dell SuperLight",
        rating: 4.5,
        soldAmount: 10,
        price: 22000000,
        isFlashSale: true,
        originalPrice: 20000000,
        inWishlist: false
    }
]

export default function HomeSuggestedProduct({}: HomeSuggestedProductProps)
{
    const [products, setProducts] = useState<ProductItemProps[]>([])
    const numberOfDisplayedProductPerScreen = 5
    // const gridColumnSpan = 5;
    const SuggestionProductsMoreDetailHref = "#"
    const autoPlayCarouselSpeed = 5000 //ms

    useEffect(() =>
    {
        //fetch data here

        const data = MockData
        const tr_data: ProductItemProps[] = data.map((value) =>
        {
            const tr_item: ProductItemProps = {
                _id: value._id,
                imageLink: value.imageLink,
                name: value.name,
                rating: value.rating,
                soldAmount: value.soldAmount,
                price: value.price,
                isFlashSale: value.isFlashSale,
                originalPrice: value.originalPrice,
                inWishlist: value.inWishlist
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
            let items = products.slice(startIndex, endIndex).map((value: ProductItemProps) =>
            {
                const item: ProductItemPropsWrapper = 
                {
                    type: WrapperType.infoBlock,
                    productInfo: value
                }

                return item;
            })

            if(items.length == 0)
            {
                continue
            }
            else if (items.length < numberOfDisplayedProductPerScreen)
            {
                const paddingBlocks: ProductItemPropsWrapper[] = new Array<ProductItemProps>(numberOfDisplayedProductPerScreen - items.length).fill(paddingBlockProps).map((value: ProductItemProps) =>
                {
                    const item: ProductItemPropsWrapper = 
                    {
                        type: WrapperType.paddingBlock,
                        productInfo: value
                    }

                    return item
                })

                items = items.concat(paddingBlocks)
            }

            const row = items.map((valueWrapper: ProductItemPropsWrapper, index:number) =>
            {
                let isInvisible = ""
                if(valueWrapper.type == WrapperType.paddingBlock)
                {
                    isInvisible = "invisible"
                }
                const value = valueWrapper.productInfo

                return(
                    <div key={value._id + index.toString()} className={isInvisible}>
                        <ProductItem imageLink={value.imageLink} name={value.name} rating={value.rating} 
                        soldAmount={value.soldAmount} price={value.price} isFlashSale={value.isFlashSale} 
                        originalPrice={value.originalPrice} inWishlist={value.inWishlist} />
                    </div>
                )
            })
            
            const rowWrapper = <Flex key={startIndex.toString()+endIndex.toString()} justify="center" align="center" gap={6}>
                {row}
            </Flex>

            result = result.concat(<div key={i.toString()+startIndex.toString()+endIndex.toString()} className="py-3 px-6">{rowWrapper}</div>)
        }

        return result
    }

    return(
        <>
            <div className="w-full flex justify-center items-center">
                <div className="w-11/12">
                    <div className="invisible h-10 w-full">
                    </div>
                    {/* <Card className="w-full"> */}
                    <div className="w-full">
                        <Flex className="w-full mb-4" align="center">
                            <Typography.Text className="text-3xl font-semibold w-full">
                                Sản phẩm bạn có thể thích
                            </Typography.Text>
                            <Flex className="w-full px-4" justify="end" align="center" gap={6}>
                                <Link href={SuggestionProductsMoreDetailHref} prefetch={false}>
                                    <Typography.Text className="text-base">
                                        Xem thêm
                                    </Typography.Text>
                                </Link>
                                <Typography.Text className="text-base">
                                    <AiOutlineRight size={"16px"}/>
                                </Typography.Text>
                            </Flex>
                        </Flex>
                        <Carousel
                        autoplay
                        autoplaySpeed={autoPlayCarouselSpeed}
                        arrows
                        prevArrow={<CarouselArrow direction="left"/>}
                        nextArrow={<CarouselArrow direction="right"/>}
                        >
                            {productDisplay()}
                        </Carousel>
                    </div>
                    {/* </Card> */}
                    <div className="invisible h-10 w-full">
                    </div>
                </div>
            </div>
        </>
    )
}