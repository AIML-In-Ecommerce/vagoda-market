import { Flex, Image } from "antd";
import { useEffect, useState } from "react";
import { PiShoppingCart } from "react-icons/pi";
import { motion, useAnimation } from "framer-motion";

interface SimpleProductCardProps {
  info: SimpleProductInfo;
  imageHeight: string | undefined;
  imageWidth: string | undefined;
}

interface SimpleProductInfo {
  _id: string;
  name: string;
  originalPrice: number;
  finalPrice: number;
  status: string;
  image: string;
}

export default function SimpleProductCard({
  info,
  imageHeight,
  imageWidth,
}: SimpleProductCardProps) {
  //here we can get locale from web locale language hahaha
  //ok
  const locale = "vi-VN";
  const visibleAdditionalInfo = "transition-opacity duration-1000 opacity-100";
  const hiddenAdditionalInfo = "transition-opacity duration-1000 opacity-0";

  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    if (isHovered) {
      controls.start({ opacity: 1, y: -50 });
    } else {
      controls.start({ opacity: 0, y: 0 });
    }
  }, [isHovered, controls]);

  const currencyFormater = Intl.NumberFormat(locale, {
    style: "currency",
    currency: "VND",
  });
  const [visibleAdditionalInfoState, setVisibleAdditionalInfoState] =
    useState<string>(hiddenAdditionalInfo);

  function calculateDiscountPercentage(
    originalPrice: number,
    finalPrice: number
  ) {
    return Math.ceil(((originalPrice - finalPrice) * 100) / originalPrice);
  }

  function handleAddToCartOnClick() {
    console.log(info);
  }

  function handleItemOnClick() {}

  function handleMouseEnter() {
    setIsHovered(true);
    setTimeout(() => {
      setVisibleAdditionalInfoState(visibleAdditionalInfo);
    }, 700);
  }

  function handleMouseLeave() {
    setIsHovered(false);
    setTimeout(() => {
      setVisibleAdditionalInfoState(hiddenAdditionalInfo);
    }, 1000);
  }

  const ProductImage = (
    <Image
      className="rounded-lg w-max"
      height={imageHeight}
      width={imageWidth}
      src={info.image}
      alt=" ảnh minh họa sản phẩm"
    />
  );

  const ProductFinalPrice = (
    <p className="text-xl sm:text-md font-semibold text-amber-600">
      {currencyFormater.format(info.finalPrice)}
    </p>
  );

  const ProductOriginPrice = (
    <p className="font-semibold text-gray-500 line-through text-[10px]">
      {currencyFormater.format(info.originalPrice)}
    </p>
  );

  const ProductName = (
    <p className="text-wrap text-base font-semibold text-amber-900">
      {info.name}
    </p>
  );

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.1 }} // Hiệu ứng mờ khi di chuột qua
        className="w-52 "
      >
        <Flex
          className="h-64 w-48 rounded-lg bg-white py-2 px-1"
          vertical
          justify="center"
          onMouseEnter={() => handleMouseEnter()}
          onMouseLeave={() => handleMouseLeave()}
          onClick={() => handleItemOnClick()}
        >
          <Flex className="relative" vertical justify="center" align="center">
            <div className="z-0">{ProductImage}</div>
            <Flex
              className={`w-full z-20 absolute bottom-0 bg-white py-4 ${visibleAdditionalInfoState}`}
              justify="center"
              align="center"
            >
              <Flex className="w-2/3 px-2" justify="start" align="baseline">
                {ProductName}
              </Flex>
              <Flex className="w-1/3" justify="end" align="center">
                <button
                  className="w-full"
                  type="button"
                  onClick={() => handleAddToCartOnClick}
                >
                  <Flex
                    className="w-full bg-stone-600 hover:bg-stone-700 font-semibold text-white py-2 rounded-md"
                    justify="center"
                    align="center"
                    gap={4}
                  >
                    <PiShoppingCart />
                    <p>Add</p>
                  </Flex>
                </button>
              </Flex>
            </Flex>
          </Flex>
          <div className="flex justify-between align-middle mt-3 mx-3 ">
            <Flex className="pl-1" vertical justify="center" align="start">
              {ProductFinalPrice}
              {ProductOriginPrice}
            </Flex>
            <Flex
              className="bg-amber-700 h-8 rounded-sm my-2 py-2 px-2"
              justify="center"
              align="center"
            >
              <p className="text-white text-sm font-semibold">
                -{" "}
                {calculateDiscountPercentage(
                  info.originalPrice,
                  info.finalPrice
                )}
                %
              </p>
            </Flex>
          </div>
        </Flex>
      </motion.div>
    </>
  );
}
