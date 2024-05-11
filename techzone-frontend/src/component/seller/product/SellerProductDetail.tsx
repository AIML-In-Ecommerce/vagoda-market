"use client";
import { useState } from "react";
import {
  Badge,
  Button,
  Descriptions,
  DescriptionsProps,
  Divider,
  Empty,
  Flex,
  FloatButton,
  Progress,
  Rate,
  Skeleton,
  Tabs,
} from "antd";
import ImageForm from "./ImageForm";
import OverviewForm from "./OverviewForm";
// import ReviewList from "./ReviewList";
// import ComboList from "./ComboList";

export default function SellerProductDetail() {
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
        url: "https://bizweb.dktcdn.net/thumb/medium/100/391/225/products/t8max-1.jpg?v=1598201886260",
      },
      {
        url: "https://product.hstatic.net/200000805527/product/z3994157810128_ac5e199adba96c46d6d7282b2bfdcdc5-scaled_843ed368395649f6a68bc7c08dd20524_master.jpg",
      },
      {
        url: "https://product.hstatic.net/200000805527/product/z3994157835398_2b54a80e46f44a6d57b7a7500a87e49e-scaled_37202a4918fa4f03a6e275b8312f0587_master.jpg",
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

  // combo
  const [combo, setCombo] = useState([]);

  // modal
  // const [open, setOpen] = useState(false);
  // const showModal = () => {
  //   setOpen(true);
  // };

  // toggle edit mode
  const [editable, setEditable] = useState(false);

  const [currentEditMode, setCurrentEditMode] = useState("");

  // methods
  const edit = (mode: string) => {
    setCurrentEditMode(mode);
    setEditable(true);
  };

  const save = () => {
    switch (currentEditMode) {
      case "image":
        //save

        break;
      case "overview":
        //save

        break;
      case "combo":
        //save

        break;
      case "description":
        //save

        break;
      default:
        break;
    }

    setEditable(false);
    setCurrentEditMode("");
  };

  const cancel = () => {
    setEditable(false);
    //create method to clear data?

    // switch (currentEditMode) {
    //   case "image":
    //     break;
    //   case "overview":
    //     break;
    //   case "combo":
    //     break;
    //   case "description":
    //     break;
    //   default:
    //     break;
    // }
    setCurrentEditMode("");
  };
  return (
    <div className="justify-between mx-10 lg:mx-20 gap-10 grid grid-cols-8">
      <div className="col-span-5 lg:col-span-6">
        {/* about product */}
        <div className="bg-white shadow-md flex lg:flex-row md:flex-row flex-col my-10">
          {/* image */}
          <ImageForm
            editable={editable}
            currentEditMode={currentEditMode}
            images={productInfo.images}
            name={productInfo.name}
          />

          {/* desc */}
          {(productInfo._id == null && (
            <Skeleton active style={{ margin: 10 }} />
          )) || (
            <OverviewForm
              editable={editable}
              currentEditMode={currentEditMode}
              name={productInfo.name}
              avgRating={productInfo.avgRating}
              originalPrice={productInfo.originalPrice}
              finalPrice={productInfo.finalPrice}
            />
          )}
        </div>
        {/* related products to buy with  */}
        <div className="font-semibold px-5 text-md">
          Sản phẩm có thể kết hợp
        </div>

        {combo.length == 0 && (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={<span>Không có</span>}
          />
        )}

        {/* <ComboList
          totalPrice={totalPrice}
          totalComboPrice={totalComboPrice}
          updateTotalComboPrice={(price) => {
            setTotalComboPrice(price);
          }}
          comboIdList={comboIdList}
          setComboIdList={setComboIdList}
        /> */}

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
      <div className="bg-white shadow-md rounded-md h-fit col-span-3 lg:col-span-2 my-10">
        {(editable == false && (
          <Flex vertical gap="small">
            <div className="m-2 font-semibold"> Cập nhật </div>

            <Button type="primary" ghost block onClick={() => edit("image")}>
              Hình ảnh
            </Button>
            <Button type="primary" ghost block onClick={() => edit("overview")}>
              Thông tin chung
            </Button>
            <Button type="primary" ghost block onClick={() => edit("combo")}>
              Sản phẩm kết hợp
            </Button>
            <Button
              type="primary"
              ghost
              block
              onClick={() => edit("description")}
            >
              Thông tin chi tiết
            </Button>
          </Flex>
        )) || (
          <Flex vertical gap="small">
            <Button type="primary" ghost block onClick={() => save()}>
              Lưu thay đổi
            </Button>
            <Button type="primary" danger ghost block onClick={() => cancel()}>
              Hủy thay đổi
            </Button>
          </Flex>
        )}
      </div>
      <div className="col-span-5 lg:col-span-6">
        {/* reviews */}
        <Divider>Phân tích đánh giá khách hàng</Divider>

        {/* <ReviewList /> */}

        <FloatButton.Group>
          <FloatButton.BackTop tooltip={<div>Move to Top</div>} />
        </FloatButton.Group>
      </div>
    </div>
  );
}
