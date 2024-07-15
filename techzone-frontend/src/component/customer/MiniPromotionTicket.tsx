"use client";
import { Card, ConfigProvider, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { priceIndex } from "./product/ProductDetail";
import { PromotionType } from "@/model/PromotionType";
import { useState } from "react";
import moment from 'moment';


// Function to format dates
const formatDate = (date: Date) => {
  return moment(date).format('DD/MM/YYYY HH:mm');
};

export interface PromotionProps {
  item: PromotionType;
}

export default function MiniPromotionTicket(props: PromotionProps) {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="m-5 shadow-lg w-fit rounded-lg ">
      <ConfigProvider
        theme={{
          components: {
            Card: {
              /* here is your component tokens */
              headerBg: "#1677ff",
              headerFontSize: 20,
            },
          },

          token: {
            /* here is your global tokens */
            colorTextHeading: "white",
          },
        }}
      >
        <Card
          // hoverable
          title={<div className="text-center">{props.item.name}</div>}
          className="w-[160px] h-[185px] lg:w-[220px]"
        >
          <div className="text-center">
            {/* <div className="mb-2">Cho đơn từ 200K</div> */}
            <Tooltip
              title={<div className="m-5 w-fit">{props.item.description}</div>}
              placement="top"
            >
              <div className="mb-2 overflow-hidden line-clamp-1 cursor-help">
                {props.item.description}
              </div>
            </Tooltip>
            <Tooltip
              title={
                <div className="m-5 grid grid-cols-2 w-fit">
                  <div className="mb-2">Mã</div>
                  <div className="mb-2">{props.item.code}</div>
                  <div className="mb-2">Hạn sử dụng</div>
                  <div className="mb-2">{formatDate(props.item.expiredDate)}</div>
                  <div className="col-span-2">
                    <div>Điều kiện: </div>
                    <div>- {props.item.description}</div>

                    {props.item.discountTypeInfo.limitAmountToReduce && (
                      <div>
                        - Số tiền có thể giảm tối đa:{" "}
                        {priceIndex(props.item.discountTypeInfo.limitAmountToReduce)}
                      </div>
                    )}
                    {props.item.discountTypeInfo.lowerBoundaryForOrder && (
                      <div>
                        - Đơn tối thiểu: {priceIndex(props.item.discountTypeInfo.lowerBoundaryForOrder)}
                      </div>
                    )}

                    <div>- Mỗi khách hàng chỉ sử dụng tối đa 1 lần</div>
                  </div>
                </div>
              }
              placement="bottom"
            >
              <InfoCircleOutlined
                style={{ color: "#1677ff", padding: 5, cursor: "pointer" }}
              />
            </Tooltip>
            {(isSaved && (
              <div
                className="uppercase font-semibold text-red-400 cursor-pointer m-2"
                onClick={() => setIsSaved(false)}
              >
                đã lưu
              </div>
            )) || (
                <div
                  className="uppercase font-semibold text-blue-400 cursor-pointer m-2"
                  onClick={() => setIsSaved(true)}
                >
                  lưu
                </div>
              )}
          </div>
        </Card>
      </ConfigProvider>
    </div>
  );
}
