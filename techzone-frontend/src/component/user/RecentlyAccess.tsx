'use client';

import { Col, Flex, Row, Skeleton } from "antd"
import CenterTitle from "./utils/CenterTitle"
import { _ProductType, ProductDetailType } from "@/model/ProductType";
import { useContext, useEffect, useState } from "react";
import ProductItem from "@/component/customer/ProductItem";
import { AuthContext } from "@/context/AuthContext";


interface RecentlyAccessProps
{}

const MockData: ProductDetailType[] = 
[
    {
        _id: "sp-01",
        name: "Áo khoác Y4",
        description: "",
        originalPrice: 390000,
        finalPrice: 340000,
        category: {
            _id: "c-01",
            name: "Áo",
            image: "https://images.pexels.com/photos/19461512/pexels-photo-19461512/free-photo-of-model-in-an-unbuttoned-white-short-sleeved-shirt-with-a-purple-butterfly-print-lying-on-the-floor.jpeg?auto=compress&cs=tinysrgb&w=600",
            __v: 0
        },
        subCategory: {
            _id: "sc-01",
            name: "Áo khoác",
            __v: 0
        },
        subCategoryType: {
            _id: "sct-01",
            name: "Áo khoác mùa đông",
            __v: 0
        },
        shop: "sh-01",
        status: "AVAILABLE",
        image: [
            {
                color: {
                    label: "white",
                    value: "FFFFFF"
                },
                link: "https://images.pexels.com/photos/19461512/pexels-photo-19461512/free-photo-of-model-in-an-unbuttoned-white-short-sleeved-shirt-with-a-purple-butterfly-print-lying-on-the-floor.jpeg?auto=compress&cs=tinysrgb&w=600",
                type: ""
            }
        ],
        avgRating: 4.8,
        soldQuantity: 2000,
        flatformFee: 4000,
        createdAt: (new Date())
    },
    {
        _id: "sp-01",
        name: "Áo khoác Y4",
        description: "",
        originalPrice: 390000,
        finalPrice: 340000,
        category: {
            _id: "c-01",
            name: "Áo",
            image: "https://images.pexels.com/photos/19461512/pexels-photo-19461512/free-photo-of-model-in-an-unbuttoned-white-short-sleeved-shirt-with-a-purple-butterfly-print-lying-on-the-floor.jpeg?auto=compress&cs=tinysrgb&w=600",
            __v: 0
        },
        subCategory: {
            _id: "sc-01",
            name: "Áo khoác",
            __v: 0
        },
        subCategoryType: {
            _id: "sct-01",
            name: "Áo khoác mùa đông",
            __v: 0
        },
        shop: "sh-01",
        status: "AVAILABLE",
        image: [
            {
                color: {
                    label: "white",
                    value: "FFFFFF"
                },
                link: "https://images.pexels.com/photos/19461512/pexels-photo-19461512/free-photo-of-model-in-an-unbuttoned-white-short-sleeved-shirt-with-a-purple-butterfly-print-lying-on-the-floor.jpeg?auto=compress&cs=tinysrgb&w=600",
                type: ""
            }
        ],
        avgRating: 4.8,
        soldQuantity: 2000,
        flatformFee: 4000,
        createdAt: (new Date())
    },
    {
        _id: "sp-02",
        name: "Áo khoác Y5",
        description: "",
        originalPrice: 390000,
        finalPrice: 340000,
        category: {
            _id: "c-01",
            name: "Áo",
            image: "https://images.pexels.com/photos/19461512/pexels-photo-19461512/free-photo-of-model-in-an-unbuttoned-white-short-sleeved-shirt-with-a-purple-butterfly-print-lying-on-the-floor.jpeg?auto=compress&cs=tinysrgb&w=600",
            __v: 0
        },
        subCategory: {
            _id: "sc-01",
            name: "Áo khoác",
            __v: 0
        },
        subCategoryType: {
            _id: "sct-01",
            name: "Áo khoác mùa đông",
            __v: 0
        },
        shop: "sh-01",
        status: "AVAILABLE",
        image: [
            {
                color: {
                    label: "white",
                    value: "FFFFFF"
                },
                link: "https://images.pexels.com/photos/19461512/pexels-photo-19461512/free-photo-of-model-in-an-unbuttoned-white-short-sleeved-shirt-with-a-purple-butterfly-print-lying-on-the-floor.jpeg?auto=compress&cs=tinysrgb&w=600",
                type: ""
            }
        ],
        avgRating: 4.8,
        soldQuantity: 2000,
        flatformFee: 4000,
        createdAt: (new Date())
    },
    {
        _id: "sp-03",
        name: "Áo khoác Y1",
        description: "",
        originalPrice: 390000,
        finalPrice: 340000,
        category: {
            _id: "c-01",
            name: "Áo",
            image: "https://images.pexels.com/photos/19461512/pexels-photo-19461512/free-photo-of-model-in-an-unbuttoned-white-short-sleeved-shirt-with-a-purple-butterfly-print-lying-on-the-floor.jpeg?auto=compress&cs=tinysrgb&w=600",
            __v: 0
        },
        subCategory: {
            _id: "sc-01",
            name: "Áo khoác",
            __v: 0
        },
        subCategoryType: {
            _id: "sct-01",
            name: "Áo khoác mùa đông",
            __v: 0
        },
        shop: "sh-01",
        status: "AVAILABLE",
        image: [
            {
                color: {
                    label: "white",
                    value: "FFFFFF"
                },
                link: "https://images.pexels.com/photos/19461512/pexels-photo-19461512/free-photo-of-model-in-an-unbuttoned-white-short-sleeved-shirt-with-a-purple-butterfly-print-lying-on-the-floor.jpeg?auto=compress&cs=tinysrgb&w=600",
                type: ""
            }
        ],
        avgRating: 4.8,
        soldQuantity: 2000,
        flatformFee: 4000,
        createdAt: (new Date())
    },
    {
        _id: "sp-01",
        name: "Áo khoác Y2",
        description: "",
        originalPrice: 390000,
        finalPrice: 340000,
        category: {
            _id: "c-01",
            name: "Áo",
            image: "https://images.pexels.com/photos/19461512/pexels-photo-19461512/free-photo-of-model-in-an-unbuttoned-white-short-sleeved-shirt-with-a-purple-butterfly-print-lying-on-the-floor.jpeg?auto=compress&cs=tinysrgb&w=600",
            __v: 0
        },
        subCategory: {
            _id: "sc-01",
            name: "Áo khoác",
            __v: 0
        },
        subCategoryType: {
            _id: "sct-01",
            name: "Áo khoác mùa đông",
            __v: 0
        },
        shop: "sh-01",
        status: "AVAILABLE",
        image: [
            {
                color: {
                    label: "white",
                    value: "FFFFFF"
                },
                link: "https://images.pexels.com/photos/19461512/pexels-photo-19461512/free-photo-of-model-in-an-unbuttoned-white-short-sleeved-shirt-with-a-purple-butterfly-print-lying-on-the-floor.jpeg?auto=compress&cs=tinysrgb&w=600",
                type: ""
            }
        ],
        avgRating: 4.8,
        soldQuantity: 2000,
        flatformFee: 4000,
        createdAt: (new Date())
    },
    {
        _id: "sp-05",
        name: "Áo khoác Y4",
        description: "",
        originalPrice: 390000,
        finalPrice: 340000,
        category: {
            _id: "c-01",
            name: "Áo",
            image: "https://images.pexels.com/photos/19461512/pexels-photo-19461512/free-photo-of-model-in-an-unbuttoned-white-short-sleeved-shirt-with-a-purple-butterfly-print-lying-on-the-floor.jpeg?auto=compress&cs=tinysrgb&w=600",
            __v: 0
        },
        subCategory: {
            _id: "sc-01",
            name: "Áo khoác",
            __v: 0
        },
        subCategoryType: {
            _id: "sct-01",
            name: "Áo khoác mùa đông",
            __v: 0
        },
        shop: "sh-01",
        status: "AVAILABLE",
        image: [
            {
                color: {
                    label: "white",
                    value: "FFFFFF"
                },
                link: "https://images.pexels.com/photos/19461512/pexels-photo-19461512/free-photo-of-model-in-an-unbuttoned-white-short-sleeved-shirt-with-a-purple-butterfly-print-lying-on-the-floor.jpeg?auto=compress&cs=tinysrgb&w=600",
                type: ""
            }
        ],
        avgRating: 4.8,
        soldQuantity: 2000,
        flatformFee: 4000,
        createdAt: (new Date())
    },
]

