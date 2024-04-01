"use client";
import { Card, Col, Divider, Flex, Row, Statistic, Tooltip } from "antd";
import { FaCopy } from "react-icons/fa";
import {
  StarFilled,
  StarOutlined,
  MessageOutlined,
  AimOutlined,
  ShopOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  InfoCircleOutlined,
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
    <div className="p-5 grid grid-cols-10 gap-3">
      <div className="col-span-3 col-start-1 row-start-3 row-span-2 text-center items-center">
        <Row gutter={16}>
          <Col span={12}>
            <Card bordered={false}>
              <Statistic
                title={
                  <div>
                    Tỉ lệ hủy
                    <Tooltip
                      title={<div className="m-5 w-fit">Trong 4 tuần qua</div>}
                      placement="top"
                    >
                      <InfoCircleOutlined
                        style={{
                          color: "#1677ff",
                          padding: 5,
                          cursor: "pointer",
                        }}
                      />
                    </Tooltip>
                  </div>
                }
                value={11.28}
                precision={2}
                valueStyle={{ color: "#3f8600" }}
                // prefix={<ArrowUpOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card bordered={false}>
              <Statistic
                title={
                  <div>
                    Tỉ lệ đổi trả
                    <Tooltip
                      title={<div className="m-5 w-fit">Trong 4 tuần qua</div>}
                      placement="top"
                    >
                      <InfoCircleOutlined
                        style={{
                          color: "#1677ff",
                          padding: 5,
                          cursor: "pointer",
                        }}
                      />
                    </Tooltip>
                  </div>
                }
                value={9.3}
                precision={2}
                valueStyle={{ color: "#3f8600" }}
                // prefix={<ArrowDownOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
        </Row>
      </div>

      <div className="col-start-4 col-span-1 row-span-6 text-center items-center">
        <Divider
          type="vertical"
          style={{ height: "100%", border: "0.25px solid silver" }}
        />
      </div>

      <div className="m-2 col-span-2 col-start-5 font-semibold text-gray-600">
        <CalendarOutlined /> Thành viên từ năm:{" "}
      </div>
      <div className="m-2 col-span-4 col-start-7">2024</div>

      <div className="m-2 col-span-2 col-start-5 font-semibold text-gray-600">
        <AppstoreOutlined /> Số sản phẩm:{" "}
      </div>
      <div className="m-2 col-span-4 col-start-7">515</div>

      <div className="m-2 col-span-2 col-start-5 font-semibold text-gray-600">
        <ShopOutlined /> Mô tả cửa hàng:{" "}
      </div>
      <div className="m-2 col-span-4 col-start-7">
        Mua online sản phẩm của cửa hàng TechZone Trading trên TechZone.vn. ✓
        chất lượng cao, uy tín, giá tốt ✓ Chính hãng ✓ Giao hàng toàn quốc
      </div>

      <div className="m-2 col-span-2 col-start-5 font-semibold text-gray-600">
        <StarOutlined /> Đánh giá:{" "}
      </div>
      <div className="m-2 col-span-4 col-start-7">
        <StarFilled style={{ color: "gold" }} /> 4.5 / 5
      </div>

      <div className="m-2 col-span-2 col-start-5 font-semibold text-gray-600">
        <MessageOutlined /> Phản hồi chat:{" "}
      </div>
      <div className="m-2 col-span-4 col-start-7">100%</div>

      <div className="m-2 col-span-2 col-start-5 font-semibold text-gray-600">
        <AimOutlined /> Địa chỉ:{" "}
      </div>
      <div className="m-2 col-span-4 col-start-7">
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
