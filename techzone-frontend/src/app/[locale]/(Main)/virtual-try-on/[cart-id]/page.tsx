"use client";

import React, { useContext } from "react";
import "./local.css";
import { ChangeEvent, useState, useEffect, useRef } from "react";
import { BsPersonBoundingBox } from "react-icons/bs";
import { IoShirtOutline } from "react-icons/io5";
import { IoShirt } from "react-icons/io5";
import { IoBodyOutline } from "react-icons/io5";
import { IoBody } from "react-icons/io5";
import { BsEye } from "react-icons/bs";
import { BsEyeFill } from "react-icons/bs";
import { PiCoatHangerFill } from "react-icons/pi";
import { title } from "process";
import VtoProduct from "@/component/customer/product/VtoProduct";
import Image from "next/image";
import axios from "axios";
import { Divider } from "antd";
import ImageSwiper from "./swiper";
import { AuthContext } from "@/context/AuthContext";
import Replicate from "replicate";
import { SimpleUserInfoType } from "@/model/UserInfoType";
import { AiFillCloseCircle } from "react-icons/ai";

const authLocalStorageID = "#auth-context-user-info-record-ID";
type Mode = "MODEL" | "PRODUCT" | "PREVIEW";
type LoadStatus = "READY" | "RUNNING" | "COMPLETED" | "ERROR";

interface VtoProduct {
  _id: string;
  name: string;
  originalPrice: number;
  finalPrice: number;
  size: string;
  color: {
    label: string;
    value: string;
  };
  image: string;
}

const mockVtoProductData = [
  {
    _id: "123",
    name: "Áo thun Nam Lados",
    originalPrice: 200000,
    finalPrice: 150000,
    size: "XL",
    color: {
      label: "Trắng",
      value: "fffdfd",
    },
    image:
      "https://res.cloudinary.com/dgsrxvev1/image/upload/v1716443927/%C3%A1o_thun_cppclk.jpg",
  },
  {
    _id: "234",
    name: "Áo thun Unisex Laurents",
    originalPrice: 200000,
    finalPrice: 150000,
    size: "XL",
    color: {
      label: "Trắng",
      value: "fffdfd",
    },
    image:
      "https://res.cloudinary.com/dgsrxvev1/image/upload/v1716443927/l%E1%BA%A3utent_qwmpog.jpg",
  },
  {
    _id: "345",
    name: "Áo Sơ mi Nam Lados",
    originalPrice: 200000,
    finalPrice: 150000,
    size: "XL",
    color: {
      label: "Trắng",
      value: "fffdfd",
    },
    image:
      "https://res.cloudinary.com/dgsrxvev1/image/upload/v1716443926/vn-11134207-7r98o-lp8u23rvrf4r40_hcpkjk.jpg",
  },
  {
    _id: "345",
    name: "Áo Sơ mi Nam Lados",
    originalPrice: 200000,
    finalPrice: 150000,
    size: "XL",
    color: {
      label: "Trắng",
      value: "fffdfd",
    },
    image:
      "https://res.cloudinary.com/dgsrxvev1/image/upload/v1716443926/vn-11134207-7r98o-lp8u23rvrf4r40_hcpkjk.jpg",
  },
];

