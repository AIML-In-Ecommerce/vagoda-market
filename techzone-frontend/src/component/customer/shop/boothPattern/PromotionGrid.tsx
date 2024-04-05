"use client";
import { List, Typography } from "antd";
import MiniPromotionTicket, { TempPromotion } from "../../MiniPromotionTicket";
import { DiscountType } from "@/model/PromotionType";
import { PromotionElement, WidgetType } from "@/model/WidgetType";

const formatDate = (date: Date) => {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${hours}:${minutes} ${day}/${month}/${year}`;
};

interface PromotionGridProps {
  widget: WidgetType;
}

export default function PromotionGrid(props: PromotionGridProps) {
  // TODO: replace this w model
  const promotions: TempPromotion[] = [
    {
      _id: "1",
      name: "Giảm 50%",
      description: "Áp dụng cho thanh toán qua ví điện tử MoMo (tối đa 100k)",
      discountType: DiscountType.PERCENTAGE,
      discountValue: 50,
      quantity: 6,
      upperBound: 100000,
      expiredDate: formatDate(new Date("2024-03-24T12:30:00")),
      code: "BONJOUR",
    },
    {
      _id: "2",
      name: "Giảm 200k",
      description:
        "Áp dụng cho mọi đối tượng khách hàng (cho đơn tối thiểu 400k)",
      discountType: DiscountType.DIRECT_PRICE,
      discountValue: 200000,
      quantity: 20,
      lowerBound: 400000,
      expiredDate: formatDate(new Date("2024-03-27T12:30:00")),
      code: "MERCI",
    },
    {
      _id: "3",
      name: "Giảm 20%",
      description: "Áp dụng cho tất cả khách hàng (tối đa 50k)",
      discountType: DiscountType.PERCENTAGE,
      discountValue: 20,
      quantity: 15,
      upperBound: 50000,
      expiredDate: formatDate(new Date("2024-03-22T12:30:00")),
      code: "AUREVOIR",
    },
    {
      _id: "4",
      name: "Giảm 50k",
      description: "Chỉ áp dụng cho khách hàng VIP",
      discountType: DiscountType.DIRECT_PRICE,
      discountValue: 50000,
      quantity: 10,
      lowerBound: 0,
      expiredDate: formatDate(new Date("2024-04-30T12:30:00")),
      code: "BONSOIR",
    },
    {
      _id: "5",
      name: "Giảm 10%",
      description: "Áp dụng cho thanh toán qua thẻ tín dụng (tối đa 50k)",
      discountType: DiscountType.PERCENTAGE,
      discountValue: 10,
      quantity: 8,
      upperBound: 50000,
      expiredDate: formatDate(new Date("2024-03-25T12:30:00")),
      code: "BIENVENUE",
    },
  ];

  // var
  const element = props.widget.element as PromotionElement;

  return (
    <div className="bg-white my-5 py-5 px-10 ">
      <Typography.Text className="text-2xl font-semibold w-full">
        {element.title}
      </Typography.Text>
      <List
        grid={{ gutter: 16, column: 6 }}
        dataSource={promotions}
        renderItem={(item, i) => (
          <div key={i}>
            <List.Item>
              <MiniPromotionTicket item={item} />
            </List.Item>
          </div>
        )}
      />
    </div>
  );
}
