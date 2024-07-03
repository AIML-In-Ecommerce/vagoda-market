"use client";

import { Carousel, Flex, Image, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { CarouselArrow } from "./utils/CarouselArrow";

// const MockData = [
//   {
//     _id: "testing_01",
//     image_url:
//       "https://img.freepik.com/free-vector/organic-flat-abstract-fashion-youtube-thumbnail_23-2148910690.jpg?w=1380&t=st=1715410714~exp=1715411314~hmac=a41fc26499c758761c15d2abe51baece4d4d3d8ed9709cc24059795b8b853575",
//   },
//   {
//     _id: "testing_02",
//     image_url:
//       "https://img.freepik.com/free-psd/fashion-collection-facebook-template_23-2151228008.jpg?t=st=1715410788~exp=1715414388~hmac=c7b11ae9ac75d14649722fb5ce8f4f228e3849b8253166cdb1a7a3d3bac888b2&w=1380",
//   },
//   {
//     _id: "testing_03",
//     image_url:
//       "https://img.freepik.com/free-vector/abstract-sales-landing-page-with-image_23-2148320086.jpg?t=st=1715410828~exp=1715414428~hmac=2c353988bdb55ac568baa08d0932fc033aa9eb05b5751503371849d2c9d0c656&w=1060",
//   },
//   {
//     _id: "testing_04",
//     image_url:
//       "https://img.freepik.com/free-psd/sport-sale-banner-template_23-2148707053.jpg?t=st=1715410866~exp=1715414466~hmac=1b5696ca133ed16eb2738b1145b81863bbf76ce18c98da5f87e7c90df5f3ab97&w=1380",
//   },
//   {
//     _id: "testing_05",
//     image_url:
//       "https://img.freepik.com/free-psd/horizontal-banner-template-relaxation-adventure_23-2149041415.jpg?t=st=1715410905~exp=1715414505~hmac=0dfd479f71c04de66054b184b32c5429439dabb65d13b62730bfbd0466c8927f&w=1380",
//   },
//   {
//     _id: "testing_06",
//     image_url:
//       "https://img.freepik.com/free-psd/luxury-men-s-fashion-template-design_23-2150831380.jpg?t=st=1715410953~exp=1715414553~hmac=bb3ede0202de8edb55ef42b9c6f5c3a94ee3d8677de6fe7bfa9819af4a521173&w=1380",
//   },
//   {
//     _id: "testing_07",
//     image_url:
//       "https://img.freepik.com/free-vector/wild-nature-banner-template_23-2148927336.jpg?t=st=1715410982~exp=1715414582~hmac=8f322826198e30872dbf0aa912a3c7bdb8376c23413809cd47b3c59a8bbbd342&w=1060",
//   },
// ];

// const MockData = [
//   {
//     _id: "testing_01",
//     image_url:
//       "https://cloudfront-eu-central-1.images.arcpublishing.com/businessoffashion/MTIAHX6TMZEDVMXRURA2CPDHIM.jpg",
//   },
//   {
//     _id: "testing_02",
//     image_url: "https://i.ytimg.com/vi/uesz9ljboeA/maxresdefault.jpg",
//   },
//   {
//     _id: "testing_03",
//     image_url:
//       "https://scontent.fsgn8-3.fna.fbcdn.net/v/t1.6435-9/76644670_3314893831909116_1467739553681899520_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=0327a3&_nc_ohc=oQGBcLuyl7cQ7kNvgEk1C1p&_nc_ht=scontent.fsgn8-3.fna&cb_e2o_trans=t&oh=00_AYD4RNOT_dvBf5Aktg5m93Vl1JX8fc2ekrfJxfPij8Qrkg&oe=66A1E134",
//   },
//   {
//     _id: "testing_04",
//     image_url:
//       "https://audaces.com/wp-content/uploads/2020/08/fashion-styles.webp",
//   },
//   {
//     _id: "testing_05",
//     image_url:
//       "https://assets.vogue.com/photos/61f03bfdc5d8ae2d1a907cbd/master/w_2560%2Cc_limit/00_story.jpg",
//   },
//   // {
//   //   _id: "testing_06",
//   //   image_url:
//   //     "https://cloudfront-eu-central-1.images.arcpublishing.com/businessoffashion/T275FM3ICFDBBNOXPPEVXWX3WA.jpg",
//   // },
//   // {
//   //   _id: "testing_07",
//   //   image_url:
//   //     "https://assets.vogue.com/photos/5fb56f2accd3e78b7ee64ca7/16:9/w_1280,c_limit/01%20MTS%20x%20Fashion%20Nova_0239.jpg",
//   // },
//   {
//     _id: "testing_08",
//     image_url:
//       "https://img.freepik.com/free-photo/young-people-standing-looking-different-direction_23-2148134027.jpg?t=st=1714987969~exp=1714991569~hmac=beb516848cd0f8f8f175b769400d7cf1ad913178e17c271e8093b9a4cee57000&w=1060",
//   },
// ];

const AdvertisementData = [
  {
    _id: "testing_01",
    image_url:
      "https://m.yodycdn.com/fit-in/filters:format(webp)/fit-in/filters:format(webp)/products/lwynjo4x321gxw5hyq9__232-1920x864%20(1).png",
  },
  {
    _id: "testing_02",
    image_url:
      "https://m.yodycdn.com/fit-in/filters:format(webp)/fit-in/filters:format(webp)/products/lxovdl2ie0wi45vptp__d%C3%B2ng%20234_1920x864.png",
  },
  {
    _id: "testing_03",
    image_url:
      "https://media3.coolmate.me/cdn-cgi/image/width=1920,quality=90,format=auto/uploads/June2024/Happy_Friday_-_Destop_-_co_CTA.jpg",
  },
  {
    _id: "testing_04",
    image_url:
      "https://media3.coolmate.me/cdn-cgi/image/width=1920,quality=90,format=auto/uploads/June2024/PC_Banner_Homepage_-_Vui_bong_lan_san_phan_thuong_-_Destop.jpg",
  },
  {
    _id: "testing_05",
    image_url:
      "https://media3.coolmate.me/cdn-cgi/image/width=1920,quality=90,format=auto/uploads/June2024/FOOTBALL_BANNER_HP_(2).png",
  },
  {
    _id: "testing_06",
    image_url:
      "https://media3.coolmate.me/cdn-cgi/image/width=1920,quality=90,format=auto/uploads/June2024/BANNER_OMO.png",
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
  const [mainDisplay, setMainDisplay] = useState<JSX.Element[]>([
    <Skeleton active key="1" />,
    <Skeleton active key="2" />,
    <Skeleton active key="3" />,
  ]);

  const carouselAutoplaySpeed = 6000; //ms

  useEffect(() => {
    //TODO: fetch data here

    //for testing
    const data: AdvertisementProps[] = AdvertisementData.map((value) => {
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
      // setMainDisplay(new Array(3).fill(<Skeleton active />));
      setMainDisplay([
        <Skeleton active key="1" />,
        <Skeleton active key="2" />,
        <Skeleton active key="3" />,
      ]);
    } else {
      const advertisementDisplays = advertisements.map(
        (value: AdvertisementProps, index: number) => {
          const display = (
            <Image
              key={value._id + "#" + index.toString()}
              preview={false}
              src={value.url}
              height={"100%"}
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
      <Flex className="w-full " vertical align="center" justify="center">
        <Flex
          className={` w-full max-h-[600px] xl:max-h-screen xl:h-[calc(100vh-80px)] items-start`}
          justify="center"
          align="center"
        >
          <div className="block w-full h-full">
            <Carousel
              className={`w-full h-full overflow-clip`}
              autoplay
              autoplaySpeed={carouselAutoplaySpeed}
              arrows
              prevArrow={<CarouselArrow direction="left" />}
              nextArrow={<CarouselArrow direction="right" />}
            >
              {mainDisplay}
            </Carousel>
          </div>
        </Flex>
      </Flex>
    </>
  );
}
