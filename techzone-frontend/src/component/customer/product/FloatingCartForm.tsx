"use client";
import { Avatar, Button, Divider, Flex, InputNumber, Rate } from "antd";
// import { useTranslations } from "next-intl";
// import { ReviewType } from "@/model/ReviewType";
import { AntDesignOutlined } from "@ant-design/icons";

// const Review = (review: ReviewType) => {
const Review = () => {
  //   const t = useTranslations("Review");

  return (
    <div className="fixed lg:w-96 min-w-40 m-2 p-3 bg-white rounded-xl border-2 overflow-hidden">
      <Flex gap="small">
        <div className="m-1">
          <Avatar
            size="large"
            style={{ backgroundColor: "#1677ff" }}
            icon={<AntDesignOutlined />}
          />
        </div>
        <div className="m-1">
          <Flex vertical>
            <b>TechZone ® </b>
            <div className="text-gray-600 font-light text-xs">Official</div>
          </Flex>
        </div>
      </Flex>

      <Divider />

      <div className="mx-2">
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
        <div className="m-2 my-5 text-xl"> Tạm tính: 0 Đ</div>
      </Flex>

      <Flex vertical gap="small" style={{ width: "100%" }}>
        <Button type="primary" danger block size="large">
          Mua ngay
        </Button>
        <Button disabled block>
          Mua trả góp - trả sau
        </Button>
        <Button type="text" block>
          Thêm vào giỏ
        </Button>
        <Button type="link" block>
          Xem chi tiết
        </Button>
      </Flex>
    </div>
  );
};

export default Review;
