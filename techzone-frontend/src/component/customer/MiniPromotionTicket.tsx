import { Card, ConfigProvider, Flex, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { priceIndex } from "./product/ProductDetail";

export interface PromotionProps {
  // TODO: replace this w PromotionType from model
  item: TempPromotion;
}

// TODO: delete this
export type TempPromotion = {
  _id: string;
  name: string;
  description: string;
  discountType: number;
  discountValue?: number;
  upperBound?: number;
  lowerBound?: number;
  quantity: number;
  activeDate?: string;
  expiredDate?: string;
  // saleCategory: [ObjectId, ...]
  createdAt?: string;
  code: string;
};

export default function MiniPromotionTicket(props: PromotionProps) {
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
          style={{
            width: 200,
            height: 185,
          }}
        >
          <div className="text-center">
            {/* <div className="mb-2">Cho đơn từ 200K</div> */}
            <Tooltip
              title={<div className="m-5 w-fit">{props.item.description}</div>}
              placement="top"
            >
              <div className="mb-2 overflow-hidden line-clamp-1">
                {props.item.description}
              </div>
            </Tooltip>
            <Tooltip
              title={
                <div className="m-5 grid grid-cols-2 w-fit">
                  <div className="mb-2">Mã</div>
                  <div className="mb-2">{props.item.code}</div>
                  <div className="mb-2">Hạn sử dụng</div>
                  <div className="mb-2">{props.item.expiredDate}</div>
                  <div className="col-span-2">
                    <div>Điều kiện: </div>
                    <div>- {props.item.description}</div>

                    {props.item.upperBound && (
                      <div>
                        - Số tiền có thể giảm tối đa:{" "}
                        {priceIndex(props.item.upperBound)}
                      </div>
                    )}
                    {props.item.lowerBound && (
                      <div>
                        - Đơn tối thiểu: {priceIndex(props.item.lowerBound)}
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
            <div className="uppercase font-semibold text-blue-400 cursor-pointer m-2">
              lưu
            </div>
          </div>
        </Card>
      </ConfigProvider>
    </div>
  );
}
