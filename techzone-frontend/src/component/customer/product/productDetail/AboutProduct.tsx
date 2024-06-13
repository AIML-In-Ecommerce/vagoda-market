"use client";
import { ProductStatusToStringConverter } from "@/component/user/utils/ProductStatusConverter";
import { QuantityControl } from "@/component/user/utils/QuantityControl";
import { ProductDetailType, ProductStatus } from "@/model/ProductType";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  PercentageOutlined,
} from "@ant-design/icons";
import {
  Image as AntdImage,
  Button,
  Flex,
  List,
  Rate,
  Skeleton,
  Tag,
} from "antd";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import ReactImageMagnify from "react-image-magnify";
import CustomEmpty from "../../shop/mini/CustomEmpty";

interface AboutProductProps {
  product: ProductDetailType;
  numberOfItem: number;
  setNumberOfItem: (number: number) => void;
  mainImage: string;
  setMainImage: (string: string) => void;
  //
  selectedColorOption: any;
  setSelectedColorOption: (color: any) => void;
  selectedSizeOption: string;
  setSelectedSizeOption: (size: string) => void;
}

export default function AboutProduct(props: AboutProductProps) {
  // mock data

  // const colorOptionsData = [
  //   { label: "Cam", value: "#cc4f14" },
  //   { label: "Đỏ", value: "#cc1414" },
  //   { label: "Vàng", value: "#fae102" },
  // ];

  // type Color = {
  //   link: string;
  //   color: {
  //     label: string;
  //     value: string;
  //   };
  // };

  // const mockImages: Color[] = [
  //   {
  //     link: "https://images.pexels.com/photos/5693891/pexels-photo-5693891.jpeg?auto=compress&cs=tinysrgb&w=600",
  //     color: {
  //       label: "Red",
  //       value: "#FF0000",
  //     },
  //   },
  //   {
  //     link: "https://images.pexels.com/photos/5693891/pexels-photo-5693891.jpeg?auto=compress&cs=tinysrgb&w=600",
  //     color: {
  //       label: "Green",
  //       value: "#00FF00",
  //     },
  //   },
  //   {
  //     link: "https://images.pexels.com/photos/5693891/pexels-photo-5693891.jpeg?auto=compress&cs=tinysrgb&w=600",
  //     color: {
  //       label: "Blue",
  //       value: "#0000FF",
  //     },
  //   },
  //   {
  //     link: "https://images.pexels.com/photos/5693891/pexels-photo-5693891.jpeg?auto=compress&cs=tinysrgb&w=600",
  //     color: {
  //       label: "Yellow",
  //       value: "#FFFF00",
  //     },
  //   },
  //   {
  //     link: "https://images.pexels.com/photos/5693891/pexels-photo-5693891.jpeg?auto=compress&cs=tinysrgb&w=600",
  //     color: {
  //       label: "Black",
  //       value: "#000000",
  //     },
  //   },
  //   {
  //     link: "https://images.pexels.com/photos/5693891/pexels-photo-5693891.jpeg?auto=compress&cs=tinysrgb&w=600",
  //     color: {
  //       label: "White",
  //       value: "#FFFFFF",
  //     },
  //   },
  //   {
  //     link: "https://images.pexels.com/photos/5693891/pexels-photo-5693891.jpeg?auto=compress&cs=tinysrgb&w=600",
  //     color: {
  //       label: "Purple",
  //       value: "#800080",
  //     },
  //   },
  //   {
  //     link: "https://images.pexels.com/photos/5693891/pexels-photo-5693891.jpeg?auto=compress&cs=tinysrgb&w=600",
  //     color: {
  //       label: "Orange",
  //       value: "#FFA500",
  //     },
  //   },
  //   {
  //     link: "https://images.pexels.com/photos/5693891/pexels-photo-5693891.jpeg?auto=compress&cs=tinysrgb&w=600",
  //     color: {
  //       label: "Pink",
  //       value: "#FFC0CB",
  //     },
  //   },
  //   {
  //     link: "https://images.pexels.com/photos/5693891/pexels-photo-5693891.jpeg?auto=compress&cs=tinysrgb&w=600",
  //     color: {
  //       label: "Brown",
  //       value: "#A52A2A",
  //     },
  //   },
  // ];

  // end mock data

  // variables and functions
  const [colorOptions, setColorOptions] = useState<any[]>([]);

  // images for zoom lens
  type ImageInfoType = {
    width: number;
    height: number;
  };

  const [mainImageInfo, setMainImageInfo] = useState<ImageInfoType>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    function getMeta(url: string, callback: any) {
      const img = new Image();
      img.src = url;
      img.onload = function () {
        callback(img.width, img.height);
      };
    }
    getMeta(props.mainImage, (width: number, height: number) => {
      // alert(width + "px " + height + "px");
      let imageInfo = { width, height };
      setMainImageInfo(imageInfo);
    });
  }, [props.mainImage]);

  // image col
  const imageCol = useMemo(() => {
    if (!props.product || !props.product.images) return 1;
    return props.product.images.length > 5 ? 2 : 1;
  }, [props.product]);

  // functions
  const onIncrement = (key: React.Key, value: number) => {
    if (value === 100) return;
    props.setNumberOfItem(value + 1);
  };

  const onDecrement = (key: React.Key, value: number) => {
    if (value === 1) return;
    props.setNumberOfItem(value - 1);
  };

  const onQuantityChange = (key: React.Key, value: number) => {
    // Update the 'amount' field of the product with the specified key
    if (value) {
      props.setNumberOfItem(value);
    }
  };

  const discountPercentage = useMemo(() => {
    if (!props.product) return 0;
    return Math.round(
      ((props.product.originalPrice - props.product.finalPrice) /
        props.product.originalPrice) *
        100
    );
  }, [props.product]);

  useEffect(() => {
    let colorData: any[] = [];
    props.product.attribute.colors.forEach((image) => {
      colorData.push(image.color);
    });
    setColorOptions(colorData);
  }, [props.product]);

  return (
    <div className="bg-white flex lg:flex-row flex-col my-5 lg:max-h-[450px] xl:max-h-[550px] overflow-y-clip">
      {/* about product */}
      <Flex>
        <div
          className={`m-2 flex flex-col min-w-14 mt-6 ${
            imageCol == 1 ? "max-w-14" : "max-w-28"
          }`}
        >
          <List
            grid={{ gutter: 20, column: imageCol }}
            dataSource={props.product.images}
            locale={{
              emptyText: <CustomEmpty />,
            }}
            renderItem={(item) => (
              <List.Item>
                <div
                  className={`cursor-pointer ${
                    props.mainImage == item
                      ? "border-4 border-blue-400"
                      : "border-2"
                  }`}
                  onClick={() => {
                    props.setMainImage(item);
                  }}
                >
                  <img
                    className="h-12 w-12 object-fill"
                    src={item}
                    alt={"Ảnh sản phẩm"}
                  />
                </div>
              </List.Item>
            )}
          />

          {/* TODO: new images type */}
          {/* <List
            grid={{ gutter: 20, column: imageCol }}
            dataSource={mockImages.filter(
              (image) =>
                !props.selectedColorOption ||
                image.color.label === props.selectedColorOption.label
            )}
            locale={{
              emptyText: <CustomEmpty />,
            }}
            renderItem={(item) => (
              <List.Item>
                <div
                  className={`cursor-pointer ${
                    props.mainImage == item.link
                      ? "border-4 border-blue-400"
                      : "border-2"
                  }`}
                  onClick={() => {
                    props.setMainImage(item.link);
                  }}
                >
                  <img
                    className="h-12 w-12 object-fill"
                    src={item.link}
                    // alt={item}
                  />
                </div>
              </List.Item>
            )}
          /> */}
        </div>

        <div className="bg-white h-fit z-50">
          <AntdImage
            width={20}
            src="https://cdn.icon-icons.com/icons2/1372/PNG/512/resize-3_91066.png"
            preview={{
              src: props.mainImage,
            }}
            className="absolute top-2 left-2 z-50 cursor-pointer border-2 border-white mb-5"
          />

          {/* alt option */}
          {/* <AntdImage
                width={500}
                src={mainImage}
                preview={{
                  src: mainImage,
                }}
                className="border-2 border-white"
              /> */}

          <ReactImageMagnify
            {...{
              smallImage: {
                alt: props.product.name,
                isFluidWidth: true,
                width: 500,
                height: 500,
                src: props.mainImage,
                // src: mainImage + "?width=500&height=500",
              },
              largeImage: {
                src: props.mainImage,
                // width: mainImageInfo.width * 0.8,
                // height: mainImageInfo.height * 0.8,
                width: mainImageInfo.width,
                height: mainImageInfo.height,
              },
              enlargedImageContainerDimensions: {
                // width: "160%",
                // height: "120%",
                // width: width > 1000 ? "180%" : "350%",
                width: "180%",
                height: "100%",
              },
              // isHintEnabled: true,
              // hintTextMouse: "Trỏ để phóng to hoặc nhấn vào kính lúp",
              shouldHideHintAfterFirstActivation: false,
              // imageClassName: "h-[500px] w-[500px] object-fill",
            }}
          />
        </div>
      </Flex>

      {/* desc */}
      <div className="p-4 ml-5 md:w-[700px] lg:min-w-[400px] xl:min-w-[600px] xl:min-w-4/7 overflow-hidden ">
        {/* grid grid-rows-3 */}
        {props.product._id == null && <Skeleton active />}

        <Flex vertical gap="small">
          {/* name block */}
          <div className="flex flex-col gap-2">
            <div className="font-bold text-xl lg:text-2xl xl:text-3xl truncate mt-2 xl:mt-14">
              {props.product.name}
            </div>

            <div className="text-xs">
              Thương hiệu / Shop:{" "}
              <Link href="" className="text-blue-500">
                {props.product.brand}
              </Link>
            </div>
          </div>

          {/* rating block */}
          <Flex
            gap="small"
            style={{ alignContent: "center" }}
            className="flex items-center h-fit"
          >
            <Rate
              disabled
              allowHalf
              defaultValue={props.product.avgRating}
              style={{ padding: 5, fontSize: 18 }}
            />
            <div className="font-bold uppercase text-xl">
              ({props.product.avgRating})
            </div>
            {/* <div className="text-xs font-light mt-2">
                ({numberOfReview} đánh giá)
              </div> */}
            {/* <Divider
                      type="vertical"
                      style={{ height: "auto", border: "1px solid silver" }}
                    /> */}
            <div className="mt-1 text-xs text-slate-600">
              - Đã bán {props.product.soldQuantity}
            </div>
          </Flex>

          {/* price block */}
          <div className="flex flex-col justify-center">
            {discountPercentage !== 0 && (
              <div className="line-through text-slate-300 uppercase text-sm md:text-lg xl:text-xl">
                {priceIndex(props.product.originalPrice)}
              </div>
            )}

            <div className="flex flex-row gap-3">
              <div className="font-bold text-red-500 uppercase text-xl md:text-2xl xl:text-4xl">
                {priceIndex(props.product.finalPrice)}
              </div>
              {discountPercentage !== 0 && (
                <div className="text-red-500 uppercase text-xs mt-1">
                  -{discountPercentage}%
                </div>
              )}
            </div>
          </div>
        </Flex>

        {/* attributes and status */}
        <Flex vertical gap="small" className="row-start-2 my-2">
          {/* status block */}
          <Flex gap="4px 0">
            {props.product.status === ProductStatus.AVAILABLE && (
              <Tag color="#55acee" icon={<CheckCircleOutlined />}>
                {ProductStatusToStringConverter(props.product.status)}
              </Tag>
            )}
            {props.product.status === ProductStatus.SOLD_OUT && (
              <Tag color="#cd201f" icon={<CloseCircleOutlined />}>
                {ProductStatusToStringConverter(props.product.status)}
              </Tag>
            )}
            {props.product.status === ProductStatus.SALE && (
              <Tag color="#87d068" icon={<PercentageOutlined />}>
                {ProductStatusToStringConverter(props.product.status)}
              </Tag>
            )}
          </Flex>

          {/* attributes block */}
          {colorOptions && colorOptions.length > 0 && (
            <div id="color block">
              <div className="flex text-xs gap-1">
                <div>Màu sắc: </div>
                {props.selectedColorOption &&
                  props.selectedColorOption.label && (
                    <div className="font-bold">
                      {props.selectedColorOption.label}
                    </div>
                  )}
              </div>

              <Flex gap="4px">
                {colorOptions.map((color, index) => (
                  <div
                    key={index}
                    className={`${
                      props.selectedColorOption === color
                        ? "border-2 border-white rounded-full brightness-75"
                        : "border-2 border-white rounded-full"
                    }`}
                  >
                    <Button
                      type="primary"
                      size="middle"
                      style={{ background: color.value, width: 50 }}
                      className="rounded-full"
                      onClick={() => {
                        if (props.selectedColorOption === color)
                          props.setSelectedColorOption(null);
                        else {
                          props.setSelectedColorOption(color);
                        }
                      }}
                    />
                  </div>
                ))}
              </Flex>
            </div>
          )}

          {props.product.attribute.size &&
            props.product.attribute.size.length > 0 && (
              <div id="size block">
                <div className="flex text-xs gap-1">
                  <div>Kích thước: </div>
                  <div className="font-bold">{props.selectedSizeOption}</div>
                </div>

                <Flex gap="4px">
                  {props.product.attribute.size.map((size, index) => (
                    <div
                      key={index}
                      className={`${
                        props.selectedSizeOption === size
                          ? "border-2 border-white rounded-full brightness-75"
                          : "border-2 border-white rounded-full"
                      }`}
                    >
                      <Button
                        type="primary"
                        size="middle"
                        style={{ background: "#86997c", width: 50 }}
                        className="rounded-full"
                        onClick={() => {
                          if (props.selectedSizeOption === size)
                            props.setSelectedSizeOption("");
                          else {
                            props.setSelectedSizeOption(size);
                          }
                        }}
                      >
                        {size}
                      </Button>
                    </div>
                  ))}
                </Flex>
              </div>
            )}

          {/* end attributes block */}
        </Flex>

        {/* buttons block  */}
        <div className="row-start-3 items-end flex gap-2 mt-5">
          <QuantityControl
            componentSize={5}
            keyProp={0}
            value={props.numberOfItem}
            minValue={1}
            maxValue={100}
            defaultValue={1}
            inputWidth={75}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            onQuantityChange={onQuantityChange}
          />

          <Button
            type="primary"
            href="/cart"
            danger
            block
            size="large"
            style={{ background: "#5c6856" }}
            className="rounded-full"
          >
            Mua ngay
          </Button>
        </div>
      </div>
    </div>
  );
}

// price
export const priceIndex = (price: number) => {
  return price.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  });
};
