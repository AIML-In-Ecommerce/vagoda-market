"use client";
import ProductDetail from "@/component/customer/product/ProductDetail";
import { ReactElement } from "react";
import { notification } from "antd";
import type { NotificationArgsProps } from "antd";

type NotificationPlacement = NotificationArgsProps["placement"];

export default function ProductDetailPage() {
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
    <div>
      {contextHolder}

      <ProductDetail notify={openNotification} />
    </div>
  );
}
