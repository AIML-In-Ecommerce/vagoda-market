import { Button, Card, Flex, Image, Typography } from "antd";
import { MouseEvent, useState } from "react";
import { PiShoppingCart } from "react-icons/pi";


interface SimpleProductCardProps
{
    info: SimpleProductInfo,
    imageHeight: string | undefined,
    imageWidth: string | undefined
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

export default function SimpleProductCard({info, imageHeight, imageWidth}:SimpleProductCardProps)
{
    //here we can get locale from web locale language hahaha
    const locale = 'vi-VN'
    const visibleAdditionalInfo = "transition-opacity duration-1000 opacity-100"
    const hiddenAdditionalInfo = "transition-opacity duration-1000 opacity-0"

    const currencyFormater = Intl.NumberFormat(locale, {style:"currency", currency:"VND"})
    const [visibleAdditionalInfoState, setVisibleAdditionalInfoState] = useState<string>(hiddenAdditionalInfo)

    function calculateDiscountPercentage(originalPrice: number, finalPrice: number)
    {
        return Math.ceil((originalPrice - finalPrice)*100 / originalPrice)
    }

    function handleAddToCartOnClick()
    {
        console.log(info)
    }

    function handleItemOnClick()
    {

    }

    function handleMouseEnter()
    {
        setTimeout(() =>
        {
            setVisibleAdditionalInfoState(visibleAdditionalInfo)
        }, 700)
    }

    function handleMouseLeave()
    {
        setTimeout(() =>
        {
            setVisibleAdditionalInfoState(hiddenAdditionalInfo)
        }, 1000)
    }

    const ProductImage = <Image className="rounded-lg" height={imageHeight} width={imageWidth} src={info.image}/>

    const ProductFinalPrice = <p className="text-xl sm:text-md font-semibold text-amber-700">{currencyFormater.format(info.finalPrice)}</p>

    const ProductOriginPrice = <p className="text-sm xs:text-xs line-through">{currencyFormater.format(info.originalPrice)}</p>

    const ProductName = <p className="text-wrap text-base font-semibold text-amber-900">{info.name}</p>


    return(
        <>
            <Flex className="h-full rounded-lg bg-white hover:border-2 hover:border-stone-600 py-2 px-1" vertical justify="center"
                onMouseEnter={() => handleMouseEnter()} onMouseLeave={() => handleMouseLeave()}
                onClick={() => handleItemOnClick()}
            >
                <Flex className="relative" vertical justify="center" align="center">
                    <div>{ProductImage}</div>
                    <Flex className={`w-full absolute bottom-0 bg-white py-4 ${visibleAdditionalInfoState}`} justify="center" align="center">
                        <Flex className="w-2/3 px-2" justify="start" align="baseline">
                            {ProductName}
                        </Flex>
                        <Flex className="w-1/3" justify="end" align="center">
                            <button className="w-full" type="button" onClick={() => handleAddToCartOnClick}>
                                <Flex className="w-full bg-stone-600 hover:bg-stone-700 font-semibold text-white py-2 rounded-md" justify="center" align="center" gap={4}>
                                    <PiShoppingCart />
                                    <p>Add</p>
                                </Flex>
                            </button>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex className="w-full pl-1" justify="center" align="center">
                    <Flex className="w-2/3 pl-1" vertical justify="center" align="start">
                        {ProductFinalPrice}
                        {ProductOriginPrice}
                    </Flex>
                    <Flex className="w-1/3 bg-amber-800 h-12" justify="center" align="center">
                        <p className="text-white text-lg">-{calculateDiscountPercentage(info.originalPrice, info.finalPrice)}%</p>
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}