"use client";
import NewReviewForm from "@/component/customer/review/NewReviewForm";
import { ReactElement } from "react";
import { notification } from "antd";
import type { NotificationArgsProps } from "antd";

type NotificationPlacement = NotificationArgsProps["placement"];

export default function ReviewPage() {
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
    <div className="flex items-center align-middle justify-center p-5">
      {contextHolder}

      <NewReviewForm notify={openNotification} />
    </div>
  );
}
