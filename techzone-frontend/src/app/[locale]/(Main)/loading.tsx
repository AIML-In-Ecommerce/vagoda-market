'use client'

import { Spin } from "antd";


export default function RootLoading()
{


    return(
        <>
            <div className="w-full h-svh">
                <Spin size="large" />
            </div>
        </>
    )
}