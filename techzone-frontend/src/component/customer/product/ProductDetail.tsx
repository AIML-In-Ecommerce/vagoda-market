"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Badge,
  Descriptions,
  DescriptionsProps,
  Flex,
  FloatButton,
  List,
  Rate,
  Skeleton,
  Tabs,
  Image as AntdImage,
  Affix,
  Button,
  Divider,
  ConfigProvider,
  Tag,
} from "antd";
import {
  PercentageOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import ReviewList from "../review/ReviewList";
import FloatingCartForm from "./FloatingCartForm";
import ComboList from "./ComboList";
import Link from "next/link";
import CartSummaryModal from "./ProductSummaryModal";
import ReactImageMagnify from "react-image-magnify";
import { GET_GetProductDetail } from "@/apis/product/ProductDetailAPI";
import { useParams } from "next/navigation";
import { ProductDetailType, ProductStatus } from "@/model/ProductType";
import CustomEmpty from "../shop/mini/CustomEmpty";
import { QuantityControl } from "@/component/user/utils/QuantityControl";
import ReviewSummary from "../review/ReviewSummary";
import { ProductStatusToStringConverter } from "@/component/user/utils/ProductStatusConverter";
import SimilarList from "./SimilarList";
import useOnScreen from "../../user/utils/UseOnScreen";

export default function ProductDetail() {
  // mock data
  // TODO: replace this with html component from seller page
  const items: DescriptionsProps["items"] = [
    // key can be index, label is title, children is content
    // TODO: make span configurable?
    {
      key: "1",
      label: "Product",
      children: "Áo Polo Nam Pique Cotton USA",
    },
    {
      key: "2",
      label: "Usage Time",
      children: "2019-04-24 18:00:00",
      span: 2,
    },
    {
      key: "3",
      label: "Status",
      children: <Badge status="processing" text="Available" />,
    },
    {
      key: "4",
      label: "Negotiated Amount",
      children: "$80.00",
    },
    {
      key: "5",
      label: "Discount",
      children: "$20.00",
    },
    {
      key: "6",
      label: "Config Info",
      children: (
        <>
          Data disk type: MongoDB
          <br />
          Database version: 3.4
          <br />
          Package: dds.mongo.mid
          <br />
          Storage space: 10 GB
          <br />
          Replication factor: 3
          <br />
          Region: East China 1
          <br />
        </>
      ),
      span: 3,
    },
  ];

  const colorOptionsData = [
    { label: "Cam", value: "#cc4f14" },
    { label: "Đỏ", value: "#cc1414" },
    { label: "Vàng", value: "#fae102" },
  ];
  const sizeOptionsData = ["XL", "L"];

  // end mock data

  // variables and functions
  const { productId } = useParams();

  const [product, setProduct] = useState<ProductDetailType>();

  const [colorOptions, setColorOptions] = useState<any[]>(colorOptionsData);
  const [selectedColorOption, setSelectedColorOption] = useState<any>();

  const [sizeOptions, setSizeOptions] = useState<string[]>(sizeOptionsData);
  const [selectedSizeOption, setSelectedSizeOption] = useState<string>();

  // images for zoom lens
  type ImageInfoType = {
    width: number;
    height: number;
  };

  const [mainImage, setMainImage] = useState<string>("");
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
    getMeta(mainImage, (width: number, height: number) => {
      // alert(width + "px " + height + "px");
      let imageInfo = { width, height };
      setMainImageInfo(imageInfo);
    });
  }, [mainImage]);

  // number of reviews
  const [numberOfReview, setNumberOfReview] = useState(0);

  // price--------------------------------------------------------
  // number of main item
  const [numberOfItem, setNumberOfItem] = useState(1);

  // total combo price
  const [totalComboPrice, setTotalComboPrice] = useState(0);

  // combo id list
  const [comboIdList, setComboIdList] = useState<Array<string>>([]);

  const totalPrice = useMemo(() => {
    if (!product) return 0;
    return numberOfItem * product.finalPrice + totalComboPrice;
  }, [totalComboPrice, numberOfItem, product]);
  //----------------------------------------------------------------

  // image col
  const imageCol = useMemo(() => {
    if (!product) return 1;
    return product.images.length > 5 ? 2 : 1;
  }, [product]);

  // modal
  const [open, setOpen] = useState(false);

  // review summary visibility----------------------------------------------------------------
  // const [reviewSummaryVisibility, setReviewSummaryVisibility] = useState(true);
  // -----------------------------------------------------------------------------------------

  // ATTEMPT 1
  // Get the navbar
  // const bottom = document.getElementById("page-bottom-boundary");

  // // Get the offset position of the navbar

  // // Add the sticky class to the navbar when you reach its scroll position. Remove the sticky class when you leave the scroll position.
  // useEffect(() => {
  //   const sticky = bottom ? bottom.offsetTop : window.scrollY;

  //   if (bottom) {
  //     if (window.scrollY >= sticky) {
  //       setReviewSummaryVisibility(false);
  //     } else {
  //       setReviewSummaryVisibility(true);
  //     }

  //     console.log("bottom ", bottom.offsetTop);
  //   } else console.log("bottom is null");
  // }, [bottom]);

  // ATTEMPT 2
  //   function getDocHeight() {
  //     var D = document;
  //     return Math.max(
  //         D.body.scrollHeight, D.documentElement.scrollHeight,
  //         D.body.offsetHeight, D.documentElement.offsetHeight,
  //         D.body.clientHeight, D.documentElement.clientHeight
  //     );
  // }
  //   window.scroll(function() {
  //     if(window.innerHeight && window.screenTop + window.innerHeight == getDocHeight()) {
  //         alert("bottom!");
  //     }
  //  });

  // ATTEMPT 3: SUCCESSFUL
  const ref = useRef<HTMLDivElement>(null);
  const reviewSummaryVisibility = !useOnScreen(ref);

  const ref2 = useRef<HTMLDivElement>(null);
  const cartVisibility = !useOnScreen(ref2);

  // all reviews
  const allReviews = <ReviewList setNumberOfReview={setNumberOfReview} />;
  const reviewSummary = (
    <ReviewSummary product={product} numberOfReview={numberOfReview} />
  );

  // selected tab key
  const [tabKey, setTabKey] = useState("1");

  const onTabClick = (tabKey: string) => {
    console.log("key: " + tabKey);
    setTabKey(tabKey);
  };

  // tabs, descriptions and review summary
  const tabItems = [
    {
      // label: `Descriptions`,
      label: (
        <div
          className={`uppercase font-bold ${
            tabKey === "1" ? "underline underline-offset-8" : ""
          }`}
        >
          Mô tả
        </div>
      ),
      key: "1",
      children: (
        <div className="p-2">{product && <div>{product.description}</div>}</div>
      ),
    },
    {
      // label: `Specifications`,
      label: (
        <div
          className={`uppercase font-bold ${
            tabKey === "2" ? "underline underline-offset-8" : ""
          }`}
        >
          Đặc điểm nổi bật
        </div>
      ),
      key: "2",
      children: <Descriptions bordered items={items} />,
    },
    {
      // label: `Review Summary`,
      label: (
        <div
          className={`uppercase font-bold ${
            tabKey === "3" ? "underline underline-offset-8" : ""
          }`}
        >
          Tổng quan đánh giá
        </div>
      ),
      key: "3",
      children: (
        <div>
          <div className="lg:grid lg:grid-cols-3 gap-5 h-fit">
            <div className="lg:col-span-1 overflow-y-hidden">
              <Affix
                offsetTop={60}
                className={`${reviewSummaryVisibility ? "" : "invisible"} `}
              >
                {reviewSummary}
              </Affix>
            </div>
            <div className="lg:col-span-2">{allReviews}</div>
          </div>
        </div>
      ),
    },
  ];

  // functions
  const onIncrement = (key: React.Key, value: number) => {
    if (value === 100) return;
    setNumberOfItem(value + 1);
  };

  const onDecrement = (key: React.Key, value: number) => {
    if (value === 1) return;
    setNumberOfItem(value - 1);
  };

  const onQuantityChange = (key: React.Key, value: number) => {
    // Update the 'amount' field of the product with the specified key
    if (value) {
      setNumberOfItem(value);
    }
  };

  const discountPercentage = useMemo(() => {
    if (!product) return 0;
    return Math.round(
      ((product.originalPrice - product.finalPrice) / product.originalPrice) *
        100
    );
  }, [product]);

  // call api
  useEffect(() => {
    handleGetProductDetail();
  }, []);

  useEffect(() => {
    if (!product) return;
    setMainImage(product.images[0]);
  }, [product]);

  const handleGetProductDetail = async () => {
    const response = await GET_GetProductDetail(productId.toString());
    if (response.status == 200) {
      let data = response.data as ProductDetailType;
      if (data) {
        setProduct(data);
        console.log("product", data);
      }
    } else console.log(response.message);
  };

  return (
    <div className="bg-white px-2 lg:px-24 ">
      {(product && (
        <div className="justify-between pb-10 gap-5 h-fit overflow-hidden relative">
          <div className="">
            {/* about product */}
            <div
              className="bg-white flex lg:flex-row flex-col my-5 lg:max-h-[450px] xl:max-h-[550px] overflow-y-clip"
              ref={ref2}
            >
              <Flex>
                <div
                  className={`m-2 flex flex-col min-w-14 mt-6 ${
                    imageCol == 1 ? "max-w-14" : "max-w-28"
                  }`}
                >
                  <List
                    grid={{ gutter: 20, column: imageCol }}
                    dataSource={product.images}
                    locale={{
                      emptyText: <CustomEmpty />,
                    }}
                    renderItem={(item) => (
                      <List.Item>
                        <div
                          className={`cursor-pointer ${
                            mainImage == item
                              ? "border-4 border-blue-400"
                              : "border-2"
                          }`}
                          onClick={() => {
                            setMainImage(item);
                          }}
                        >
                          <img
                            className="h-12 w-12 object-fill"
                            src={item}
                            // alt={item}
                          />
                        </div>
                      </List.Item>
                    )}
                  />
                </div>

                <div className="bg-white h-fit z-50">
                  <AntdImage
                    width={20}
                    src="https://cdn.icon-icons.com/icons2/1372/PNG/512/resize-3_91066.png"
                    preview={{
                      src: mainImage,
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
                        alt: product.name,
                        isFluidWidth: true,
                        width: 500,
                        height: 500,
                        src: mainImage,
                        // src: mainImage + "?width=500&height=500",
                      },
                      largeImage: {
                        src: mainImage,
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
                {product._id == null && <Skeleton active />}

                <Flex vertical gap="small">
                  {/* name block */}
                  <div className="flex flex-col gap-2">
                    <div className="font-bold text-xl lg:text-2xl xl:text-3xl truncate mt-2 xl:mt-10">
                      {product.name}
                    </div>

                    <div className="text-xs">
                      Thương hiệu / Shop:{" "}
                      <Link href="" className="text-blue-500">
                        Ecovacs
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
                      defaultValue={product.avgRating}
                      style={{ padding: 5, fontSize: 18 }}
                    />
                    <div className="font-bold uppercase text-xl">
                      ({product.avgRating})
                    </div>
                    {/* <div className="text-xs font-light mt-2">
                ({numberOfReview} đánh giá)
              </div> */}
                    <Divider
                      type="vertical"
                      style={{ height: "auto", border: "1px solid silver" }}
                    />
                    <div className="mt-1 text-sm text-slate-600">
                      Đã bán {product.soldQuantity}
                    </div>
                  </Flex>

                  {/* price block */}
                  <div className="flex flex-col justify-center">
                    {discountPercentage !== 0 && (
                      <div className="line-through text-slate-300 uppercase text-sm md:text-lg xl:text-xl">
                        {priceIndex(product.originalPrice)}
                      </div>
                    )}

                    <div className="flex flex-row gap-3">
                      <div className="font-bold text-red-500 uppercase text-xl md:text-2xl xl:text-4xl">
                        {priceIndex(product.finalPrice)}
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
                <Flex vertical gap="middle" className="row-start-2 mt-5">
                  {/* status block */}
                  <Flex gap="4px 0">
                    {product.status === ProductStatus.AVAILABLE && (
                      <Tag color="#55acee" icon={<CheckCircleOutlined />}>
                        {ProductStatusToStringConverter(product.status)}
                      </Tag>
                    )}
                    {product.status === ProductStatus.SOLD_OUT && (
                      <Tag color="#cd201f" icon={<CloseCircleOutlined />}>
                        {ProductStatusToStringConverter(product.status)}
                      </Tag>
                    )}
                    {product.status === ProductStatus.SALE && (
                      <Tag color="#87d068" icon={<PercentageOutlined />}>
                        {ProductStatusToStringConverter(product.status)}
                      </Tag>
                    )}
                  </Flex>

                  {/* attributes block */}
                  <div className="flex text-xs gap-1">
                    <div>Màu sắc: </div>
                    <div className="font-bold">{"Đen"}</div>
                  </div>

                  <Flex gap="4px">
                    {colorOptions.map((color, index) => (
                      <div
                        key={index}
                        className={`${
                          selectedColorOption === color
                            ? "border-2 border-blue-500 rounded-full"
                            : ""
                        }`}
                      >
                        <Button
                          type="primary"
                          size="middle"
                          style={{ background: color.value, width: 50 }}
                          className="rounded-full"
                          onClick={() => setSelectedColorOption(color)}
                        />
                      </div>
                    ))}
                  </Flex>

                  <div className="flex text-xs gap-1">
                    <div>Kích thước: </div>
                    <div className="font-bold">{selectedSizeOption}</div>
                  </div>

                  <Flex gap="4px">
                    {sizeOptions.map((size, index) => (
                      <div
                        key={index}
                        className={`${
                          selectedSizeOption === size
                            ? "border-2 border-blue-500 rounded-full"
                            : ""
                        }`}
                      >
                        <Button
                          type="primary"
                          size="middle"
                          style={{ background: "#86997c", width: 50 }}
                          className="rounded-full"
                          onClick={() => setSelectedSizeOption(size)}
                        >
                          {size}
                        </Button>
                      </div>
                    ))}
                  </Flex>
                </Flex>

                {/* buttons block  */}
                <div className="row-start-3 items-end flex gap-2 mt-5">
                  <QuantityControl
                    componentSize={5}
                    keyProp={0}
                    value={numberOfItem}
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

            {/* top floating cart */}
            <Affix
              offsetTop={0}
              className={`${cartVisibility ? "" : "hidden"} `}
            >
              <FloatingCartForm
                handleCartDetail={setOpen}
                numberOfItem={numberOfItem}
                updateItemNumber={setNumberOfItem}
                totalPrice={totalPrice}
                product={{
                  name: product.name,
                  price: product.finalPrice,
                  mainImage: product.images[0],
                }}
              />
            </Affix>

            {/* related products to buy with  */}
            <div className="w-full flex align-middle justify-center items-center">
              <div className="w-1/2">
                <Divider
                  className="mt-8"
                  style={{
                    border: "2px solid silver",
                    borderTop: 0,
                    borderBottom: 0,
                    borderLeft: 0,
                    borderRight: 0,
                    paddingBottom: 0,
                    marginBottom: 0,
                  }}
                >
                  <div className="px-5 text-lg uppercase">
                    Sản phẩm có thể kết hợp
                  </div>
                </Divider>
              </div>
            </div>

            <ComboList
              totalPrice={totalPrice}
              totalComboPrice={totalComboPrice}
              updateTotalComboPrice={(price) => {
                setTotalComboPrice(price);
              }}
              comboIdList={comboIdList}
              setComboIdList={setComboIdList}
            />

            {/* tabs, descriptions and review summary */}
            <div className="my-5">
              <ConfigProvider
                theme={{
                  components: {
                    Tabs: {
                      itemActiveColor: "#c4996c",
                      itemHoverColor: "#c4996c",
                      itemSelectedColor: "#c4996c",
                    },
                  },
                }}
              >
                <Tabs
                  defaultActiveKey="1"
                  type="card"
                  items={tabItems.map((item, i) => {
                    //   const id = String(i + 1);
                    return {
                      label: item.label,
                      key: item.key,
                      children: item.children,
                    };
                  })}
                  className="overflow-y-hidden"
                  style={{ overflow: "hidden" }}
                  onTabClick={onTabClick}
                />
              </ConfigProvider>
            </div>

            <div id="page-bottom-boundary" ref={ref}>
              <Divider />
              {/* similar products */}
              <div className="w-full flex align-middle justify-center items-center">
                <div className="w-1/2">
                  <Divider
                    // className="mt-20"
                    style={{
                      border: "2px solid silver",
                      borderTop: 0,
                      borderBottom: 0,
                      borderLeft: 0,
                      borderRight: 0,
                      paddingBottom: 0,
                      marginBottom: 0,
                    }}
                  >
                    <div className="px-5 text-lg uppercase">
                      Sản phẩm tương tự
                    </div>
                  </Divider>
                </div>
              </div>
              <SimilarList />
            </div>
          </div>

          {/* others */}
          <FloatButton.Group>
            <FloatButton.BackTop tooltip={<div>Lướt lên đầu</div>} />
          </FloatButton.Group>

          <CartSummaryModal
            open={open}
            setOpen={setOpen}
            totalPrice={totalPrice}
            mainProductId={product._id}
            mainProductPrice={product.finalPrice}
            numberOfItem={numberOfItem}
            comboIdList={comboIdList}
            totalComboPrice={totalComboPrice}
          />
        </div>
      )) || <Skeleton active style={{ margin: 10 }} />}
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
