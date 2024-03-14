"use client";
import { Avatar, Button, Divider, Flex, InputNumber, Rate } from "antd";
// import { useTranslations } from "next-intl";
// import { ReviewType } from "@/model/ReviewType";
import { AntDesignOutlined } from "@ant-design/icons";

// const Review = (review: ReviewType) => {
const Review = () => {
  //   const t = useTranslations("Review");

  return (
    <div className="fixed lg:w-80 min-w-40 m-2 p-3 bg-white rounded-xl border-2 overflow-hidden">
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

      <Flex vertical gap="small">
        <div className="mx-2">
          <div className="mb-2 font-semibold"> Số lượng: </div>
          <InputNumber
            min={0}
            max={999}
            defaultValue={0}
            // onChange={onChange}
            changeOnWheel
          />
          <div className="my-5">
            <div className="font-semibold">Tạm tính:</div>
            <div className="text-xl">0 Đ</div>
          </div>
        </div>

        <Button type="primary" danger block size="large">
          Mua ngay
        </Button>
        <Button type="primary" ghost block>
          Mua trả góp - trả sau
        </Button>
        <Button type="primary" ghost block>
          Thêm vào giỏ
        </Button>
        <Button type="primary" ghost block>
          Xem chi tiết
        </Button>
      </Flex>
    </div>
  );
};

export default Review;
