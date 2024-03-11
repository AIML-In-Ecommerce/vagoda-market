'use client'

import { Button, Card, Carousel, Col, Flex, Image, Row, Skeleton } from "antd"
import Meta from "antd/es/card/Meta"
import { useEffect, useState } from "react"



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
    ["c-01", "https://img.freepik.com/free-psd/digital-device-mockup_53876-91374.jpg?t=st=1710142820~exp=1710146420~hmac=687106215522732a84fc28e3677d6054f0d93733724a27f395a19d0f2fe99c4c&w=900"],
    ["c-02", "https://img.freepik.com/free-photo/blender-juice-machine_1203-7838.jpg?t=st=1710145223~exp=1710148823~hmac=ecff87748dcb188b5f15ee7209521794ed68796a45e6c6a40c2620dec39e7414&w=1060"],
    ["c-03", "https://img.freepik.com/free-vector/desktop-computer-concept-illustration_114360-16232.jpg?w=1060&t=st=1710145417~exp=1710146017~hmac=b2c2871dfb2baaea758e6112d5d44e431f9c639c2c24f05b067e071ded58845f"],
    ["c-04", "https://img.freepik.com/free-photo/modern-monitor-elegant-table_23-2150706447.jpg?t=st=1710145510~exp=1710149110~hmac=4478beab315ab7e16648c2ec5c23f8e8440e5962d248df1f2c88d4216743f5f4&w=1060"],
    ["c-05", "https://img.freepik.com/free-vector/circuit-board-isometric-concept_1284-15916.jpg?w=1060&t=st=1710145608~exp=1710146208~hmac=a6054b71b542d08b8ad88fabde5796989e444fd23a971b72a1be48d61afa2707"],
    ["c-06", "https://img.freepik.com/free-photo/wireless-mouse-keyboard_1260-15.jpg?1&w=1060&t=st=1710145759~exp=1710146359~hmac=99108a450632e23cdc3c766d23de6ca55d8547cbb7bc50a7878014f2ec942863"],
    ["c-07", "https://img.freepik.com/free-vector/flat-game-streamer-elements-collection_23-2148923612.jpg?w=740&t=st=1710145950~exp=1710146550~hmac=a2ae2900b36dda133098c1db3d1422f35b03cd15389ddec874341052102d1387"],
    ["c-08", "https://img.freepik.com/free-psd/full-screen-smartphone-mockup-design_53876-65970.jpg?t=st=1710146196~exp=1710149796~hmac=8c1f1411ef77c8b9e73cb5263449064b935b2106d9118d6d524b989dd036493b&w=740"],
    ["c-09", "https://img.freepik.com/free-photo/still-life-tech-device_23-2150722649.jpg?w=360&t=st=1710146322~exp=1710146922~hmac=cfb91131456242d77e01f6cb7f9c68d5147b962de6752bcb13fb7f5249834721"],
    ["c-10", "https://img.freepik.com/free-vector/music-studio-equipment-sound-recording_107791-1270.jpg?w=740&t=st=1710146404~exp=1710147004~hmac=cc1a1c0c60a1a561d838da73f2c24f3b781b45b463cd543ffa10062f8b30dfa3"],
    ["c-11", "https://img.freepik.com/free-photo/side-view-desk-assortment-white-background_23-2148708032.jpg?t=st=1710146652~exp=1710150252~hmac=5f729bf442e76fe39e0f18aa247cf53c5fb598123b3056be62ce2c9e2bfe3b02&w=360"]
]

const ImageDisplay: Map<string, string> = new Map()

listOfImage.forEach((value) =>
{
    ImageDisplay.set(value[0], value[1])
})

interface HomeCategoryCarouselProps
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

export default function HomeCategoryCarousel({}: HomeCategoryCarouselProps)
{
    const SHOW_MORE = "Show more"
    const SHOW_LESS = "Show less"

    const [categories, setCategories] = useState<CategoryProps[]>([])
    
    const ItemsPerScreen = 4
    const [isFullyDisplayed, setIsFullyDisplayed] = useState<boolean>(false)
    const [buttonContent, setButtonContent] = useState<string>(SHOW_MORE)
    const [categoryDisplay, setCategoryDisplay] = useState<JSX.Element | JSX.Element[]>(<Skeleton active/>)

    const rowOfDisplay = 2
    // const autoplaySpeed = 5000 //ms


    useEffect(() =>
    {
        //fetch data here

        //for testing
        const data = MockData.map((value) =>
        {
            const tr_item: CategoryProps = 
            {
                _id: value._id,
                key: value.key,
                urlKey: value.urlKey,
                image: value.image,
                name: value.name,
            }
            return tr_item
        })

        setCategories(data)
    },
    [])

    useEffect(() =>
    {
        setCategoryDisplay(getSlidesOfCarousel())
    },[categories])

    useEffect(() =>
    {
        setCategoryDisplay(getSlidesOfCarousel())
    }, [isFullyDisplayed])

    function handleSeeMoreButtonClick()
    {
        if(isFullyDisplayed == false)
        {
            setButtonContent(SHOW_LESS)
        }
        else
        {
            setButtonContent(SHOW_MORE)
        }
        setIsFullyDisplayed(!isFullyDisplayed)
    }

    function getSlidesOfCarousel()
    {
        if(categories.length < 1)
        {
            return <Skeleton active/>
        }

        const numberOfSlides = categories.length / ItemsPerScreen

        let result: JSX.Element[] = []

        for(let i = 0; i <= numberOfSlides; i+=1)
        {
            const leftIndex = i*ItemsPerScreen
            const rightIndex = (leftIndex + ItemsPerScreen) > categories.length ? categories.length : (leftIndex + ItemsPerScreen)
            const slicedItems = categories.slice(leftIndex, rightIndex)

            const mappedItems = slicedItems.map((value: CategoryProps) => 
            {
                const image = ImageDisplay.get(value._id)
                return(
                    <>
                        <Col span={6}>
                            <Card className="mx-1"
                                hoverable={true}
                                key={value._id}
                                cover={<Image src={image} preview={false} style={{maxHeight:"196px"}} height={"169px"}/>}>
                                <Meta title={value.name}/>
                            </Card>
                        </Col>
                    </>
                )
            })

            const slide =
                // <div key={i.toString() + leftIndex.toString()}>
                //     <Row className="w-full">
                //         {mappedItems}
                //     </Row>
                // </div>
                                <Row className="my-2 w-full">
                                    {mappedItems}
                                </Row>
            
            result = result.concat(slide)
        }

        if(isFullyDisplayed == false)
        {
            if(result.length <= rowOfDisplay)
            {
                return result
            }
            else
            {
                return result.slice(0, rowOfDisplay)
            }
        }
        return result
    }

    return(
        <>
            <div className="w-full flex justify-center items-center bg-blue-50">
                <div className="w-9/12">
                    {categoryDisplay}
                    <div className="w-full flex justify-center">
                        <Button onClick={handleSeeMoreButtonClick}>
                            {buttonContent}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}