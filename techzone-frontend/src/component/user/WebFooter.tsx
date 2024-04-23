'use client'

import { Flex, Image, Skeleton, Typography } from "antd"
import Link from "next/link"
import { useEffect, useState } from "react"
import facebookImgLocalLink from '../../../public/asset/facebook.256x256.png'
import mediaImgLocalLink from '../../../public/asset/youtube.256x180.png'
import googleImgLocalLink from '../../../public/asset/google.256x256.png'


interface WebFooterProps
{

}

interface ServiceInfoTypeProps
{
    _id: string,
    name: string,
    child: ServiceInfoProps[]
}

interface ServiceInfoProps
{
    _id: string,
    name: string,
    link: string,
    icon: string
}

const ServiceInfoTypeMockData = 
[
    {
        _id: "sid-01",
        name: "Hỗ trợ khách hàng",
        child:
        [
            "si-01", "si-02", "si-03", "si-04", "si-05"
        ]
    },
    {
        _id: "sid-02",
        name: "Chính sách mua hàng",
        child:
        [
            "si-06", "si-07", "si-08", "si-09", "si-10", "si-11"
        ]
    },
    {
        _id: "sid-03",
        name: "Thông tin TechZone",
        child:
        [
            "si-12", "si-13", "si-14", "si-15", "si-16", "si-17", "si-18"
        ]
    },
    {
        _id: "sid-04",
        name: "Cộng đồng TechZone",
        child:
        [
            "si-19", "si-20", "si-21", "si-22"
        ]
    },
    {
        _id: "sid-05",
        name: "Email liên hệ",
        child:
        [
            "si-23", "si-24", "si-25"
        ]
    }
]

const ServiceInfoMockData = 
[
    {
        _id: "si-01",
        name: "Thẻ ưu đãi",
        link: "#",
        icon: ""
    },
    {
        _id: "si-02",
        name: "Hướng dẫn mua online",
        link: "#",
        icon: ""
    },
    {
        _id: "si-03",
        name: "Ưu đãi cho doanh nghiệp",
        link: "#",
        icon:""
    },
    {
        _id: "si-04",
        name: "Chính sách trả góp",
        link: "#",
        icon: ""
    },
    {
        _id: "si-05",
        name: "Dịch vụ sửa chữa",
        link: "#",
        icon: ""
    },
    {
        _id: "si-06",
        name: "Điều kiện giao dịch chung",
        link: "#",
        icon: ""
    },
    {
        _id: "si-07",
        name: "Chính sách bảo hành",
        link: "#",
        icon: ""
    },
    {
        _id: "si-08",
        name: "Chính sách đổi trả",
        link: "#",
        icon: ""
    },
    {
        _id: "si-09",
        name: "Chính sách thanh toán",
        link: "#",
        icon: ""
    },
    {
        _id: "si-10",
        name: "Giao hàng và lắp đặt",
        link: "#",
        icon: ""
    },
    {
        _id: "si-11",
        name: "Dịch vụ lắp đặt và nâng cấp",
        link: "#",
        icon: ""
    },
    {
        _id: "si-12",
        name: "Giới thiệu TechZone",
        link: "#",
        icon: ""
    },
    {
        _id: "si-13",
        name: "Hệ thống cửa hàng",
        link: "#",
        icon: ""
    },
    {
        _id: "si-14",
        name: "Trung tâm bảo hành",
        link: "#",
        icon: ""
    },
    {
        _id: "si-15",
        name: "Chính sách bảo mật",
        link: "#",
        icon: ""
    },
    {
        _id: "si-16",
        name: "Tin công nghệ",
        link: "#",
        icon: ""
    },
    {
        _id: "si-17",
        name: "Hỏi đáp",
        link: "#",
        icon: ""
    },
    {
        _id: "si-18",
        name: "Tuyển dụng",
        link: "#",
        icon: ""
    },
    {
        _id: "si-19",
        name: "Facebook TechZone",
        link: "#",
        icon: facebookImgLocalLink.src
    },
    {
        _id: "si-20",
        name: "TechZone Media",
        link: "#",
        icon: mediaImgLocalLink.src
    },
    {
        _id: "si-21",
        name: "TechZone gmail",
        link: "#",
        icon: googleImgLocalLink.src
    },
    {
        _id: "si-22",
        name: "Chăm sóc khách hàng",
        link: "#",
        icon: ""
    },
    {
        _id: "si-23",
        name: "Hỗ trợ khách hàng",
        link: "#",
        icon: ""
    },
    {
        _id: "si-24",
        name: "Liên hệ hỗ trợ seller",
        link: "#",
        icon: ""
    },
    {
        _id: "si-25",
        name: "Hỗ trợ phát triển",
        link: "#",
        icon: ""
    }
]