const VirtualTryOn = () => {
  const [continueBtnState, setContinueBtnState] = useState<boolean>(false);
  const [mode, setMode] = useState<Mode>("MODEL");
  const [productList, setProductList] = useState<VtoProduct[]>([]);
  const [chosenProduct, setChosenProduct] = useState<VtoProduct>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [tryOnLoading, setTryOnLoading] = useState<LoadStatus>("READY");
  const tryOnImageUrl = useRef<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);
  const userImageUrl = useRef<string | null>(null);
  const AI_DOMAIN = process.env.NEXT_PUBLIC_AI_DOMAIN;

  function initLoading() {
    const storageInfo = localStorage.getItem(authLocalStorageID);
    if (storageInfo != null) {
      return JSON.parse(storageInfo) as SimpleUserInfoType;
    } else {
      return null;
    }
  }

  const userInfo = initLoading();

  useEffect(() => {
    async function fetchData() {
      try {
        const response: any = await axios.get(
          `https://apis.fashionstyle.io.vn/cart/user?userId=${userInfo?._id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        if (response.status === 200) {
          let cart: VtoProduct[] = [];
          response.data.data.products.forEach((item: any) => {
            let colorLabel = item.color ? item.color.color.label : "";
            let colorValue = item.color ? item.color.color.value : "";
            let imageLink = item.color ? item.color.link : item.images[0];
            const product: VtoProduct = {
              _id: item._id,
              name: item.name,
              originalPrice: item.originalPrice,
              finalPrice: item.finalPrice,
              size: item.size,
              color: {
                label: colorLabel,
                value: colorValue,
              },
              image: imageLink,
            };
            cart.push(product);
          });
          console.log("Cart: ", cart);
          setProductList(cart);
        }
      } catch (error) {
        console.error("There was an error fetching the cart data!", error);
      }
    }
    fetchData();
  }, [userInfo?._id]);

  const handleCancelImg = () => {
    setImagePreview(null);
    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  const handleIconClick = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      console.log("No File Selected");
    }
  };

  const handleUpload = async () => {
    if (fileRef.current?.files?.length) {
      console.log("Here");
      const formData = new FormData();
      formData.append("image", fileRef.current.files[0]);

      try {
        const response = await axios.post(
          "https://apis.fashionstyle.io.vn/upload/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );
        console.log("Image uploaded successfully:", response.data);
        if (response.status == 200) {
          userImageUrl.current = response.data.data.path;
          setMode("PRODUCT");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      console.log("No file selected or file input is not working");
    }
  };

  const changeMode = (newMode: Mode) => {
    setMode(newMode);
  };

  const changeChosenProduct = (product: VtoProduct) => {
    setChosenProduct(product);
    setContinueBtnState(true);
  };

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

  const startTryOnClick = () => {
    setTryOnLoading("RUNNING");
  };

  const fetchVirtualTryOn = async () => {
    setTryOnLoading("RUNNING");
    const postBody = {
      modelImgUrl: userImageUrl.current,
      garmentImgUrl: chosenProduct?.image,
    };

    console.log("PostBody: ", postBody);

    try {
      const response = await axios.post(
        `${AI_DOMAIN}/genai/virtual-try-on`,
        postBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status == 200) {
        console.log("Response: ", response.data);
        tryOnImageUrl.current = response.data.data.tryOnImage;
        setTryOnLoading("COMPLETED");
      }
    } catch (error) {
      console.error("Error fetching virtual try-on:", error);
      setTryOnLoading("ERROR");
    }

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    // const output= await replicate.run(
    //   "viktorfa/oot_diffusion:9f8fa4956970dde99689af7488157a30aa152e23953526a605df1d77598343d7",
    //   {
    //     input: {
    //       seed: 0,
    //       steps: 20,
    //       model_image: userImageUrl.current,
    //       garment_image: chosenProduct?.image,
    //       guidance_scale: 2,
    //     },
    //   },
    // );
    // if (output) {
    //   console.log(output);
    //   tryOnImageUrl.current = output.output;
    //   setTryOnLoading("COMPLETED");
    // }
  };

  const renderMainBox = (mode: Mode) => {
    switch (mode) {
      case "MODEL":
        return (
          <div className="w-full h-[calc(100%-80px)] flex justify-center items-center">
            <div
              className={`w-full h-full flex flex-col gap-5 justify-center items-center cursor-pointer ${
                imagePreview != null && "hidden"
              }`}
              onClick={handleIconClick}
            >
              <input
                ref={fileRef}
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept="image/*"
              />
              <BsPersonBoundingBox className="w-[150px] h-[150px]" />
              <div className="text-md italic">Click để lên ảnh của bạn</div>
            </div>
            {imagePreview && (
              <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
                <div className="relative w-[38%] aspect-square">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    layout="fill"
                    objectFit="cover"
                    loading="lazy"
                    className="rounded-xl"
                  />
                </div>
                <div className="w-full flex flex-row justify-center items-center gap-4">
                  <button
                    className="bg-white bg-opacity-20 px-4 py-1 rounded-full hover:bg-opacity-50"
                    onClick={handleCancelImg}
                  >
                    Hủy chọn
                  </button>
                  <button
                    className="bg-black bg-opacity-50 px-4 py-1 rounded-full hover:bg-opacity-80"
                    onClick={handleUpload}
                  >
                    Xác nhận
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      case "PRODUCT":
        return (
          <div className="flex flex-row gap-3 p-5 overflow-x-auto w-full h-[calc(100%-50px)] mt-2 scrollbar scrollbar-thin scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-thumb-slate-400 ">
            {productList.map((product) => (
              <div className="w-[calc(100%/3.5)]" key={product._id}>
                <VtoProduct
                  key={product._id}
                  product={product}
                  setChosenProduct={changeChosenProduct}
                />
              </div>
            ))}
          </div>
        );
      case "PREVIEW":
        return (
          <div className="w-full h-[calc(100%-100px)]  flex flex-row gap-4 justify-center items-center">
            {renderTryOnPreview(tryOnLoading)}
          </div>
        );
      default:
        return "Ảnh của bạn";
    }
  };

  const renderTryOnPreview = (tryOnLoading: string) => {
    switch (tryOnLoading) {
      case "READY":
        return (
          <button
            className="
            bg-white bg-opacity-50 text-2xl px-8 py-3 rounded-full border-white  flex items-center gap-2  hover:text-slate-500 hover:bg-opacity-80"
            onClick={fetchVirtualTryOn}
          >
            {/* <FiSend /> */}
            <span>Bắt đầu thử đồ</span>
          </button>
        );
      case "RUNNING":
        return (
          <div className="w-full h-full flex flex-row gap-4 justify-center items-center">
            <span className="loader"></span>
            <span className="text-loader"></span>
          </div>
        );
      case "COMPLETED":
        return (
          // <div className="relative w-[40%] aspect-square">
          //   <Image
          //     src={tryOnImageUrl.current}
          //     alt="Preview"
          //     layout="fill"
          //     objectFit="cover"
          //     loading="lazy"
          //     className="rounded-xl"
          //   />
          // </div>
          <div className="relative h-full ">
            <ImageSwiper imgList={tryOnImageUrl.current} />
          </div>
        );
      case "ERROR":
        return (
          <div className="w-[25%] rounded-xl flex flex-col justify-center items-center bg-white  p-4">
            <AiFillCloseCircle className="w-[120px] h-[120px] text-[#f53e5a]  " />
            <div className="text-xl font-bold text-[#f53e5a] mt-2">Error</div>
            <p className="text-sm text-slate-400 text-center">
              Đã có lỗi xảy ra trong quá trình thử đồ hãy thử lại
            </p>
          </div>
        );
    }
  };

  const renderChosenProductBox = (chosenProduct: VtoProduct) => {
    return (
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-3/4 w-[45%]  bg-style flex flex-row rounded-2xl">
        {mode === "PRODUCT" ? (
          <AiFillCloseCircle
            className="w-5 h-5 cursor-pointer"
            onClick={(e) => setChosenProduct(undefined)}
          />
        ) : (
          <div className="w-5 h-5 "></div>
        )}
        <div className="w-[75%] h-full flex flex-col gap-1 justify-center items-start py-4 pr-4">
          <div className="w-full text-base font-semibold text-white truncate overflow-hidden overflow-ellipsis whitespace-nowrap">
            {chosenProduct.name}
          </div>
          <div className="w-full flex flex-row gap-2 items-center">
            <div className="text-base font-bold text-white">
              {chosenProduct.finalPrice}đ
            </div>
            <div className="text-xs font-normal text-[#D7D7D7] line-through">
              {chosenProduct.originalPrice}đ
            </div>
          </div>
          <div className="w-[75%] flex flex-row justify-between bg-white bg-opacity-50 rounded-full">
            <div className="px-2 py-0.5 text-xs font-normal text-white">
              Size{" "}
              <span className="text-sm font-bold ml-1">
                {chosenProduct.size}
              </span>
            </div>
            <div className="px-2 py-0.5 text-xs font-normal text-white">
              Màu sắc{" "}
              <span className="text-sm font-bold ml-1">
                {chosenProduct.color.label}
              </span>
            </div>
          </div>
        </div>
        <div className="relative w-[25%] aspect-square">
          <Image
            src={chosenProduct.image}
            alt="Image of product"
            layout="fill"
            objectFit="cover"
            loading="lazy"
            className="rounded-r-2xl"
          />
        </div>
      </div>
    );
  };

  const tryAgainCLick = () => {
    setImagePreview(null);
    setContinueBtnState(false);
    setMode("MODEL");
    setChosenProduct(undefined);
    setTryOnLoading("READY");
    userImageUrl.current = "";
  };

  useEffect(() => {
    renderTitle(mode);
    renderMainBox(mode);
  }, [mode, imagePreview]);

  return (
    <div className="bg-[url('https://res.cloudinary.com/dgsrxvev1/image/upload/v1716347947/dressing_room_c9bl2n.jpg')] bg-center bg-cover bg-no-repeat w-[100vw] h-[100vh] flex flex-col justify-center items-center pb-10">
      <div className="w-full h-[80%] flex flex-col gap-10 justify-center items-center">
        <div className="w-[40%]">
          <Divider style={{ borderColor: "white" }}>
            <div className="flex w-[200px] h-[50px] bg-style text-white text-xl justify-center items-center rounded-full">
              {renderTitle(mode)}
            </div>
          </Divider>
        </div>

        <div className="w-full h-full flex flex-row justify-center items-center gap-10">
          <div className="w-[200px] flex justify-center items-center">
            <div className="w-[60px] h-[200px] rounded-full bg-style flex flex-col gap-5 justify-center items-center text-white">
              <div
                className={`w-[50px] h-[50px]  rounded-full flex justify-center items-center  ${
                  mode === "MODEL"
                    ? "bg-white bg-opacity-50 "
                    : "hover:bg-slate-50 hover:bg-opacity-20"
                }`}
                // onClick={(e) => changeMode("MODEL")}
              >
                {mode === "MODEL" ? (
                  <IoBody className="w-[30px] h-[30px] " />
                ) : (
                  <IoBodyOutline className="w-[30px] h-[30px] " />
                )}
              </div>
              <div
                className={`w-[50px] h-[50px] rounded-full flex justify-center items-center  ${
                  mode === "PRODUCT"
                    ? "bg-white bg-opacity-50"
                    : "hover:bg-white hover:bg-opacity-20"
                }`}
                // onClick={(e) => changeMode("PRODUCT")}
              >
                {mode === "PRODUCT" ? (
                  <IoShirt className="w-[30px] h-[30px] " />
                ) : (
                  <IoShirtOutline className="w-[30px] h-[30px] " />
                )}
              </div>
              <div
                className={`w-[50px] h-[50px]  rounded-full flex justify-center items-center  ${
                  mode === "PREVIEW"
                    ? "bg-white bg-opacity-50"
                    : "hover:bg-slate-50 hover:bg-opacity-20"
                }`}
                // onClick={(e) => changeMode("PREVIEW")}
              >
                {mode === "PREVIEW" ? (
                  <BsEyeFill className="w-[30px] h-[30px] " />
                ) : (
                  <BsEye className="w-[30px] h-[30px] " />
                )}
              </div>
            </div>
          </div>
          <div className="relative w-[60%] h-full bg-style text-white rounded-3xl p-4">
            <div className=" w-fit h-[48px] flex flex-row justify-center items-center px-1 bg-white bg-opacity-50 text-white text-xl rounded-full">
              <div className="w-[40px] h-[40px] bg-white text-slate-500 rounded-full flex justify-center items-center">
                <PiCoatHangerFill className="w-[25px] h-[25px] text-slate" />
              </div>
              <div className="mx-3">Phòng thử đồ</div>
            </div>
            <div className="w-full h-full max-h-full">
              {renderMainBox(mode)}
            </div>
            {chosenProduct != undefined &&
              renderChosenProductBox(chosenProduct)}
          </div>
          <div
            className={`flex w-[200px] h-[50px] bg-style text-white text-xl justify-center items-center rounded-full cursor-pointer hover:bg-black ${
              (continueBtnState && mode === "PRODUCT") || mode === "PREVIEW"
                ? ""
                : "invisible"
            }`}
            onClick={(e) => {
              if (mode === "PRODUCT") setMode("PREVIEW");
              if (mode === "PREVIEW") tryAgainCLick();
            }}
          >
            {mode === "PRODUCT" ? " Tiếp tục" : "Thử lại"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualTryOn;
