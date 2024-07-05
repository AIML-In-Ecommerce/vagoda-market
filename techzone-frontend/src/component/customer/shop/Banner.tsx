"use client";
import { Avatar, Button, Divider, Flex } from "antd";
import { useMemo } from "react";
import { StarFilled, MessageFilled } from "@ant-design/icons";

interface BannerProps {
  color: string;
  name: string;
  avatarUrl: string | undefined;
  bannerUrl: string | undefined;
  replyPercentage: number;
  rating: number;
}

export default function Banner(shopInfo: BannerProps) {
  const backgroundUrl = useMemo(() => {
    if (shopInfo.bannerUrl) {
      return shopInfo.bannerUrl;
    } else return "";
  }, [shopInfo.bannerUrl]);

  // color analyzer
  const classColor = useMemo(() => {
    if (shopInfo.bannerUrl && shopInfo.bannerUrl !== "") {
      return "";
    } else
      switch (shopInfo.color) {
        case "black":
          return "bg-black text-white";
        case "red":
          return "bg-red-500 text-white";
        case "orange":
          return "bg-orange-500 text-white";
        case "yellow":
          return "bg-yellow-500 text-white";
        case "cyan":
          return "bg-cyan-500 text-white";
        case "blue":
          return "bg-blue-500 text-white";
        case "green":
          return "bg-green-500 text-white";
        case "pink":
          return "bg-pink-500 text-white";
        case "purple":
          return "bg-purple-500 text-white";
        case "white":
          return "bg-white";
        default:
          return "";
      }
  }, [shopInfo.color]);

  return (
    <div
      className={`p-5 rounded-tr-xl	rounded-tl-xl ${classColor}`}
      style={{
        backgroundImage: `url(${backgroundUrl})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Flex gap="small">
        <div className="m-1">
          {(shopInfo.avatarUrl && (
            <Avatar
              size={64}
              style={{ backgroundColor: "#1677ff" }}
              src={shopInfo.avatarUrl}
            />
          )) || (
            <Avatar size={64} style={{ backgroundColor: "#1677ff" }}>
              {shopInfo.name}
            </Avatar>
          )}
        </div>
        <div className="m-1">
          <Flex vertical>
            <div className="mt-2 font-bold text-lg">{shopInfo.name} ®</div>
            <Flex>
              <div>
                <StarFilled style={{ color: "gold" }} /> {shopInfo.rating} / 5
              </div>
              <Divider
                type="vertical"
                style={{ height: "auto", border: "0.25px solid silver" }}
              />
              <div>
                <MessageFilled /> Phản hồi chat:{" "}
                {shopInfo.replyPercentage * 100}%
              </div>
            </Flex>
          </Flex>
        </div>
        <Divider
          type="vertical"
          style={{ height: "auto", border: "0.25px solid silver" }}
        />
        <Button
          size="large"
          ghost={shopInfo.color !== "white"}
          icon={<MessageFilled />}
          style={{ marginTop: 15 }}
        >
          Chat
        </Button>
      </Flex>
    </div>
  );
}
