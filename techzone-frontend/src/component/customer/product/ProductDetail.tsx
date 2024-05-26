"use client";
import {
  Affix,
  Image as AntdImage,
  Badge,
  Button,
  Descriptions,
  DescriptionsProps,
  Empty,
  Flex,
  FloatButton,
  InputNumber,
  List,
  Popover,
  Progress,
  Rate,
  Skeleton,
  Tabs,
} from "antd";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import ReactImageMagnify from "react-image-magnify";
import ComboList from "./ComboList";
import FloatingCartForm from "./FloatingCartForm";
import CartSummaryModal from "./ProductSummaryModal";
import ReviewList from "./ReviewList";

export default function ProductDetail() {
  const productInfo = {
    _id: "string",
    name: "Áo Polo Nam Pique Cotton USA",
    // attribute: {
    //   ....
    // }
    description: "string",
    originalPrice: 8900000,
    finalPrice: 4900000,
    category: "string",
    shopId: "string",
    // status: ENUM[AVAILABLE, SOLD_OUT, SALE];
    images: [
      "https://cdn.shopify.com/s/files/1/0023/1342/0889/products/ClassicShirt_White_1_5cd5bf10-af18-4d0b-a477-bc3422d8401a.jpg?v=1688497040",
      // "https://dictionary.cambridge.org/images/thumb/shirt_noun_002_33400.jpg?version=6.0.11",
      "https://www.aristobrat.in/cdn/shop/files/ClassicShirt_White_1.jpg?v=1709556583&width=2048",
      "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/1ea7ed04-5964-4ad8-a224-b884d15fb60c/sportswear-oversized-t-shirt-ptNVST.png",

      // "https://www.aristobrat.in/cdn/shop/files/ClassicShirt_White_1.jpg?v=1709556583&width=2048",
      // "https://www.aristobrat.in/cdn/shop/files/ClassicShirt_White_1.jpg?v=1709556583&width=2048",

      // "https://www.aristobrat.in/cdn/shop/files/ClassicShirt_White_1.jpg?v=1709556583&width=2048",
      // "https://www.aristobrat.in/cdn/shop/files/ClassicShirt_White_1.jpg?v=1709556583&width=2048",
      // "https://www.aristobrat.in/cdn/shop/files/ClassicShirt_White_1.jpg?v=1709556583&width=2048",
      // "https://www.aristobrat.in/cdn/shop/files/ClassicShirt_White_1.jpg?v=1709556583&width=2048",
      // "https://www.aristobrat.in/cdn/shop/files/ClassicShirt_White_1.jpg?v=1709556583&width=2048",
    ],
    avgRating: 4.9,
    createdAt: "string",
  };

  // replace this with html component from seller page
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

  // images
  type ImageInfoType = {
    width: number;
    height: number;
  };

  const [mainImage, setMainImage] = useState(productInfo.images[0]);
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

  const [numberOfReview, setNumberOfReview] = useState(0);

  const [numberOfItem, setNumberOfItem] = useState(1);

  const [totalComboPrice, setTotalComboPrice] = useState(0);

  const [comboIdList, setComboIdList] = useState<Array<string>>([]);

  const totalPrice = useMemo(() => {
    return numberOfItem * productInfo.finalPrice + totalComboPrice;
  }, [totalComboPrice, numberOfItem]);

  const imageCol = useMemo(() => {
    return productInfo.images.length > 5 ? 2 : 1;
  }, []);

  const [width, setWidth] = useState(window.innerWidth);
  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // modal
  const [open, setOpen] = useState(false);

  // review summary
  const reviewSummary = (
    <div className="sticky bg-white rounded-xl mt-2 border-2 top-0 p-3 flex flex-col md:flex-row lg:flex-col items-center">
      <div id="star-review-summary">
        <Popover
          title="Thống kê chung"
          content={
            <div>
              <Flex vertical gap="small" style={{ width: 300 }}>
                <Flex gap="small">
                  <Rate
                    disabled
                    defaultValue={5}
                    style={{ padding: 5, fontSize: 10 }}
                  />
                  <Flex gap="small" style={{ width: 180 }}>
                    <Progress percent={66} size="small" />
                  </Flex>
                </Flex>
                <Flex gap="small">
                  <Rate
                    disabled
                    defaultValue={4}
                    style={{ padding: 5, fontSize: 10 }}
                  />
                  <Flex gap="small" style={{ width: 180 }}>
                    <Progress percent={33} size="small" />
                  </Flex>
                </Flex>
                <Flex gap="small">
                  <Rate
                    disabled
                    defaultValue={3}
                    style={{ padding: 5, fontSize: 10 }}
                  />
                  <Flex gap="small" style={{ width: 180 }}>
                    <Progress percent={1} size="small" />
                  </Flex>
                </Flex>
                <Flex gap="small">
                  <Rate
                    disabled
                    defaultValue={2}
                    style={{ padding: 5, fontSize: 10 }}
                  />
                  <Flex gap="small" style={{ width: 180 }}>
                    <Progress percent={0} size="small" />
                  </Flex>
                </Flex>
                <Flex gap="small">
                  <Rate
                    disabled
                    defaultValue={1}
                    style={{ padding: 5, fontSize: 10 }}
                  />
                  <Flex gap="small" style={{ width: 180 }}>
                    <Progress percent={0} size="small" />
                  </Flex>
                </Flex>
              </Flex>
            </div>
          }
        >
          <div className="flex flex-col cursor-pointer items-center gap-2 w-max">
            <div className="font-bold uppercase text-sm md:text-sm">
              đánh giá sản phẩm
            </div>
            <div className="font-extrabold uppercase text-2xl md:text-6xl">
              4.5
            </div>
            <Rate
              disabled
              allowHalf
              defaultValue={4.5}
              style={{ padding: 5, fontSize: 28 }}
            />
            <div className="italic pb-5 text-[9px] md:text-sm">
              {numberOfReview} đánh giá
            </div>
          </div>
        </Popover>
      </div>

      <div id="ai-review-summary" className="mb-5 md:pl-5 lg:pl-0">
        <div className="font-bold md:pt-5 text-sm md:text-lg">
          TechZone Assistant 🤖
        </div>

        <div className="font-semibold pt-5 text-xs md:text-sm">
          Tổng quan đánh giá khách hàng:
        </div>
        <div className="pt-2 text-xs md:text-sm">
          Tổng thể, iRobot Roomba 980 là một sự lựa chọn tốt cho người tiêu dùng
          muốn đầu tư vào một robot hút bụi thông minh và hiệu quả. Với hiệu
          suất hút bụi mạnh mẽ, tính năng thông minh và khả năng vận hành linh
          hoạt, Roomba 980 sẽ giúp giảm bớt công việc lau chùi và mang lại một
          không gian sống sạch sẽ hơn.
        </div>
      </div>
    </div>
  );

  // review summary visibility
  const [reviewSummaryVisibility, setReviewSummaryVisibility] = useState(true);

  // ATTEMPT 1
  // Get the navbar
  // const bottom = document.getElementById("page-bottom-boundary");

  // Get the offset position of the navbar

  // Add the sticky class to the navbar when you reach its scroll position. Remove the sticky class when you leave the scroll position.
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

  // all reviews
  const allReviews = <ReviewList setNumberOfReview={setNumberOfReview} />;

  // tabs, descriptions and review summary
  const tabItems = [
    {
      // label: `Descriptions`,
      label: "Mô tả",
      key: "1",
      children: (
        <div className="p-2">
          <b>Tổng Quan: </b>
          Robot hút bụi đã trở thành một phần không thể thiếu trong cuộc sống
          hiện đại, và iRobot Roomba 980 là một trong những sự lựa chọn hàng đầu
          trong thị trường này. Với nhiều tính năng thông minh và hiệu suất tốt,
          Roomba 980 hứa hẹn mang lại sự thuận tiện và sạch sẽ cho gia đình của
          bạn.
          <br />
          <b>Hiệu Suất Hút Bụi: </b>
          Roomba 980 có một hệ thống hút bụi mạnh mẽ với công nghệ hút
          AeroForce, giúp làm sạch hiệu quả cả trên các bề mặt cứng và thảm. Bộ
          cảm biến thông minh giúp robot nhận biết các khu vực bẩn và tăng cường
          hút ở những vùng đó.
          <br />
          <b>Tính Năng Thông Minh: </b>
          Với tính năng điều khiển từ xa thông qua ứng dụng di động, Roomba 980
          cho phép bạn kiểm soát và lập lịch trình hút bụi một cách linh hoạt.
          Hệ thống điều hướng iAdapt 2.0 cùng với các cảm biến giúp robot tránh
          va chạm và điều hướng thông minh trong không gian, tránh các vật cản
          và lên các bề mặt khác nhau một cách dễ dàng.
          <br />
          <b>Thời Lượng Pin: </b>
          Một điểm yếu nhỏ của Roomba 980 là thời lượng pin không được dài lâu
          như mong đợi. Trong điều kiện sử dụng thông thường, pin có thể đủ cho
          việc hút bụi trong khoảng 1-2 giờ, tùy thuộc vào cấp độ sạch sẽ của
          không gian.
          <br />
          <b>Dễ Dàng Vệ Sinh: </b>
          Việc vệ sinh và bảo dưỡng Roomba 980 cũng khá đơn giản. Bộ lọc và
          thùng chứa bụi dễ dàng tháo rời và làm sạch. Bạn chỉ cần thường xuyên
          làm sạch các phần này để đảm bảo hiệu suất hút bụi tốt nhất.
        </div>
      ),
    },
    {
      // label: `Specifications`,
      label: "Đặc điểm nổi bật",
      key: "2",
      children: <Descriptions bordered items={items} />,
    },
    {
      // label: `Review Summary`,
      label: `Tổng quan đánh giá`,
      key: "3",
      children: (
        <div>
          <div className="lg:grid lg:grid-cols-3 gap-5 h-fit">
            <div className="lg:col-span-1">
              <Affix
                offsetTop={60}
                className={`${reviewSummaryVisibility ? "" : "invisible"} `}
              >
                {reviewSummary}
              </Affix>
            </div>
            <div className="lg:col-span-2">{allReviews}</div>
          </div>
          <div
            id="page-bottom-boundary"
            style={{ border: "1px solid white" }}
            //wip
            // ref={ref}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="justify-between mx-10 lg:px-10 pb-10 gap-5 h-fit overflow-hidden relative">
      <div className="">
        {/* about product */}
        <div className="bg-white flex lg:flex-row flex-col my-5 lg:max-h-[450px] xl:max-h-[550px] overflow-y-clip">
          <Flex>
            <div
              className={`m-2 flex flex-col min-w-14 ${
                imageCol == 1 ? "max-w-14" : "max-w-28"
              }`}
            >
              <List
                grid={{ gutter: 20, column: imageCol }}
                dataSource={productInfo.images}
                locale={{
                  emptyText: (
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description={<span>Không có</span>}
                    />
                  ),
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
                    alt: productInfo.name,
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
          <div className="p-4 ml-5 md:w-[700px] lg:min-w-[400px] xl:min-w-[600px] xl:min-w-4/7 overflow-hidden grid grid-rows-5 xl:grid-rows-6">
            {productInfo._id == null && <Skeleton active />}

            {/* name block */}
            <div className="row-start-1 flex flex-col gap-2">
              <div className="font-bold text-xl lg:text-2xl xl:text-3xl truncate">
                {productInfo.name}
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
              className="row-start-2 flex items-center"
            >
              <Rate
                disabled
                allowHalf
                defaultValue={4.5}
                style={{ padding: 5, fontSize: 30 }}
              />
              <div className="font-bold uppercase text-2xl xl:text-3xl">
                {productInfo.avgRating}
              </div>
              {/* <div className="text-xs font-light mt-2">
                ({numberOfReview} đánh giá)
              </div>
              <Divider
                type="vertical"
                style={{ height: "auto", border: "0.25px solid silver" }}
              />
              <div className="mt-1 text-sm font-light">Đã bán 5000+</div> */}
            </Flex>

            {/* price block */}
            <div className="row-start-3 flex flex-col justify-center">
              <div className="line-through text-slate-300 uppercase text-sm md:text-lg xl:text-xl">
                {priceIndex(productInfo.originalPrice)}
              </div>
              <div className="flex flex-row gap-3">
                <div className="font-bold text-red-500 uppercase text-xl md:text-2xl xl:text-4xl">
                  {priceIndex(productInfo.finalPrice)}
                </div>
                <div className="text-red-500 uppercase text-xs mt-1">-50%</div>
              </div>
            </div>

            <div className="row-start-4 xl:row-span-2 h-1/2 items-center grid grid-cols-4 text-sm xl:text-lg">
              <div className="col-span-1 col-start-1 font-bold pt-3">
                Tình trạng:{" "}
              </div>
              <div className="col-span-1 col-start-2 pt-3">Còn hàng</div>
              <div className="col-span-1 col-start-1 font-bold pt-3">
                Số lượng:{" "}
              </div>
              <div className="col-span-1 col-start-2 pt-3">124332</div>
            </div>

            {/* buttons block  */}
            <div className="row-start-5 xl:row-start-6 items-center flex">
              {/* temp */}
              <InputNumber size="large" />
              {/* <Button block size="large">
                Thêm vào giỏ hàng
              </Button> */}
              <Button type="primary" href="/cart" danger block size="large">
                Mua ngay
              </Button>
            </div>
          </div>
        </div>

        <Affix offsetTop={0}>
          <FloatingCartForm
            handleCartDetail={setOpen}
            numberOfItem={numberOfItem}
            updateItemNumber={setNumberOfItem}
            totalPrice={totalPrice}
            product={{
              name: productInfo.name,
              price: productInfo.finalPrice,
              mainImage: productInfo.images[0],
            }}
          />
        </Affix>

        {/* related products to buy with  */}
        <div className="font-semibold px-5 mt-5 text-sm">
          Sản phẩm có thể kết hợp
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
          />
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
        mainProductId={productInfo._id}
        mainProductPrice={productInfo.finalPrice}
        numberOfItem={numberOfItem}
        comboIdList={comboIdList}
        totalComboPrice={totalComboPrice}
      />
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
