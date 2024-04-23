import PromotionCard from "@/component/customer/product/PromotionCard"
import { DiscountType, PromotionType } from "@/model/PromotionType"
import { Button, Flex, Skeleton } from "antd"
import React, { useEffect, useRef, useState } from "react"

interface SetupProps
{
    setup: InfinitePromotionListProps
}

export interface InfinitePromotionListProps
{
    overflowMaxHeight: string,

}

const MockData: PromotionType[] = 
[
    {
        _id: "pro-01",
        name: "Brand Opening Sales 15%",
        description: "Applied for all of our products bought online",
        discountType: DiscountType.PERCENTAGE,
        discountValue: 15,
        upperBound: 1000000,
        lowerBound: 0,
        quantity: 1000,
        activeDate: "2024-01-01",
        expiredDate: "2024-06-01",
        createdAt: "2023-10-02"
    },
    {
        _id: "pro-02",
        name: "Sales 06-01",
        description: "Sale 20% up to 100k. Applied when customer buy an item worth at least 20,000k",
        discountType: DiscountType.DIRECT_PRICE,
        discountValue: 20,
        upperBound: 100000,
        lowerBound: 20000,
        quantity: 1000,
        activeDate: "2024-01-01",
        expiredDate: "2024-06-01",
        createdAt: "2023-10-02"
    },
    {
        _id: "pro-03",
        name: "Big Sale Dell Laptops 1000k for students",
        description: "Applied when a student buys a Dell laptop",
        discountType: DiscountType.DIRECT_PRICE,
        discountValue: 1000000,
        upperBound: 1000000,
        lowerBound: 8000000,
        quantity: 1000,
        activeDate: "2024-01-01",
        expiredDate: "2024-06-01",
        createdAt: "2023-10-02"
    },
    {
        _id: "pro-04",
        name: "Big Sale Lenovo Laptops 1000k for students",
        description: "Applied when a student buys a Lenovo laptop",
        discountType: DiscountType.DIRECT_PRICE,
        discountValue: 1000000,
        upperBound: 1000000,
        lowerBound: 8000000,
        quantity: 1000,
        activeDate: "2024-01-01",
        expiredDate: "2024-06-01",
        createdAt: "2023-10-02"
    },
    {
        _id: "pro-05",
        name: "Big Sale HP Laptops upto 1000k for students",
        description: "Applied when a student buys a HP laptop",
        discountType: DiscountType.DIRECT_PRICE,
        discountValue: 1000000,
        upperBound: 1000000,
        lowerBound: 8000000,
        quantity: 1000,
        activeDate: "2024-01-01",
        expiredDate: "2024-06-01",
        createdAt: "2023-10-02"
    }
]

export default function InfinitePromotionList(setupProps: SetupProps)
{

    const [promotions, setPromotions] = useState<PromotionType[]>([])
    const [selectedPromotions, setSelectedPromotions] = useState<PromotionType[]>([])
    const [isLoadingItems, setIsLoadingItems] = useState<boolean>(false)

    const ref = useRef(null);
    React.useEffect(() => {
      require("@lottiefiles/lottie-player");
    });

    const loadingLottie =
        <lottie-player
          id="firstLottie"
          ref={ref}
          autoPlay
          loop
          mode="normal"
          src="https://lottie.host/db240567-c95f-4ada-816c-1edf9286f14e/0QXuCKuchC.json"
          style={{height: "60px"}}
        ></lottie-player>


    useEffect(() =>
    {
        
        setIsLoadingItems(true)
        
        //for testing
        setTimeout(() =>
        {
            setPromotions(MockData)
            setIsLoadingItems(false)
        }, 3000)

        //fetch data here

    },
    [])

    function handleApplyDiscount(item: PromotionType)
    {

    }

    function handleRemoveDiscount(item: PromotionType)
    {

    }

    function handleLoadMoreOnClick()
    {
        setIsLoadingItems(true)

        setTimeout(() =>
        {
            setIsLoadingItems(false)
            const newPromotions = [...promotions].concat([...MockData])
            setPromotions(newPromotions)
        }, 3000)
    }

    const displayList: JSX.Element[] | JSX.Element = promotions.length < 1?
    <div className="w-full">
        <Skeleton active />
    </div>:
    promotions.map((value: PromotionType, index: number) =>
    {
        return(
            <PromotionCard key={value._id + index.toString()} item={value} promotions={selectedPromotions} applyDiscount={handleApplyDiscount} removeDiscount={handleRemoveDiscount}/>
        )
    })

    const LoadMoreButton = isLoadingItems == true? <div className="w-full">{loadingLottie}</div> :
    <Button className="border-none" onClick={handleLoadMoreOnClick}>
        Xem thêm
    </Button>

    return(
        <>
            <Flex className="w-full h-full bg-white" vertical justify="center" align="center">
                <div className="overflow-y-auto py-4 w-full" style={{maxHeight: `${setupProps.setup.overflowMaxHeight}`}}>
                    {displayList}
                </div>
                <Flex className="w-full" justify="center" align="center">
                    {LoadMoreButton}
                </Flex>
            </Flex>
        </>
    )
}