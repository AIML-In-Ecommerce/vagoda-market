'use client'

import { Button, Card, Carousel, Col, Divider, Flex, Image, Row, Skeleton } from "antd"
import Meta from "antd/es/card/Meta"
import { useEffect, useState } from "react"
import CategoryItem from "./utils/CategoryItem"
import { CategoryType } from "@/model/CategoryType"
import CenterTitle from "./utils/CenterTitle"



const MockData = [
    {
        "_id": "c-01",
        "key": "ck-01",
        "urlKey": "urlkc-01",
        "name": "Laptop",
        "image": "",
        "subCategoryType": ["sct-01", "sct-02", "sct-03", "sct-04", "sct-05"]
    },
    {
        "_id": "c-02",
        "key": "ck-02",
        "urlKey": "urlkc-02",
        "name": "Điện máy - Điện gia dụng",
        "image": "",
        "subCategoryType": ["sct-01", "sct-02", "sct-03", "sct-04", "sct-05"]
    },
    {
        "_id": "c-03",
        "key": "ck-03",
        "urlKey": "urlkc-03",
        "name": "PC - Máy tính bộ",
        "image": "",
        "subCategoryType": ["sct-01", "sct-02", "sct-03", "sct-04", "sct-05"]
    },
    {
        "_id": "c-04",
        "key": "ck-04",
        "urlKey": "urlkc-04",
        "name": "Màn hình máy tính",
        "image": "",
        "subCategoryType": ["sct-01", "sct-02", "sct-03", "sct-04", "sct-05"]
    },
    {
        "_id": "c-05",
        "key": "ck-05",
        "urlKey": "urlkc-05",
        "name": "Linh kiện máy tính",
        "image": "",
        "subCategoryType": ["sct-01", "sct-02", "sct-03", "sct-04", "sct-05"]
    },
    {
        "_id": "c-06",
        "key": "ck-06",
        "urlKey": "urlkc-06",
        "name": "Phụ kiện máy tính",
        "image": "",
        "subCategoryType": ["sct-01", "sct-02", "sct-03", "sct-04", "sct-05"]
    },
    {
        "_id": "c-07",
        "key": "ck-07",
        "urlKey": "urlkc-07",
        "name": "Game & Stream",
        "image": "",
        "subCategoryType": ["sct-01", "sct-02", "sct-03", "sct-04", "sct-05"]
    },
    {
        "_id": "c-08",
        "key": "ck-08",
        "urlKey": "urlkc-08",
        "name": "Điện thoại & Phụ kiện",
        "image": "",
        "subCategoryType": ["sct-01", "sct-02", "sct-03", "sct-04", "sct-05"]
    },
    {
        "_id": "c-09",
        "key": "ck-09",
        "urlKey": "urlkc-09",
        "name": "Phụ kiện",
        "image": "",
        "subCategoryType": ["sct-01", "sct-02", "sct-03", "sct-04", "sct-05"]
    },
    {
        "_id": "c-10",
        "key": "ck-10",
        "urlKey": "urlkc-10",
        "name": "Thiết bị âm thanh",
        "image": "",
        "subCategoryType": ["sct-01", "sct-02", "sct-03", "sct-04", "sct-05"]
    },
    {
        "_id": "c-11",
        "key": "ck-11",
        "urlKey": "urlkc-11",
        "name": "Thiết bị văn phòng",
        "image": "",
        "subCategoryType": ["sct-01", "sct-02", "sct-03", "sct-04", "sct-05"]
    },
    {
        "_id": "c-12",
        "key": "ck-12",
        "urlKey": "urlkc-12",
        "name": "Khác",
        "image": "",
        "subCategoryType": ["sct-01", "sct-02", "sct-03", "sct-04", "sct-05"]
    }
]