const PaymentMethodMockData = 
[
    
]

export default function WebFooter({}: WebFooterProps)
{

    const [supportServices, setSupportService] = useState<ServiceInfoTypeProps[]>([])
    const [supportPayments, setSupportPayments] = useState([])

    useEffect(() =>
    {
        //fetch data here

        //for testing

        const ServiceInfoMap = new Map()
        ServiceInfoMockData.forEach((value) =>
        {
            ServiceInfoMap.set(value._id, value)
        })

        const data = ServiceInfoTypeMockData.map((value) =>
        {
            const serviceInfos = value.child.map((valueId) =>
            {
                const value = ServiceInfoMap.get(valueId)
                const item: ServiceInfoProps = {
                    _id: value._id,
                    name: value.name,
                    link: value.link,
                    icon: value.icon
                }

                return item;
            }) 

            const item: ServiceInfoTypeProps = 
            {
                _id: value._id,
                name: value.name,
                child: serviceInfos
            }

            return item;
        })

        setSupportService(data)
    },
    [])

    useEffect(() =>
    {

    },
    [])

    const SupportServicesDisplay = supportServices.length < 1 ? <Skeleton active />:
    <>
        <Flex className="w-11/12" justify={"space-evenly"} align="start">
            {
                supportServices.map((value: ServiceInfoTypeProps) =>
                {
                    const childDisplay = value.child.map((item: ServiceInfoProps) =>
                    {

                        return(
                            <Link key={item._id} href={item.link} prefetch={false}>
                                <Typography.Text className="no-underline text-sm hover:text-blue-500">
                                    <Flex justify="start" align="center">
                                        {item.icon.length > 0 ? <img className="w-4 h-4" src={item.icon} alt="icon"></img>: <></>}
                                        {item.name}
                                    </Flex>
                                </Typography.Text>
                            </Link>
                        )
                    })

                    return(
                        <Flex key={value._id} vertical justify="center" align="start">
                            <Typography.Text className="text-blue-800 mb-1 font-semibold">
                                {value.name}
                            </Typography.Text>
                            {childDisplay}
                        </Flex>
                    )
                })
            }
        </Flex>
    </>

    return(
        <>
            <div className="w-full h-0.5 invisible">
                hidden block
            </div>
            <div className="w-full">
                <div className="bg-blue-800 h-0.5"></div>
                <div className="w-full h-7 invisible">
                    hidden block
                </div>
                <Flex justify="center" align="center" className="w-full">
                    {
                        SupportServicesDisplay
                    }
                </Flex>
                <div className="w-full h-7 invisible">
                    hidden block
                </div>
                <div className="w-full flex justify-evenly items-center">
                    <Flex justify="center" className="w-1/2">
                        <Image src={"@asset/logo.png"} />
                        <Typography.Text className="text-grey-300 text-base">
                            CÔNG TY CỔ PHẦN THƯƠNG MẠI - DỊCH VỤ TECHZONE
                        </Typography.Text>
                    </Flex>
                    <Flex vertical justify="center" className="w-1/2">
                        <Typography.Text className="text-black font-semibold text-sm">
                            Địa chỉ trụ sở chính:
                        </Typography.Text>
                        <Typography.Text className="text-grey-200 text-sm">
                            227 Đ.Nguyễn Văn Cừ, Phường 4, quận 5, thành phố Hồ Chí Minh
                        </Typography.Text>
                    </Flex>
                </div>
            </div>
        </>
    )
}