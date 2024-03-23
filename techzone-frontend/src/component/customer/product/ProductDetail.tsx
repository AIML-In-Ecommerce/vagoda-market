"use client";
import { useEffect, useMemo, useState } from "react";
import {
  Badge,
  Descriptions,
  DescriptionsProps,
  Divider,
  Flex,
  FloatButton,
  List,
  Progress,
  Rate,
  Skeleton,
  Tabs,
} from "antd";
import ReviewList from "./ReviewList";
import FloatingCartForm from "./FloatingCartForm";
import { GiShoppingCart } from "react-icons/gi";
import ComboList from "./ComboList";
import Link from "next/link";
import CartSummaryModal from "./ProductSummaryModal";
import ReactImageMagnify from "react-image-magnify";

export default function ProductDetail() {
  const productInfo = {
    _id: "string",
    name: "ROBOT HÚT BỤI LAU NHÀ THÔNG MINH ECOVACS DEEBOT OZMO T8 NEO BẢN NỘI ĐỊA",
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
      {
        url: "https://i.insider.com/5f835d4ebab422001979aaeb",
      },
      {
        url: "https://robothutbuisky.com/wp-content/uploads/2020/06/t8-max-100-1.jpg?v=1677693356",
      },
      {
        url: "https://product.hstatic.net/200000805527/product/z3994157810128_ac5e199adba96c46d6d7282b2bfdcdc5-scaled_843ed368395649f6a68bc7c08dd20524_master.jpg",
      },
      {
        url: "https://product.hstatic.net/200000805527/product/z3994157835398_2b54a80e46f44a6d57b7a7500a87e49e-scaled_37202a4918fa4f03a6e275b8312f0587_master.jpg",
      },
      {
        url: "",
      },
      {
        url: "",
      },
      {
        url: "",
      },
      {
        url: "",
      },
      {
        url: "",
      },
      {
        url: "",
      },
    ],
    avgRating: 4.5,
    createdAt: "string",
  };

  const items: DescriptionsProps["items"] = [
    // key can be index, label is title, children is content
    // TODO: make span configurable?
    {
      key: "1",
      label: "Product",
      children: "ECOVACS DEEBOT OZMO T8 NEO",
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
      // label: `Technical Specifications`,
      label: "Thông số kĩ thuật",
      key: "2",
      children: <Descriptions bordered items={items} />,
    },
    {
      // label: `Review Summary`,
      label: `Tổng quan đánh giá`,
      key: "3",
      children: (
        <div className="p-2">
          <Flex gap="small">
            <Rate
              disabled
              allowHalf
              defaultValue={4.5}
              style={{ padding: 5 }}
            />
            <div className="font-bold uppercase text-xl">4.5</div>
          </Flex>

          <div className="font-light pb-5">(10 đánh giá)</div>
          {/* overview */}
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

          <div className="font-bold pt-5 text-lg">TechZone Assistant 🤖</div>

          <div className="font-semibold pt-5">
            Tổng quan đánh giá khách hàng:
          </div>
          <div className="pt-2">
            Tổng thể, iRobot Roomba 980 là một sự lựa chọn tốt cho người tiêu
            dùng muốn đầu tư vào một robot hút bụi thông minh và hiệu quả. Với
            hiệu suất hút bụi mạnh mẽ, tính năng thông minh và khả năng vận hành
            linh hoạt, Roomba 980 sẽ giúp giảm bớt công việc lau chùi và mang
            lại một không gian sống sạch sẽ hơn.
          </div>
        </div>
      ),
    },
  ];

  // images
  type ImageInfoType = {
    width: number;
    height: number;
  };

  const [mainImage, setMainImage] = useState(productInfo.images[0].url);
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

  // price
  // number of main item
  const [numberOfItem, setNumberOfItem] = useState(1);

  // total combo price
  const [totalComboPrice, setTotalComboPrice] = useState(0);

  // combo id list
  const [comboIdList, setComboIdList] = useState<Array<string>>([]);

  const totalPrice = useMemo(() => {
    return numberOfItem * productInfo.finalPrice + totalComboPrice;
  }, [totalComboPrice, numberOfItem]);

  // modal
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };

  return (
    <div className="justify-between mx-10 lg:mx-20 gap-10 grid grid-cols-8 h-fit pb-10">
      <div className="col-span-5 lg:col-span-6">
        {/* about product */}
        <div className="bg-white shadow-md flex lg:flex-row flex-col my-10">
          <Flex vertical>
            <div className="m-2">
              <List
                grid={{ gutter: 20, column: 5 }}
                dataSource={productInfo.images}
                renderItem={(item) => (
                  <List.Item>
                    <div
                      className={`cursor-pointer ${
                        mainImage == item.url
                          ? "border-4 border-blue-400"
                          : "border-2"
                      }`}
                      onClick={() => {
                        setMainImage(item.url);
                      }}
                    >
                      <img
                        className="h-14 w-full object-contain"
                        src={item.url}
                        alt={item.url}
                      />
                    </div>
                  </List.Item>
                )}
              />
            </div>

            <div className="bg-white h-fit shadow-md p-4 z-50">
              {/* <img
                className="h-[500px] w-[500px] object-contain"
                src={mainImage}
                alt={productInfo.name}
              /> */}

              <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: productInfo.name,
                    isFluidWidth: true,
                    // width: 500,
                    // height: 500,
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
                    width: "200%",
                    height: "100%",
                  },
                  isHintEnabled: true,
                  // Hover to Zoom
                  hintTextMouse: "Trỏ để phóng to",
                  shouldHideHintAfterFirstActivation: false,
                  // imageClassName: "max-w-[550px]",
                  // enlargedImageContainerClassName:
                  //   "h-[500px] w-[500px] object-fill",
                }}
              />
            </div>
          </Flex>
          {/* desc */}

          <div className="p-4 min-w-[450px] lg:w-[600px]">
            {productInfo._id == null && <Skeleton active />}

            <div className="text-sm">
              Thương hiệu / Shop:{" "}
              <Link href="" className="text-blue-500">
                Ecovacs
              </Link>
            </div>

            <div className="font-bold uppercase text-lg">
              {productInfo.name}
            </div>

            <Flex
              gap="small"
              style={{ lineHeight: 2, marginTop: 2, alignContent: "center" }}
            >
              <Rate
                disabled
                allowHalf
                defaultValue={4.5}
                style={{ padding: 5 }}
              />
              <div className="font-bold uppercase text-xl">
                {productInfo.avgRating}
              </div>
              <div className="text-xs font-light mt-2">
                ({numberOfReview} đánh giá)
              </div>
              <Divider
                type="vertical"
                style={{ height: "auto", border: "0.25px solid silver" }}
              />
              <div className="font-light">Đã bán 5000+</div>
            </Flex>

            <div className="flex flex-row gap-3 my-2">
              <div className="line-through text-gray-600 uppercase text-xl md:text-2xl lg:text-2xl">
                {/* {productInfo.originalPrice} Đ */}
                {priceIndex(productInfo.originalPrice)}
              </div>
              <div className="font-bold text-red-500 uppercase text-xl md:text-2xl lg:text-2xl">
                {priceIndex(productInfo.finalPrice)}
              </div>
              {/* <div className="text-red-500 uppercase text-xs mt-1">-50%</div> */}
            </div>
            {/* sub category tags */}
            {/* <div className="capitalize text-xs mt-5">Sub-category:</div>
            <Tag>
              <a href="https://github.com/ant-design/ant-design/issues/1862">
                Điện máy - Điện gia dụng
              </a>
            </Tag>
            <Tag>
              <a href="https://github.com/ant-design/ant-design/issues/1862">
                Thiết bị văn phòng
              </a>
            </Tag> */}
            {/* sub category tags */}

            {/* add Link later if use */}
            {/* <div className="flex flex-col gap-3">
              <div className="font-semibold pt-5">Dịch vụ bổ sung</div>
              <div className="bg-white shadow-md max-w-1/4 h-fit p-4 cursor-pointer">
                Thay đổi Thông tin vận chuyển
              </div>
              <div className="bg-white shadow-md max-w-1/4 h-fit p-4 cursor-pointer">
                Ưu đãi, mã giảm giá
              </div>
            </div> */}

            <div className="grid grid-cols-4">
              <div className="col-span-1 col-start-1 font-bold pt-5">
                Tình trạng:{" "}
              </div>
              <div className="col-span-1 col-start-2 pt-5">Còn hàng</div>
              <div className="col-span-1 col-start-1 font-bold pt-5">
                Số lượng:{" "}
              </div>
              <div className="col-span-1 col-start-2 pt-5">124332</div>
            </div>
          </div>
        </div>
        {/* related products to buy with  */}
        <div className="font-semibold px-5 text-md">
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
          />
        </div>
      </div>
      <div className="col-span-3 my-10 lg:col-span-2">
        <FloatingCartForm
          handleCartDetail={setOpen}
          numberOfItem={numberOfItem}
          updateItemNumber={setNumberOfItem}
          totalPrice={totalPrice}
        />
      </div>
      <div className="col-span-5 lg:col-span-6">
        {/* reviews */}
        <Divider>Khách hàng đánh giá</Divider>

        <ReviewList setNumberOfReview={setNumberOfReview} />

        <FloatButton.Group>
          <FloatButton
            icon={<GiShoppingCart />}
            tooltip={<div>Xem chi tiết</div>}
            // badge={{ count: 23, overflowCount: 999 }}
            onClick={showModal}
          />
          <FloatButton.BackTop tooltip={<div>Move to Top</div>} />
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