const listOfImage =
[
    ["c-01", "https://img.freepik.com/free-photo/asian-woman-red-dress-holding-shopping-bags-gift-voucher-chinese-new-year-shopping_74952-3450.jpg?t=st=1714987933~exp=1714991533~hmac=0a52eb3a16833863cf20c9622bdabd6b599d4304f43e2e5c081ccb40efb21022&w=996"],
    ["c-02", "https://img.freepik.com/free-photo/young-japanese-woman-portrait-sitting-chair_23-2148870794.jpg?t=st=1714987434~exp=1714991034~hmac=86f4474284a555dcbf48ec16b53723f0feae8827fe71dcdc763a15133b8f84ae&w=1380"],
    ["c-03", "https://img.freepik.com/free-photo/young-people-standing-looking-different-direction_23-2148134027.jpg?t=st=1714987969~exp=1714991569~hmac=beb516848cd0f8f8f175b769400d7cf1ad913178e17c271e8093b9a4cee57000&w=1060"],
    ["c-04", "https://img.freepik.com/free-photo/young-pretty-girl-with-two-braids-leather-jacket-skirt-with-black-backpack-shoulder-while-dreamily-looking-aside-beige-background_574295-4658.jpg?t=st=1714988026~exp=1714991626~hmac=ba592b33394b139b1eab031383722ba6ba60e7552a05e76c349ef2d11ee38b84&w=360"],
    ["c-05", "https://img.freepik.com/free-photo/beautiful-woman-basic-white-t-shirt-with-design-space_53876-102863.jpg?t=st=1714988070~exp=1714991670~hmac=385395a639464bf0fc7f954e0bbd0c6c547eca67d6aea27a94d89eb078ec9729&w=360"],
    ["c-06", "https://img.freepik.com/free-photo/pair-trainers_144627-3799.jpg?t=st=1714988110~exp=1714991710~hmac=d1beacb0e281ebd72582ae62a12f2ee4d82ed46f8cf5508ffed348a93087cdcc&w=826"],
    ["c-07", "https://img.freepik.com/free-photo/plaid-women-s-coat-outerwear-casual-fashion-with-design-space_53876-102118.jpg?t=st=1714988176~exp=1714991776~hmac=aeca31ca1155dcff0399a00b91fd9eaa690804e95ed52a7473bc20fe4eaeec47&w=360"],
    ["c-08", "https://img.freepik.com/free-psd/fashionable-hat-isolated_23-2151356980.jpg?w=826&t=st=1714988242~exp=1714988842~hmac=335bdf8fc3af754e4baafc2d140e8a9031a88739170fb6965cc06ba67a96ccf3"],
    ["c-09", "https://img.freepik.com/free-photo/stack-clothes-white-background-closeup_93675-132527.jpg?t=st=1714988257~exp=1714991857~hmac=e4ec31c5bae5d6392b2c67b47a17473c30f149d2e56e6fbb2a125be4b4ad0f06&w=360"],
    ["c-10", "https://img.freepik.com/free-vector/merchandising-stationery-mock-up_1102-92.jpg?w=740&t=st=1714988297~exp=1714988897~hmac=8f7b2d8daed2a9765188938b0038bf8ba01d43a225194ab655e61314693105c9"],
    ["c-11", "https://img.freepik.com/free-photo/man-black-sweater-black-bucket-hat-youth-apparel-shoot_53876-102294.jpg?t=st=1714987421~exp=1714991021~hmac=b66a76d2bc0c3d9209351ba4bd0a1fc5328fb0fb564f46befc53085d361814bc&w=360"],
    ["c-12", "https://img.freepik.com/free-photo/artist-props-photography_23-2148885621.jpg?t=st=1714988356~exp=1714991956~hmac=7eba5a1f3d22b64dd863babfb39920b9953e4b2414bb2b187f1064bdceb62f86&w=360"]
]

const ImageDisplay: Map<string, string> = new Map()

listOfImage.forEach((value) =>
{
    ImageDisplay.set(value[0], value[1])
})

interface HotCategoryProps
{

}

interface CategoryProps
{
    _id: string,
    key: string,
    urlKey: string,
    image: string,
    name: string,
}

