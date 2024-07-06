"use client";
import AdvertisementCarousel from "@/component/user/AdvertisementCarousel";
import HomeFlashSales from "@/component/user/HomeFlashSales";
import HotCategory from "@/component/user/HotCategory";
import HotSalesProducts from "@/component/user/HotSalesProducts";
import HotShops from "@/component/user/HotShops";
import RecentlyAccess from "@/component/user/RecentlyAccess";
import { Flex } from "antd";
import { ReactElement } from "react";
import { notification } from "antd";
import type { NotificationArgsProps } from "antd";

type NotificationPlacement = NotificationArgsProps["placement"];

export default function Home() {
  const [api, contextHolder] = notification.useNotification();

  const placement: NotificationPlacement = "topRight"; //topLeft, bottomRight, bottomLeft
  const openNotification = (title: string, content: ReactElement) => {
    api.info({
      message: `${title}`,
      description: content,
      placement,
    });
  };

  return (
    <div className="w-full">
      {contextHolder}
      <Flex
        vertical
        className="w-full h-full bg-[#F3F3F3]"
        align="center"
        justify="center"
      >
        <AdvertisementCarousel />
        {/* <HomeCarousel /> */}
        <div className="invisible h-0 lg:h-14 w-full" />
        <HotCategory />
        <RecentlyAccess notify={openNotification} />
        <HomeFlashSales notify={openNotification} />
        <HotShops />

        {/* <HomeSuggestedProduct /> */}
        <HotSalesProducts notify={openNotification} />
      </Flex>
    </div>
  );
}
