"use client";

import { Carousel, Flex, Image, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { CarouselArrow } from "./utils/CarouselArrow";

const MockData = [
  {
    _id: "testing_01",
    image_url:
      "https://img.freepik.com/free-vector/organic-flat-abstract-fashion-youtube-thumbnail_23-2148910690.jpg?w=1380&t=st=1715410714~exp=1715411314~hmac=a41fc26499c758761c15d2abe51baece4d4d3d8ed9709cc24059795b8b853575",
  },
  {
    _id: "testing_02",
    image_url:
      "https://img.freepik.com/free-psd/fashion-collection-facebook-template_23-2151228008.jpg?t=st=1715410788~exp=1715414388~hmac=c7b11ae9ac75d14649722fb5ce8f4f228e3849b8253166cdb1a7a3d3bac888b2&w=1380",
  },
  {
    _id: "testing_03",
    image_url:
      "https://img.freepik.com/free-vector/abstract-sales-landing-page-with-image_23-2148320086.jpg?t=st=1715410828~exp=1715414428~hmac=2c353988bdb55ac568baa08d0932fc033aa9eb05b5751503371849d2c9d0c656&w=1060",
  },
  {
    _id: "testing_04",
    image_url:
      "https://img.freepik.com/free-psd/sport-sale-banner-template_23-2148707053.jpg?t=st=1715410866~exp=1715414466~hmac=1b5696ca133ed16eb2738b1145b81863bbf76ce18c98da5f87e7c90df5f3ab97&w=1380",
  },
  {
    _id: "testing_05",
    image_url:
      "https://img.freepik.com/free-psd/horizontal-banner-template-relaxation-adventure_23-2149041415.jpg?t=st=1715410905~exp=1715414505~hmac=0dfd479f71c04de66054b184b32c5429439dabb65d13b62730bfbd0466c8927f&w=1380",
  },
  {
    _id: "testing_06",
    image_url:
      "https://img.freepik.com/free-psd/luxury-men-s-fashion-template-design_23-2150831380.jpg?t=st=1715410953~exp=1715414553~hmac=bb3ede0202de8edb55ef42b9c6f5c3a94ee3d8677de6fe7bfa9819af4a521173&w=1380",
  },
  {
    _id: "testing_07",
    image_url:
      "https://img.freepik.com/free-vector/wild-nature-banner-template_23-2148927336.jpg?t=st=1715410982~exp=1715414582~hmac=8f322826198e30872dbf0aa912a3c7bdb8376c23413809cd47b3c59a8bbbd342&w=1060",
  },
];

interface AdvertisementCarouselProps {}

interface AdvertisementProps {
  _id: string;
  url: string;
}

export default function AdvertisementCarousel(
  props: AdvertisementCarouselProps
) {
  const [advertisements, setAdvertisements] = useState<AdvertisementProps[]>(
    []
  );
  const [mainDisplay, setMainDisplay] = useState<JSX.Element[]>(
    new Array(3).fill(<Skeleton active />)
  );

  const carouselAutoplaySpeed = 6000; //ms

  useEffect(() => {
    //TODO: fetch data here

    //for testing
    const data: AdvertisementProps[] = MockData.map((value) => {
      const item: AdvertisementProps = {
        _id: value._id,
        url: value.image_url,
      };

      return item;
    });

    setAdvertisements(data);
  }, []);

  //get advertisements display
  useEffect(() => {
    if (advertisements.length == 0) {
      setMainDisplay(new Array(3).fill(<Skeleton active />));
    } else {
      const advertisementDisplays = advertisements.map(
        (value: AdvertisementProps, index: number) => {
          const display = (
            <Image
              key={value._id + "#" + index.toString()}
              preview={false}
              src={value.url}
              height={"480px"}
              width={"100%"}
            />
          );
          return display;
        }
      );

      setMainDisplay(advertisementDisplays);
    }
  }, [advertisements]);

  return (
    <>
      <Flex
        className="w-full py-4 bg-white"
        vertical
        align="center"
        justify="center"
      >
        <Flex className="px-4 w-full" justify="center" align="center">
          <div className="block w-full">
            <Carousel
              className="w-full"
              autoplay
              autoplaySpeed={carouselAutoplaySpeed}
              arrows
              prevArrow={<CarouselArrow direction="left" />}
              nextArrow={<CarouselArrow direction="right" />}
            >
              {mainDisplay}
              {/* {
                                advertisements.map((value: AdvertisementProps, index: number) =>
                                    {
                                        return(
                                            <div className="w-full">
                                                <Image className="w-full"
                                                    width={"100%"}
                                                    height={"480px"}
                                                    src={value.url}/>
                                            </div>
                                        )
                                    })
                            } */}
            </Carousel>
          </div>
        </Flex>
      </Flex>
      <div className="invisible h-10 w-full"></div>
    </>
  );
}