const paddingItem: _ProductType =
{
    _id: "pd-",
    name: "padding",
    image: "",
    avgRating: 0,
    soldQuantity: 0,
    finalPrice: 0,
    originalPrice: 0,
    isFlashSale: false
}

function RecentlyAccess({}: RecentlyAccessProps)
{

    const numberOfProductToDisplay = 6
    const titleValue = "Truy cập gần đây"
    const subTitle = "Sản phẩm đã truy cập trong tuần"
    const titleBackground = "bg-[#F2F2F2]"

    const [products, setProducts] = useState<_ProductType[]>([])
    const [mainDisplay, setMainDisplay] = useState<JSX.Element[]>(new Array(numberOfProductToDisplay).fill(<Skeleton active />).map((item, index) => <div key={Math.random() + index.toString()}>{item}</div>))

    useEffect(() =>
    {

        //load data here

        //for testing

        // const data = MockData.map((value: ProductDetailType) =>
        // {
        //     const mapItem: _ProductType =
        //     {
        //         _id: value._id,
        //         name: value.name,
        //         image: value.image[0].link,
        //         avgRating: value.avgRating,
        //         soldQuantity: value.soldQuantity,
        //         finalPrice: value.finalPrice,
        //         originalPrice: value.originalPrice,
        //         isFlashSale: false,
        //     }

        //     return mapItem
        // })

        // setProducts(data)
    },
    [])

    const authContext = useContext(AuthContext)
    

    useEffect(() =>
    {
        if(products.length == 0)
        {
            const loadingItems = new Array(numberOfProductToDisplay).fill(<Skeleton active />)
            const loadingDisplay = loadingItems.map((item, index: number) =>
            {
                return(
                    <div key={Math.random().toString() + "-" + index.toString()}>
                        {item}
                    </div>
                )
            })
            setMainDisplay(loadingDisplay)
        }
        else
        {
            let newDisplay = products.map((item) =>
                {
                    return(
                        <div className="" key={item._id}>
                            <ProductItem 
                            imageLink={item.image} name={item.name} rating={item.avgRating} soldAmount={item.soldQuantity} 
                            price={item.finalPrice} isFlashSale={item.isFlashSale} originalPrice={item.originalPrice} inWishlist={false} />
                        </div>
                    )
                })
        
            setMainDisplay(newDisplay)
        }
    },
    [products])

    return(
        <>
            <Flex className="w-full py-4 container" vertical justify="center" align="center">
                <CenterTitle title={titleValue} subTitle={subTitle} isUppercase={true} background={titleBackground}/>
                <div className="invisible h-10 w-full">
                </div>
                <Flex className="w-full" justify="center" align="center" gap={8}>
                    {mainDisplay}
                </Flex>
                <div className="invisible h-10 w-full">
                </div>
            </Flex>
        </>
    )
}

export default RecentlyAccess