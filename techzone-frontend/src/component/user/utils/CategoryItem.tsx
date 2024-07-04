"use client";

import { SubCategoryType } from "@/model/CategoryType";
import { Flex, Image } from "antd";
import Link from "next/link";
import { useState } from "react";

/**
 * maxSize: [maxWidth, maxHeight]
 */
interface CategoryItemProps {
  category: SubCategoryType;
  // onHoldingCallback: (params: any) => void;
  // onLeavingCallback: (params: any) => void;
  // maxSize: any[]
}

export default function CategoryItem(props: CategoryItemProps) {
  const hiddenNameState =
    " transition-opacity duration-1000 ease-out opacity-0";
  const visibleNameState =
    " transition-opacity duration-700 ease-in opacity-80";
  const [isVisibleName, setIsVisibleName] = useState<string>(hiddenNameState);

  const hiddenImageOpacity = " opacity-100";
  const visibleImageOpacity = " opacity-100";

  // const maxWidth = props.maxSize[0]
  // const maxHeight = props.maxSize[1]

  const [imageOpacity, setImageOpacity] = useState<string>(visibleImageOpacity);

  function handleMouseEnter() {
    setTimeout(() => {
      setImageOpacity(hiddenImageOpacity);
      setIsVisibleName(visibleNameState);
      // props.onHoldingCallback(true);
    }, 0);
    // setIsVisibleName(visibleNameState)
  }

  function handleMouseLeave() {
    setTimeout(() => {
      setImageOpacity(visibleImageOpacity);
      setIsVisibleName(hiddenNameState);
      // props.onLeavingCallback(false);
    }, 0);
  }

  return (
    <div className="rounded-md">
      {props.category && (
        <Link
          href={"/product-list?category=" + props.category._id}
          className="shadow-black cursor-pointer h-max center rounded-md"
          onMouseEnter={() => {
            handleMouseEnter();
          }}
          onMouseLeave={() => {
            handleMouseLeave();
          }}
        >
          {props.category && props.category.image ? (
            <Image
              className={`${imageOpacity} rounded-md hover:scale-105 transition duration-500`}
              // hover:scale-105 transition duration-500
              width={"100%"}
              height={"100%"}
              preview={false}
              src={props.category.image}
              style={{ zIndex: 10 }}
            />
          ) : (
            <Image
              className="container rounded-md"
              width={"100%"}
              height={"100%"}
              preview={false}
              src={""}
            />
          )}

          <div className="absolute flex items-center inset-0 pointer-events-none">
            <Flex
              className={`bg-white from-white/20 to-white/0 w-full h-1/5 min-h-10 p-1 ${isVisibleName}`}
              justify="center"
              align="center"
              style={{ zIndex: 0 }}
            >
              <Flex className="w-full h-full" justify="center" align="center">
                <p className="font-semibold text-sm lg:text-lg text-wrap text-black uppercase opacity-100 backdrop-blur-lg line-clamp-1">
                  {props.category.name}
                </p>
              </Flex>
            </Flex>
          </div>
        </Link>
      )}

      {/* {props.category && (
        <Link href={"/product-list?category=" + props.category._id}>
          <div
            key={props.category._id}
            className={`container overflow-hidden rounded-md`}
            onMouseEnter={() => {
              handleMouseEnter();
            }}
            onMouseLeave={() => {
              handleMouseLeave();
            }}
            // style={{
            //   backgroundImage: `url(${props.category.image})`,
            //   backgroundSize: "cover",
            //   backgroundPosition: "center",
            // }}
          >
            <div className="container relative shadow-black rounded-md hover:scale-105 transition duration-500 cursor-pointer">
              {props.category && props.category.image ? (
                <Image
                  className={`container relative ${imageOpacity} rounded-md w-full h-full`}
                  width={"100%"}
                  height={"100%"}
                  preview={false}
                  src={props.category.image}
                />
              ) : (
                <Image
                  className="container relative rounded-md"
                  width={"100%"}
                  height={"100%"}
                  preview={false}
                  src={""}
                />
              )}
              <Flex
                className={`absolute bg-white from-white/20 to-white/0 w-full top-10 left-0 right-0 h-1/5 min-h-16 p-1 ${isVisibleName}`}
                justify="center"
                align="center"
              >
                <Flex className="w-full h-full" justify="center" align="center">
                  <p className="font-semibold text-lg text-wrap text-black uppercase opacity-100 backdrop-blur-lg">
                    {props.category.name}
                  </p>
                </Flex>
              </Flex>
            </div>
          </div>
        </Link>
      )} */}
    </div>
  );
}
