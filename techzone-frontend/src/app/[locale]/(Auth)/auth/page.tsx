"use client";
import AuthForm from "@/component/auth/AuthForm";
// import { Image } from "antd";
import React, { useEffect, useRef, useState } from "react";
// import Image from "next/image";
// import LogoImage from "../../../../../public/logo.svg"
import VagodaIcon from "@/component/VagodaIcon";
import VagodaText from "@/component/VagodaText";
import Link from "next/link";
import { clearInterval, setInterval } from "timers";

export default function Auth() {
  const ref = useRef(null);
  const mainImages = [
    {
      index: 0,
      url: "https://cdn.discordapp.com/attachments/1160486233336713347/1269222657832779828/Image_15.png?ex=66af4736&is=66adf5b6&hm=e1d9578c32129280b97615cbc7f983d5fb52516386ec0227d09ad40b0065606f&",
      title: "Vagoda",
      subTitle: "Vagoda"
    }
    // {
    //   index:0,
    //   url: "https://img.freepik.com/free-photo/person-shopping-second-hand-market_23-2149353683.jpg?t=st=1721832880~exp=1721836480~hmac=df9d19cb997065658fa2b888409b52ba67d4ecd87083bdc41c656161e48be955&w=360",
    //   title: "Mua sắm thả ga",
    //   subTitle: "vô vàng lựa chọn!!"
    // },
    // {
    //   index: 1,
    //   url: "https://img.freepik.com/free-photo/full-shot-woman-local-retail_23-2149313473.jpg?t=st=1721902183~exp=1721905783~hmac=7ce5c0dd1c51e19aabb1b2d4d9edd749ab4227cf7f598b0f4cf76b1888f6fefd&w=360",
    //   title: "Sales vô vàng",
    //   subTitle: "săn ngàn đồ tốt cùng Vagoda!!"
    // },
    // {
    //   index: 2,
    //   url: "https://img.freepik.com/free-photo/young-woman-surrounded-by-piles-clothes_23-2149133928.jpg?t=st=1721905472~exp=1721909072~hmac=2cab9f5c2a56b4a35283b6056734b5b2875296a7d4cc2dff3c16ab3ec41222ef&w=360",
    //   title: "Không biết mặc gì?",
    //   subTitle: "hãy để Vagoda giúp bạn..."
    // },
    // {
    //   index: 3,
    //   url: "https://img.freepik.com/free-photo/satisfied-young-women-holding-shopping-bags-posing-front-clothes-store_23-2147968396.jpg?t=st=1721905578~exp=1721909178~hmac=9de9a3544c3ed7f2181626a918cdc65e9979f8bd4d36cb3dd545f228fef5fcc6&w=360",
    //   title: "Chuẩn bị du lịch?",
    //   subTitle: "sắm ngay trên Vagoda"
    // },
    // {
    //   index: 4,
    //   url: "https://img.freepik.com/free-photo/stylish-models-showing-paper-bags_23-2147689035.jpg?t=st=1721905873~exp=1721909473~hmac=28210d161254cb7b99a6a592634e7cf14544772e2d166185fb926c7c7e6ea14d&w=360",
    //   title: "Năng động hay Thanh lịch",
    //   subTitle: "mọi thứ đều có trên Vagoda!!"
    // }

  ]

  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [mainImage, setMainImage] = useState(mainImages[0])
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  React.useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

  const lottie = (
    <lottie-player
      id="firstLottie"
      ref={ref}
      autoPlay
      loop
      mode="normal"
      src="https://lottie.host/61982b9d-db51-46f4-b213-69f38b1b9746/B1tklFwfI0.json"
      style={{ width: "500px", height: "500px" }}
      className="absolute bottom-4"
    />
  );

  function getRandomMainImage()
  {
    const nextIndex = (mainImage.index + 1) % mainImages.length
    const nextDisplayedImage = mainImages[nextIndex]

    setMainImage(nextDisplayedImage)
    setCurrentIndex(nextIndex)
  }

  useEffect(() =>
  {
    const interval = setInterval(() =>
    {
      getRandomMainImage()
    }, 5000)
    
    return () => clearInterval(interval)
  }, [currentIndex])


  return (
    <>
      <div className="h-dvh w-full">
        {/* {showSuccessMsg && (
          <div className=" w-1/2 mx-auto mt-4 alert alert-success ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Information confirm! We will send an OTP to your email to complete registration!</span>
          </div>
        )} */}
        <div className="flex justify-center items-center h-dvh bg-gray-100">
          <div className="shadow-lg w-full md:w-4/6" 
            style={{
              height: `calc(100dvh/100*85)`,
              maxHeight: `calc(100dvh/100*85)`,
            }}>
            <div className="flex justify-center items-center h-full">
              <AuthForm showSuccessMsg={setShowSuccessMsg} />
              <div className="flex flex-col lg:w-1/2">
                <div className="w-full">
                  <div className="relative">
                    <img className="hidden lg:block" src={mainImage.url} alt="big-image" style={{
                      height: `calc(100dvh/100*85)`,
                      width: "100%"
                    }}/>

                    {/* <div className="absolute top-0 overflow-hidden hidden md:block z-20 w-full">
                      <div className="flex justify-center items-center w-full"
                        style={{
                          height: `calc(100dvh/100*85)`
                        }}
                      >
                        <div className="flex flex-col w-11/12 justify-center items-center backdrop-blur py-4 space-y-2">
                          <div className="flex justify-start items-center w-11/12">
                            <p className="text-5xl font-semibold font-sans text-white">
                              {mainImage.title}
                            </p>
                          </div>
                          <div className="flex justify-end items-center w-11/12">
                            <p className="text-2xl text-white font-sans ">
                              {mainImage.subTitle}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div> */}

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
