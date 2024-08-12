import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "./local.css";
import { EffectCoverflow, Pagination } from "swiper/modules";

const imgList = [
  "https://res.cloudinary.com/dgsrxvev1/image/upload/v1716443927/thun_n0jgqa.jpg",
  "https://res.cloudinary.com/dgsrxvev1/image/upload/v1716443927/l%E1%BA%A3utent_qwmpog.jpg",
  "https://res.cloudinary.com/dgsrxvev1/image/upload/v1716443927/%C3%A1o_thun_cppclk.jpg",
  "https://res.cloudinary.com/dgsrxvev1/image/upload/v1716443926/vn-11134207-7r98o-lp8u23rvrf4r40_hcpkjk.jpg",
];

interface ImageSwiperProps {
  imgList: string[];
}

const ImageSwiper: React.FC<ImageSwiperProps> = ({ imgList }) => {
  return (
    <Swiper
      effect="coverflow"
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={"auto"}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      pagination={{ clickable: true }}
      modules={[EffectCoverflow, Pagination]}
      className="w-full py-10"
    >
      {imgList.map((image, index) => (
        <SwiperSlide
          key={index}
          className="w-[38%] aspect-[3/4] bg-center bg-cover"
        >
          <img
            src={image}
            alt={`slide-${index}`}
            className="block w-full aspect-[3/4]"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSwiper;
