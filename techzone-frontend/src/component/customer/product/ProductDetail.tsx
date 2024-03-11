"use client";
import { useState } from "react";
import {
  Badge,
  Button,
  Card,
  Carousel,
  Descriptions,
  DescriptionsProps,
  Divider,
  Flex,
  FloatButton,
  InputNumber,
  List,
  Modal,
  Progress,
  Rate,
  Spin,
  Switch,
  Tabs,
  Tag,
} from "antd";
import ReviewList from "./ReviewList";
import FloatingCartForm from "./FloatingCartForm";
import { GiShoppingCart } from "react-icons/gi";
import { CustomerServiceOutlined } from "@ant-design/icons";

export default function ProductDetail() {
  const items: DescriptionsProps["items"] = [
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
      label: `Descriptions`,
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
      label: `Technical Specifications`,
      key: "2",
      children: <Descriptions bordered items={items} />,
    },
    {
      label: `Review Summary`,
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

  // combo products
  const data = [
    {
      title: "Combo 1",
    },
    {
      title: "Combo 2",
    },
    {
      title: "Combo 3",
    },
    {
      title: "Combo 4",
    },
  ];

  // modal
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(<>Estimated price: 0</>);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setModalText(
      <Flex gap="small">
        <Spin />
        Adding to cart...
      </Flex>
    );
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
      setModalText(<>Add to cart?</>);
    }, 2000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  // button group
  const [openButton, setOpenButton] = useState(true);
  const onChange = (checked: boolean) => {
    console.log("Clicked open group button");
    setOpenButton(checked);
  };

  return (
    <div className="justify-between mx-10 lg:mx-20 gap-10 grid grid-cols-3">
      <div className="col-span-2">
        {/* about product */}
        <div className="flex lg:flex-row md:flex-row flex-col my-10">
          <div className="bg-white shadow-md max-w-1/4 h-fit p-4">
            <img
              className="h-64 object-cover w-full"
              src={"https://i.insider.com/5f835d4ebab422001979aaeb"}
              // alt={classInfo.name}
            />
          </div>
          {/* desc */}
          <div className="p-4">
            <div className="font-bold uppercase text-lg">
              ROBOT HÚT BỤI LAU NHÀ THÔNG MINH ECOVACS DEEBOT OZMO T8 NEO BẢN
              NỘI ĐỊA
            </div>

            <Flex gap="small">
              <Rate
                disabled
                allowHalf
                defaultValue={4.5}
                style={{ padding: 5 }}
              />
              <div className="font-bold uppercase text-xl">4.5</div>
            </Flex>

            <div className="flex flex-row gap-3 my-2">
              <div className="line-through text-gray-600 uppercase text-xl md:text-2xl lg:text-2xl">
                8,900,000 Đ
              </div>
              <div className="font-bold text-red-500 uppercase text-xl md:text-2xl lg:text-2xl">
                4,900,000 Đ
              </div>
              <div className="text-red-500 uppercase text-xs mt-1">-50%</div>
            </div>
            <div className="capitalize text-xs mt-5">Sub-category:</div>
            <Tag>
              <a href="https://github.com/ant-design/ant-design/issues/1862">
                Điện máy - Điện gia dụng
              </a>
            </Tag>
            <Tag>
              <a href="https://github.com/ant-design/ant-design/issues/1862">
                Thiết bị văn phòng
              </a>
            </Tag>
          </div>
        </div>
        {/* related products to buy with  */}
        <div className="">
          <div className="font-semibold p-5 text-md">Combo suggestions</div>

          <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <div className="cursor-pointer">
                  <Card title={item.title}>Card content</Card>
                </div>
              </List.Item>
            )}
          />
        </div>
        {/* <Carousel autoplay style={{ maxWidth: "200" }}>
          <div>
            <img
              className="h-64 object-cover w-full"
              src={"https://i.insider.com/5f835d4ebab422001979aaeb"}
              // alt={classInfo.name}
            />{" "}
          </div>
          <div>
            <img
              className="h-64 object-cover w-full"
              src={"https://i.insider.com/5f835d4ebab422001979aaeb"}
              // alt={classInfo.name}
            />{" "}
          </div>
          <div>
            <img
              className="h-64 object-cover w-full"
              src={"https://i.insider.com/5f835d4ebab422001979aaeb"}
              // alt={classInfo.name}
            />{" "}
          </div>
          <div>
            <img
              className="h-64 object-cover w-full"
              src={"https://i.insider.com/5f835d4ebab422001979aaeb"}
              // alt={classInfo.name}
            />{" "}
          </div>
        </Carousel> */}
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
      <div className="col-span-1 my-10">
        <FloatingCartForm />
      </div>
      <div className="col-span-2">
        {/* reviews */}
        <Divider>Khách hàng đánh giá</Divider>

        <ReviewList />

        <FloatButton.Group>
          <FloatButton
            icon={<GiShoppingCart />}
            tooltip={<div>Add to Cart</div>}
            badge={{ count: 23, overflowCount: 999 }}
            onClick={showModal}
          />
          <FloatButton.BackTop tooltip={<div>Move to Top</div>} />
        </FloatButton.Group>

        <Modal
          open={open}
          title="Cart Details"
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Return
            </Button>,
            <Button
              key="submit"
              // type="primary"
              loading={loading}
              onClick={handleOk}
            >
              Add to Cart
            </Button>,
            <Button
              key="link"
              href="https://google.com"
              type="primary"
              loading={loading}
              onClick={handleOk}
            >
              Move to Checkout
            </Button>,
          ]}
        >
          {/* <div className="mx-2">
            <Flex gap="small">
              <div className="mt-1"> Số lượng: </div>
              <InputNumber
                min={0}
                max={999}
                defaultValue={0}
                // onChange={onChange}
                changeOnWheel
              />
            </Flex>
          </div>

          <Flex gap="small">
            <div className="m-2 my-5 text-xl"> {modalText} </div>
          </Flex> */}

          <InputNumber
            min={0}
            max={999}
            defaultValue={0}
            // onChange={onChange}
            changeOnWheel
          />
          <p>{modalText}</p>
        </Modal>
      </div>
    </div>
  );
}
