"use client";
import { Flex } from "antd";
import { FaCopy } from "react-icons/fa";
import {
  StarFilled,
  StarOutlined,
  MessageOutlined,
  AimOutlined,
  ShopOutlined,
  CalendarOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

// interface AboutProps {}

// export default function AboutShop(aboutProps: AboutProps) {
export default function AboutShop() {
  // copy to clipboard -->
  const WriteToClipboard = async (text: string) => {
    const param = "clipboard-write" as PermissionName;
    const result = await navigator.permissions.query({ name: param });
    if (result.state === "granted") {
      console.log("Permission granted");
      await navigator.clipboard.writeText(text);
      return true;
    }
    console.log("Permission denied");
    return false;
  };

  const CopyText = (text: string = "") => {
    // Asynchronously call
    WriteToClipboard(text)
      .then((result) => {
        // If successful, update the isCopied state value
        if (result) {
          //   toast
          //   bannerProps.toast.success("Copy thành công!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // --> end copy to clipboard

  return (
    <div className="p-5 grid grid-cols-7 gap-3">
      <div className="m-2 col-span-1 col-start-4 font-semibold text-gray-600">
        <CalendarOutlined /> Thành viên từ năm:{" "}
      </div>
      <div className="m-2 col-span-3 col-start-5">2024</div>

      <div className="m-2 col-span-1 col-start-4 font-semibold text-gray-600">
        <AppstoreOutlined /> Số sản phẩm:{" "}
      </div>
      <div className="m-2 col-span-3 col-start-5">515</div>

      <div className="m-2 col-span-1 col-start-4 font-semibold text-gray-600">
        <ShopOutlined /> Mô tả cửa hàng:{" "}
      </div>
      <div className="m-2 col-span-3 col-start-5">
        Mua online sản phẩm của cửa hàng TechZone Trading trên TechZone.vn. ✓
        chất lượng cao, uy tín, giá tốt ✓ Chính hãng ✓ Giao hàng toàn quốc
      </div>

      <div className="m-2 col-span-1 col-start-4 font-semibold text-gray-600">
        <StarOutlined /> Đánh giá:{" "}
      </div>
      <div className="m-2 col-span-3 col-start-5">
        <StarFilled style={{ color: "gold" }} /> 4.5 / 5
      </div>

      <div className="m-2 col-span-1 col-start-4 font-semibold text-gray-600">
        <MessageOutlined /> Phản hồi chat:{" "}
      </div>
      <div className="m-2 col-span-3 col-start-5">100%</div>

      <div className="m-2 col-span-1 col-start-4 font-semibold text-gray-600">
        <AimOutlined /> Địa chỉ:{" "}
      </div>
      <div className="m-2 col-span-3 col-start-5">
        <Flex>
          abc
          <div
            className="m-2 cursor-pointer"
            onClick={() => CopyText("dia chi abc")}
          >
            <FaCopy />
          </div>
        </Flex>
      </div>
    </div>
  );
}
