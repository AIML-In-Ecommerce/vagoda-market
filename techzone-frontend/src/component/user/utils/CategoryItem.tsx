'use client'

import { CategoryType } from "@/model/CategoryType"
import { Flex, Image } from "antd"
import { useState } from "react"

/**
 * maxSize: [maxWidth, maxHeight]
 */
interface CategoryItemProps
{
    category: CategoryType,
    // maxSize: any[]
}


export default function CategoryItem(props: CategoryItemProps)
{
    const hiddenNameState = " transition-opacity duration-1000 ease-out opacity-0"
    const visibleNameState = " transition-opacity duration-700 ease-in opacity-100"

    const hiddenImageOpacity = " opacity-60"
    const visibleImageOpacity = " opacity-100"

    // const maxWidth = props.maxSize[0]
    // const maxHeight = props.maxSize[1]


    const [isVisibleName, setIsVisibleName] = useState<string>(hiddenNameState)
    const [imageOpacity, setImageOpacity] = useState<string>(visibleImageOpacity)

    function handleMouseEnter()
    {
        setTimeout(() =>
        {
            setImageOpacity(hiddenImageOpacity)
            setIsVisibleName(visibleNameState)
        }, 500)
        // setIsVisibleName(visibleNameState)

    }

    function handleMouseLeave()
    {
        setTimeout(() =>
        {
            setImageOpacity(visibleImageOpacity)
            setIsVisibleName(hiddenNameState)
        }, 700)
    }

    return(
        <>
            <div key={props.category._id} className="w-full h-full shadow-black hover:shadow-lg hover:shadow-black rounded-md" 
                onMouseEnter={() => {handleMouseEnter()}} onMouseLeave={() => {handleMouseLeave()}}
                // style={{maxHeight: maxHeight, maxWidth: maxWidth}}
                >
                {
                    props.category.image != undefined ?
                    <Image 
                    className={`container relative ${imageOpacity} rounded-md`}
                    width={"100%"}
                    height={"100%"}
                    preview={false}
                    src={props.category.image}
                    /> :
                    <Image 
                    className="container relative"
                    width={"100%"}
                    height={"100%"}
                    preview={false}
                    src={""}
                />
                }
                <Flex className={`container absolute bg-gray-50 bottom-10 left-0 right-0 h-1/5 min-h-16 w-full ${isVisibleName}`} justify="center" align="center">
                    <p className="font-semibold text-lg text-wrap">
                        {props.category.name}
                    </p>
                </Flex>
            </div>
        </>
    )
}