'use client'

import { Carousel, Flex, Image, Skeleton } from "antd"
import React, { useEffect, useState } from "react"
import { CarouselArrow } from "./utils/CarouselArrow"



interface HomeCarouselProps
{
    
}

interface CarouselImageProps
{
    _id: string,
    image_url: string
}

const MockPictures: CarouselImageProps[] = 
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

export default function HomeCarousel({}:HomeCarouselProps)
{

    const [largeBackgroundUrl, setLargeBackgroundUrl] = useState<string>("")
    const [carouselImages, setCarouselImages] = useState<CarouselImageProps[]>([])
    const [smallEvents, setSmallEvents] = useState<CarouselImageProps[]>([])
    const [currentIndexOfSmallEvent, setCurrentIndexOfSmallEvent] = useState<number>(-1)
    const [SmallEventsDisplay, setSmallEventsDisplay] = useState<any|undefined>(undefined)
    const numberSmallEventsDisplayed = 5;

    useEffect(() =>
    {
        //fetch data here

        //testing
        setCarouselImages(MockPictures)
        setLargeBackgroundUrl(MockPictures[0].image_url)
    },
    [])

    useEffect(() =>
    {
        //fetch data here
        setSmallEvents(MockPictures)
        setCurrentIndexOfSmallEvent(0)
        handleSmallEventsChange()
    },
    [])

    // const SmallEventCardStyle: React.CSSProperties = 
    // {
    //     width: "60%",
    //     height:"169px"
    // }

    const CarouselDisplay: any = carouselImages.map((value: CarouselImageProps) =>
    {
        return(
            <div key={value._id} className="w-1/2">
                <Image width={"100%"} height={"100%"} style={{maxHeight: "480px"}}
                src={value.image_url} onClick={handleCarouselOnClick}/>
            </div>
        )
    })
        

    function handleSmallEventsChange()
    {
        if(smallEvents.length < 1)
        {
            setSmallEventsDisplay(<Skeleton active/>)
            return
        }
        else if(smallEvents.length < numberSmallEventsDisplayed)
        {
            const result = smallEvents.map((value: CarouselImageProps) =>
            {
                return(
                    <div key={value._id}
                        // style={SmallEventCardStyle}
                        className="shadow-sm rounded-md shadow-black hover:shadow-lg hover:shadow-black lg:w-56 lg:h-36"
                    >
                        <Image
                            preview={false}
                            className="rounded-md"
                            height={"100%"}
                            width={"100%"}
                        src={value.image_url} />
                    </div>
                )
            })
            setSmallEventsDisplay(result)
        }
        else
        {
            const endIndex = (currentIndexOfSmallEvent + numberSmallEventsDisplayed) % smallEvents.length
            let slicedArray:CarouselImageProps[] = []
            if(endIndex < currentIndexOfSmallEvent)
            {
                slicedArray = slicedArray.concat(smallEvents.slice(currentIndexOfSmallEvent))
                slicedArray = slicedArray.concat(smallEvents.slice(0, endIndex))
            }
            else
            {
                slicedArray = slicedArray.concat(smallEvents.slice(currentIndexOfSmallEvent, endIndex))
            }
     
            const result = slicedArray.map((value: CarouselImageProps) =>
            {
                return(
                    <div key={value._id}
                        // style={SmallEventCardStyle}
                        className="shadow-sm rounded-md shadow-black hover:shadow-lg hover:shadow-black lg:w-56 lg:h-36"
                    >
                        <Image
                            preview={false}
                            className="rounded-md"
                            height={"100%"}
                            width={"100%"}
                        src={value.image_url} />
                    </div>
                )
            })

            setSmallEventsDisplay(result)
        }
    }

    const LargeBackground: React.CSSProperties = 
    {
        background: `url(${largeBackgroundUrl})`,
        // maskImage: "radial-gradient(circle ,brown 0%, rgba(165, 51, 3, 75%) 0%)",
        // maskImage: "rgba(165, 51, 3, 50%)",
        // WebkitMaskImage: "radial-gradient(circle ,brown 0%, rgba(165, 51, 3, 75%) 0%)",
        // WebkitMaskImage: "rgba(165, 51, 3, 50%)"
    }

    function handleCarouselOnClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>)
    {
        console.log("picture clicked")
    }

    function afterCarouselChange(currentSlide: number)
    {
        console.log(currentSlide)
        const slide:CarouselImageProps = carouselImages[currentSlide]
        setLargeBackgroundUrl(slide.image_url)
        setCurrentIndexOfSmallEvent((currentIndexOfSmallEvent + numberSmallEventsDisplayed) % smallEvents.length)

        handleSmallEventsChange()
    }



    return(
        <>
            <div className="w-full flex flex-col justify-end items-center relative" style={LargeBackground}>
                <div className="flex flex-col justify-center items-center backdrop-blur-md w-full h-full">
                    <div className="container flex flex-col justify-center items-center w-full h-full">
                        <div className="invisible h-10 w-full">
                            hidden block
                        </div>
                        <div className="container w-2/3 h-full border-2 rounded-md">
                            <Carousel 
                                prevArrow={<CarouselArrow direction={"left"} />}
                                nextArrow={<CarouselArrow direction={"right"} />}
                                arrows
                                autoplay={true} style={{height:"100%", maxHeight:"480px"}}
                                afterChange={afterCarouselChange}
                            >
                                {CarouselDisplay}
                            </Carousel>
                        </div>
                        <div className="invisible h-32 w-full">
                            hidden block
                        </div>
                        <div className="absolute z-10 bottom-0 w-full">
                            <div className="flex flex-row justify-center">
                                <div className="w-full">
                                    <Flex justify="center" className="w-full">
                                        <Flex justify="evenly" gap={"8px"}>
                                            {SmallEventsDisplay}
                                        </Flex>
                                    </Flex>
                                </div>
                            </div>
                        </div>
                        <div className="w-full h-10 invisible">
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}