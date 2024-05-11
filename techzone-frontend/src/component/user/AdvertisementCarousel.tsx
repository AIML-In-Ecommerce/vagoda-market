'use client'

import { Col, Flex, Image, Row, Skeleton } from "antd"
import { use, useEffect, useState } from "react"



const MockData = 
[
    {
        _id: "testing_01",
        image_url: "https://img.freepik.com/free-photo/pair-trainers_144627-3799.jpg?t=st=1714988110~exp=1714991710~hmac=d1beacb0e281ebd72582ae62a12f2ee4d82ed46f8cf5508ffed348a93087cdcc&w=826"
    },
    {
        _id: "testing_02",
        image_url: "https://img.freepik.com/free-photo/beautiful-woman-basic-white-t-shirt-with-design-space_53876-102863.jpg?t=st=1714988070~exp=1714991670~hmac=385395a639464bf0fc7f954e0bbd0c6c547eca67d6aea27a94d89eb078ec9729&w=360",
    },
    {
        _id: "testing_03",
        image_url: "https://img.freepik.com/free-photo/young-pretty-girl-with-two-braids-leather-jacket-skirt-with-black-backpack-shoulder-while-dreamily-looking-aside-beige-background_574295-4658.jpg?t=st=1714988026~exp=1714991626~hmac=ba592b33394b139b1eab031383722ba6ba60e7552a05e76c349ef2d11ee38b84&w=360",
    },
    {
        _id: "testing_04",
        image_url: "https://img.freepik.com/free-photo/young-people-standing-looking-different-direction_23-2148134027.jpg?t=st=1714987969~exp=1714991569~hmac=beb516848cd0f8f8f175b769400d7cf1ad913178e17c271e8093b9a4cee57000&w=1060",
    },
    {
        _id: "testing_05",
        image_url: "https://img.freepik.com/free-photo/young-japanese-woman-portrait-sitting-chair_23-2148870794.jpg?t=st=1714987434~exp=1714991034~hmac=86f4474284a555dcbf48ec16b53723f0feae8827fe71dcdc763a15133b8f84ae&w=1380"
    },
    {
        _id: "testing_06",
        image_url: "https://img.freepik.com/free-photo/plaid-women-s-coat-outerwear-casual-fashion-with-design-space_53876-102118.jpg?t=st=1714988176~exp=1714991776~hmac=aeca31ca1155dcff0399a00b91fd9eaa690804e95ed52a7473bc20fe4eaeec47&w=360"
    },
    {
        _id: "testing_07",
        image_url: "https://img.freepik.com/free-psd/fashionable-hat-isolated_23-2151356980.jpg?w=826&t=st=1714988242~exp=1714988842~hmac=335bdf8fc3af754e4baafc2d140e8a9031a88739170fb6965cc06ba67a96ccf3"
    }
]


interface AdvertisementCarouselProps
{

}

interface AdvertisementProps
{
    _id: string,
    url: string,
}

export default function AdvertisementCarousel(props: AdvertisementCarouselProps)
{
    const [advertisements, setAdvertisements] = useState<AdvertisementProps[]> ([])
    const [mainDisplay, setMainDisplay] = useState<JSX.Element>(<Skeleton active />)
    const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(-1)
    

    //get advertisements display
    useEffect(() =>
    {
        if(advertisements.length == 0)
        {
            
        }


        const newMainDisplay = 
        <Row className="container w-full" gutter={[10, 0]}>
            <Col span={16} style={{height: "530px"}}>
                <Image 
                    preview={false}
                    className="rounded-md"
                    height={"100%"}
                    width={"100%"}
                    src={"https://img.freepik.com/free-vector/digital-marketing-concept-with-online-advertising-media-symbols-flat_1284-31958.jpg?t=st=1715143763~exp=1715147363~hmac=3a514a310f3894bcb769b68255983960064e3f3fc16135bb08663fcd4f707eed&w=1380"} />
            </Col>
            <Col span={8}>
                <Row gutter={[0, 10]}>
                    <Row gutter={10}>
                        <Col style={{maxHeight: "260px"}}>
                            <Image 
                            preview={false}
                            className="rounded-md bg-black"
                            height={"100%"}
                            width={"100%"}
                            src={"https://img.freepik.com/free-psd/shoes-sale-social-media-post-square-banner-template-design_505751-2862.jpg?w=740&t=st=1715142400~exp=1715143000~hmac=ce80701c11a03f1d9ec0ebe774bc270121bebbbe111bb1a6d8958de0450cd54c"} />
                        </Col>
                    </Row>
                    <Row gutter={10}>
                        <Col style={{maxHeight: "260px"}}>
                            <Image 
                            preview={false}
                            className="rounded-md bg-black"
                            height={"100%"}
                            width={"100%"}
                            src={"https://img.freepik.com/free-vector/digital-marketing-concept-with-online-advertising-media-symbols-flat_1284-31958.jpg?t=st=1715143763~exp=1715147363~hmac=3a514a310f3894bcb769b68255983960064e3f3fc16135bb08663fcd4f707eed&w=1380"} />
                        </Col>
                    </Row>
                </Row>
            </Col>
        </Row>

        setMainDisplay(newMainDisplay)
    },
    [advertisements])


    return(
        <>
            <Flex className="w-full py-6" vertical>
                <Flex className="w-full backdrop-blur-md" justify="center" align="center">
                    {mainDisplay}
                </Flex>
            </Flex>
        </>
    )
}
