"use client";

import React from "react";
import { FiArrowRight } from "react-icons/fi";
import Image from "next/image";
import virtualTryon from "../(assets)/virtual try on welcome img.png";

import { useRouter } from "next/navigation";

const VirtualTryOnWelcomePage = () => {
  const router = useRouter();
  return (
    <div className="w-[100vw] h-[100vh] bg-[#5C6856]">
      <div className="w-full h-full px-24 grid grid-cols-2 gap-8">
        <div className="w-full h-full col-span-1 flex flex-col gap-8 justify-center items-start">
          <div className="font-semibold text-8xl text-white">
            Phòng thử đồ ảo với công nghệ AI
          </div>
          <div className="font-normal text-2xl text-white">
            Tuyệt vời, Techzone mang đến cho bạn một công cụ tiên tiến giúp bạn
            dễ dàng trải nghiệm mặc thử quần áo. Bạn có thể khám phá nhiều kiểu
            dáng và màu sắc quần áo khác nhau từ những bộ sưu tập đặc sắc mà
            Techzone mang đến. Techzone luôn muốn tạo cho bạn một không gian mua
            sắm thú vị và thuận tiện. Bạn đã sẵn sàng khám phá phong cách của
            mình chưa?{" "}
          </div>
          <button
            className="bg-[#FFFFFFE6] py-2 px-8 rounded-lg flex flex-row items-center justify-center text-[#323232] font-semibold text-2xl"
            onClick={() => router.push("/virtual-try-on/123")}
          >
            Bắt đầu{" "}
            <span className="ml-4 ">
              <FiArrowRight />
            </span>
          </button>
        </div>
        <div className="col-span-1 w-full h-full flex justify-center items-center">
          <Image
            src={virtualTryon}
            alt="Description of the image"
            width={621}
            height={470}
          />
        </div>
      </div>
    </div>
  );
};

export default VirtualTryOnWelcomePage;
