import { Card, Flex, Image, Typography } from "antd";
import { MouseEvent } from "react";


interface SimpleProductCardProps
{
    info: SimpleProductInfo
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

export default function SimpleProductCard({info}:SimpleProductCardProps)
{
    //here we can get locale from web locale language hahaha
    const locale = 'vi-VN'
    const currencyFormater = Intl.NumberFormat(locale, {style:"currency", currency:"VND"})

    function calculateDiscountPercentage(originalPrice: number, finalPrice: number)
    {
        return Math.ceil((originalPrice - finalPrice)*100 / originalPrice)
    }

    function handleOnClickButton(event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>)
    {
        console.log(info)
    }

    return(
        <>
            <Card style={{height:"100%"}} onClick={(handleOnClickButton)} hoverable>
                <Card cover={<Image src={info.image}/>}
                    bordered={false} style={{height:"150px", maxHeight:"150px"}}>
                </Card>
                <Flex justify="end">
                    {
                        info.originalPrice !== undefined && info.originalPrice != null && info.originalPrice > 0?
                        <Typography.Text style={{borderTopLeftRadius: "25px", borderBottomLeftRadius: "25px"}} 
                            className="text-base bg-orange-500 w-1/4 text-center">
                            -{calculateDiscountPercentage(info.originalPrice, info.finalPrice)}%
                        </Typography.Text>:
                        <Typography.Text className="invisible">
                            No discount
                        </Typography.Text>
                    }
                </Flex>
                <Flex vertical align="center" justify="center">
                    <Typography className="text-lg">
                        {info.name}
                    </Typography>
                    {
                        (info.originalPrice !== undefined)?
                        <Typography className="text-sm text-slate-400 line-through">
                            {currencyFormater.format(info.originalPrice)}
                        </Typography>:
                        <Typography className="invisible text-sm">
                            No discount
                        </Typography>
                    }
                    {
                        (info.originalPrice !== undefined && info.originalPrice != null && info.originalPrice > 0)?
                        <Typography.Text className="text-2xl text-orange-500">
                            {currencyFormater.format(info.finalPrice)}
                        </Typography.Text>:
                        <Typography.Text className="text-2xl text-slate-600">
                            {currencyFormater.format(info.finalPrice)}
                        </Typography.Text>
                    }
                    <button className="bg-orange-500 mt-2 hover:bg-orange-600 hover:text-white px-2 py-1 rounded-md text-base">
                        Thêm vào giỏ hàng
                    </button>
                </Flex>
            </Card>
        </>
    )
}