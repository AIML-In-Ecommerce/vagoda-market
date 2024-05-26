'use client'

import { Flex, Spin } from "antd";


export default function RootLoading()
{


    return(
        <>
            <div className="w-full h-dvh">
                <Flex className="w-full h-full" justify="center" align="center">
                    <Spin size="large" />
                </Flex>
            </div>
        </>
    )
}