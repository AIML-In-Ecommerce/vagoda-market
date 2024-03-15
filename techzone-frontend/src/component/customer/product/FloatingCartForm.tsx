"use client";
import { Avatar, Button, Divider, Flex, InputNumber, Rate } from "antd";
// import { useTranslations } from "next-intl";
import { AntDesignOutlined } from "@ant-design/icons";
import { useMemo, useState } from "react";
import { priceIndex } from "./ProductDetail";

interface FormProps {
  mainProductId: string;
  mainProductPrice: number;
  comboIdList: string[];
  totalComboPrice: number;
  updateInitialPrice: (price: number) => void;
}

const FloatingCartForm = (formData: FormProps) => {
  //   const t = useTranslations("Review");

  const [numberOfItem, setNumberOfItem] = useState(1);

  const totalPrice = useMemo(() => {
    let temp = numberOfItem * formData.mainProductPrice;
    formData.updateInitialPrice(temp);
    return temp + formData.totalComboPrice;
  }, [formData.totalComboPrice, numberOfItem]);

  return (
    <div className="fixed lg:w-72 min-w-40 mr-10 p-3 bg-white rounded-xl border-2 overflow-hidden">
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
          {/* test */}
          {/* <div>{formData.mainProductPrice}</div>
          <div>{formData.totalComboPrice}</div> */}

          <div className="mb-2 font-semibold"> Số lượng: </div>
          <InputNumber
            min={1}
            max={999}
            defaultValue={numberOfItem}
            onChange={(value) => {
              if (value) {
                setNumberOfItem(value);
              }
            }}
            changeOnWheel
          />
          <div className="my-5">
            <div className="font-semibold">Tạm tính:</div>
            <div className="text-xl">{priceIndex(totalPrice)}</div>
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

export default FloatingCartForm;
