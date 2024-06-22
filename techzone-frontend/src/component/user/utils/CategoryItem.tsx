"use client";

import { CategoryType } from "@/model/CategoryType";
import { Flex, Image } from "antd";
import { useState } from "react";

/**
 * maxSize: [maxWidth, maxHeight]
 */
interface CategoryItemProps {
  category: CategoryType;
  onHoldingCallback: (params: any) => void;
  onLeavingCallback: (params: any) => void;
  // maxSize: any[]
}

export default function CategoryItem(props: CategoryItemProps) {
  const hiddenNameState =
    " transition-opacity duration-1000 ease-out opacity-0";
  const visibleNameState =
    " transition-opacity duration-700 ease-in opacity-80";

  const hiddenImageOpacity = " opacity-100";
  const visibleImageOpacity = " opacity-100";

  // const maxWidth = props.maxSize[0]
  // const maxHeight = props.maxSize[1]

  const [isVisibleName, setIsVisibleName] = useState<string>(hiddenNameState);
  const [imageOpacity, setImageOpacity] = useState<string>(visibleImageOpacity);

  function handleMouseEnter() {
    setTimeout(() => {
      setImageOpacity(hiddenImageOpacity);
      setIsVisibleName(visibleNameState);
      props.onHoldingCallback(true);
    }, 0);
    // setIsVisibleName(visibleNameState)
  }

  function handleMouseLeave() {
    setTimeout(() => {
      setImageOpacity(visibleImageOpacity);
      setIsVisibleName(hiddenNameState);
      props.onLeavingCallback(false);
    }, 0);
  }

  return (
    <>
      <div
        key={props.category._id}
        className="container w-full h-full overflow-hidden"
        onMouseEnter={() => {
          handleMouseEnter();
        }}
        onMouseLeave={() => {
          handleMouseLeave();
        }}
        // style={{
        //   // backgroundImage: `url(${props.category.image})`,
        //   backgroundSize: "contain",
        //   backgroundPosition: "center",
        // }}
      >
        <div className="shadow-black rounded-md hover:scale-105 transition duration-500 cursor-pointer">
          {props.category && props.category.image ? (
            <Image
              className={`container relative ${imageOpacity} rounded-md`}
              width={"100%"}
              height={"100%"}
              preview={false}
              src={props.category.image}
            />
          ) : (
            <Image
              className="container relative"
              width={"100%"}
              height={"100%"}
              preview={false}
              src={""}
            />
          )}
          <Flex
            className={`container absolute bg-white from-white/20 to-white/0 w-full top-10 left-0 right-0 h-1/5 min-h-16 p-1 ${isVisibleName}`}
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
    </>
  );
}
