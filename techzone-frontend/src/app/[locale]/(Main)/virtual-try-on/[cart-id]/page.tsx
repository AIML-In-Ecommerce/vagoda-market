"use client";

import React from "react";
import "./local.css";
import { useState, useEffect } from "react";
import { BsPersonBoundingBox } from "react-icons/bs";
import { IoShirtOutline } from "react-icons/io5";
import { IoShirt } from "react-icons/io5";
import { IoBodyOutline } from "react-icons/io5";
import { IoBody } from "react-icons/io5";
import { BsEye } from "react-icons/bs";
import { BsEyeFill } from "react-icons/bs";
import { PiCoatHangerFill } from "react-icons/pi";
import { title } from "process";

type Mode = "MODEL" | "PRODUCT" | "PREVIEW";

const VirtualTryOn = () => {
  const [mode, setMode] = useState<Mode>("MODEL");

  const changeMode = (newMode: Mode) => {
    setMode(newMode);
  };
  console.log("Mode: ", mode);

  const renderTitle = (mode: Mode) => {
    switch (mode) {
      case "MODEL":
        return "Ảnh của bạn";
      case "PRODUCT":
        return "Chọn sản phẩm";
      case "PREVIEW":
        return "Preview";
      default:
        return "Ảnh của bạn";
    }
  };

  const renderMainBox = (mode: Mode) => {
    switch (mode) {
      case "MODEL":
        return (
          <div className="w-full h-[calc(100%-80px)] flex flex-col gap-5 justify-center items-center">
            <BsPersonBoundingBox className="w-[150px] h-[150px]" />
            <div className="text-md  italic">Tải lên ảnh của bạn</div>
          </div>
        );
      case "PRODUCT":
        return "Chọn sản phẩm";
      case "PREVIEW":
        return "Preview";
      default:
        return "Ảnh của bạn";
    }
  };

  useEffect(() => {
    renderTitle(mode);
  }, [mode]);

  return (
    <div className="bg-[url('https://res.cloudinary.com/dgsrxvev1/image/upload/v1716347947/dressing_room_c9bl2n.jpg')] bg-center bg-cover bg-no-repeat w-[100vw] h-[100vh] flex flex-col justify-center items-center">
      <div className="w-full h-[70%] flex flex-col gap-10 justify-center items-center">
        <div className="flex w-[200px] h-[50px] bg-style text-white text-xl justify-center items-center rounded-full">
          {renderTitle(mode)}
        </div>
        <div className="w-full h-full flex flex-row justify-center items-center gap-10">
          <div className="w-[200px] flex justify-center items-center">
            <div className="w-[60px] h-[200px] rounded-full bg-style flex flex-col gap-5 justify-center items-center text-white">
              <div
                className="w-[50px] h-[50px] bg-white bg-opacity-50 rounded-full flex justify-center items-center"
                onClick={(e) => changeMode("MODEL")}
              >
                <IoBody className="w-[30px] h-[30px] " />
              </div>
              <div
                className="w-[50px] h-[50px] rounded-full flex justify-center items-center"
                onClick={(e) => changeMode("PRODUCT")}
              >
                <IoShirtOutline className="w-[30px] h-[30px] " />
              </div>
              <div
                className="w-[50px] h-[50px]  rounded-full flex justify-center items-center"
                onClick={(e) => changeMode("PREVIEW")}
              >
                <BsEye className="w-[30px] h-[30px] " />
              </div>
            </div>
          </div>
          <div className="w-[50%] h-full bg-style text-white rounded-3xl p-4">
            <div className=" w-fit h-[48px] flex flex-row justify-center items-center px-1 bg-white bg-opacity-50 text-white text-xl rounded-full">
              <div className="w-[40px] h-[40px] bg-white text-slate-500 rounded-full flex justify-center items-center">
                <PiCoatHangerFill className="w-[25px] h-[25px] text-slate" />
              </div>
              <div className="mx-3">Phòng thử đồ</div>
            </div>
            {renderMainBox(mode)}
          </div>
          <div className="flex w-[200px] h-[50px] bg-style text-white text-xl justify-center items-center rounded-full">
            Tiếp tục
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualTryOn;
