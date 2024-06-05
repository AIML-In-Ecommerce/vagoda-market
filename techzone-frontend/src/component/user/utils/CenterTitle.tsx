'use client';

import { Flex } from "antd"
import { useEffect, useState } from "react"


interface CenterTitleProps
{
    title: string,
    subTitle: string | undefined,
    isUppercase: boolean,
    background: string,
}

function CenterTitle({title, subTitle, isUppercase, background}: CenterTitleProps)
{
    const [uppercase, setUppercase] = useState<string>("")

    useEffect(() =>
    {
        if(isUppercase == true)
        {
            setUppercase(" uppercase ")
        }
    }, [])


    return(
        <>
            <Flex className="w-full" vertical justify="center" align="center">
                <Flex className="container w-full py-2" justify="center" align="center">
                    <Flex className="w-full" vertical justify="center" align="center">
                        <div className="w-1/2 h-1 bg-[#683A25] relative rounded-full"></div>
                    </Flex>
                    <div className={`absolute z-10 px-8 py-2 rounded-full ${background}`}>
                        <p className={`${uppercase} text-2xl font-semibold`}>{title}</p>
                    </div>
                </Flex>
                {subTitle ? 
                        <Flex className="w-full mt-3 py-1 px-4" justify="center" align="center">
                            <p className="text-[#797979] text-sm italic">{subTitle}</p>
                        </Flex>:
                        <></>
                }
            </Flex>
        </>
    )
}

export default CenterTitle