export default function HotCategory({}: HotCategoryProps)
{

    const titleValue = "Danh mục phổ biến"
    const subTitleValue = "Danh mục được lựa chọn nhiều trong tuần"
    const titleBackground = "bg-[#F2F2F2]"

    // const nonAppearanceEffect = "transition-opacity duration-700 ease-in opacity-0"
    // const appearanceEffect = "transition-opacity duration-700 ease-in opacity-100"

    const numOfItemPerSlide = 7
    const [category, setCategory] = useState<CategoryType[]>([])
    const [currentSlide, setCurrentSlide] = useState<number>(-1)
    const [mainDisplay, setMainDisplay] = useState<JSX.Element | undefined>(undefined)
    // const [fadedEffect, setFadedEffect] = useState<string>(appearanceEffect)

    const [changeFlat, setChangeFlat] = useState<boolean>(false)
    const [isHolding, setIsHolding] = useState<boolean>(false)

    useEffect(() =>
    {
        //fetch data here

        //for testing
        const data = [...MockData]
        data.forEach((value) =>
        {
            const foundImage = listOfImage.find((str) => str[0] == value._id)
            if(foundImage != undefined)
            {
                value.image = foundImage[1]
            }
        })

        setCategory(data)
        setCurrentSlide(0)
    },
    [])

    useEffect(() =>
    {
        //TODO: create a view here

        if(category.length == 0)
        {
            setMainDisplay(<Skeleton active />)   
        }
        else
        {
            const endIndex = (currentSlide + numOfItemPerSlide) > category.length ? category.length : (currentSlide + numOfItemPerSlide)
            let data = category.slice(currentSlide, endIndex)

            if(data.length < numOfItemPerSlide)
            {
                const complementData = category.slice(0, numOfItemPerSlide - data.length)
                data = data.concat(complementData)
            }

            setMainDisplay(get7ItemsDisplay(data))
        }

        //auto change
        setTimeout(() =>
        {
            setChangeFlat((prev) => !prev)
        }, 6000)

    },
    [currentSlide])

    useEffect(() =>
    {
        if(category.length == 0)
        {
            return
        }

        if(isHolding == true)
        {
            return
        }

        const nextSlideIndex = (currentSlide + 1) % category.length
        setCurrentSlide(nextSlideIndex)

    }, [changeFlat, isHolding])

    function onHoldingCallback(value: boolean)
    {
        setIsHolding(true)
    }

    function onLeavingCallback(value: boolean)
    {
        setTimeout(() =>
        {
            setIsHolding(false)
        }, 6000)
    }

    function get7ItemsDisplay(data: CategoryType[])
    {
        return(
            <>
                <Row className="w-full" gutter={12}>
                    <Col span={8} style={{maxHeight: "410px"}} flex={"auto"}>
                        <CategoryItem onHoldingCallback={onHoldingCallback} onLeavingCallback={onLeavingCallback} category={data[0]}/>
                    </Col>
                    <Col span={16}>
                        <Row gutter={[5,10]}>
                            <Row gutter={10}>
                                <Col span={6} style={{maxHeight: "200px"}}>
                                    <CategoryItem onHoldingCallback={onHoldingCallback} onLeavingCallback={onLeavingCallback} category={data[1]} />
                                </Col>
                                <Col span={9} style={{maxHeight: "200px"}}>
                                    <CategoryItem onHoldingCallback={onHoldingCallback} onLeavingCallback={onLeavingCallback} category={data[2]} />
                                </Col>
                                <Col span={9} style={{maxHeight: "200px"}}>
                                    <CategoryItem onHoldingCallback={onHoldingCallback} onLeavingCallback={onLeavingCallback} category={data[3]} />
                                </Col>
                            </Row>
                            <Row gutter={10}>
                                <Col span={9} style={{maxHeight: "200px"}}>
                                    <CategoryItem onHoldingCallback={onHoldingCallback} onLeavingCallback={onLeavingCallback} category={data[4]} />
                                </Col>
                                <Col span={9} style={{maxHeight: "200px"}}>
                                    <CategoryItem onHoldingCallback={onHoldingCallback} onLeavingCallback={onLeavingCallback} category={data[5]} />
                                </Col>
                                <Col span={6} style={{maxHeight: "200px"}}>
                                    <CategoryItem onHoldingCallback={onHoldingCallback} onLeavingCallback={onLeavingCallback} category={data[6]} />
                                </Col>
                            </Row>
                        </Row>
                    </Col>
                </Row>
            </>
        )
    }

    return(
        <>
            <Flex vertical className="w-full" justify="start" align="center">
                <Flex vertical className="w-full py-6" justify="center" align="center">
                    <CenterTitle title={titleValue} subTitle={subTitleValue} background={titleBackground} isUppercase/>
                    <div className="invisible h-10 w-full">
                    </div>
                    <div className="container w-full mt-4">
                        {mainDisplay}
                    </div>
                </Flex>
                <div className="invisible h-10 w-full">
                </div>
            </Flex>
        </>
    )
}