"use client";

import { SimpleShopInfoType } from "@/model/ShopInfoType";
import { Flex, Image } from "antd";
import { useState, useEffect } from "react";

interface ShopItemProps {
  shopInfo: SimpleShopInfoType;
  imageWidth: string;
  imageHeight: string;
}

function ShopItem({ shopInfo, imageHeight, imageWidth }: ShopItemProps) {
  const [menuMode, setMenuMode] = useState("");

  const checkWindowSize = () => {
    if (window.innerWidth > 999) {
      setMenuMode("desktopMode");
    } else {
      setMenuMode("mobileMode");
    }
  };

  useEffect(() => {
    window.addEventListener("resize", checkWindowSize);
    checkWindowSize();
    return () => window.removeEventListener("resize", checkWindowSize);
  }, [checkWindowSize]);

  return (
    <>
      {(menuMode == "desktopMode" && (
        <Flex
          className="container w-full h-full"
          justify="center"
          align="center"
        >
          <Flex
            className="rounded-md overflow-hidden"
            vertical
            justify="center"
            align="center"
            style={{
              width: `${imageWidth}`,
              height: `${imageHeight}`,
            }}
          >
            <Flex
              className="py-2 relative hover:scale-105 transition duration-500 cursor-pointer"
              vertical
              justify="center"
              align="center"
            >
              <Image
                preview={false}
                width={imageWidth}
                height={imageHeight}
                src={shopInfo.shopInfoDesign.avatarUrl}
              />
            </Flex>
            <Flex
              className="w-4/5 absolute bottom-0 bg-black opacity-70 from-white/20 to-white/0 mb-2 px-1 py-1"
              justify="center"
              align="center"
            >
              <Flex
                className="w-full border border-white"
                justify="center"
                align="center"
              >
                <p className="text-2xl font-semibold text-white">
                  {shopInfo.name}
                </p>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      )) || (
        <Flex
          className="container w-full h-full"
          justify="center"
          align="center"
        >
          <Flex
            className="rounded-md overflow-hidden"
            vertical
            justify="center"
            align="center"
            style={{
              width: `100px`,
              height: `100px`,
            }}
          >
            <Flex
              className="py-2 relative hover:scale-105 transition duration-500 cursor-pointer"
              vertical
              justify="center"
              align="center"
            >
              <Image
                preview={false}
                width="100px"
                height="100px"
                src={shopInfo.shopInfoDesign.avatarUrl}
              />
            </Flex>
            <Flex
              className="w-4/5 absolute bottom-0 bg-black opacity-70 from-white/20 to-white/0 mb-2 px-1 py-1"
              justify="center"
              align="center"
            >
              <Flex
                className="w-full border border-white"
                justify="center"
                align="center"
              >
                <p className="text-lg font-semibold text-white overflow-ellipsis">
                  {shopInfo.name}
                </p>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      )}
    </>
  );
}

export default ShopItem;
