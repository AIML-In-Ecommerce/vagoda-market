"use client";
import { Avatar, Button, Divider, Flex } from "antd";
// import { useTranslations } from "next-intl";
import { AntDesignOutlined } from "@ant-design/icons";
import { priceIndex } from "./ProductDetail";
import { QuantityControl } from "@/component/user/utils/QuantityControl";

interface FormProps {
  numberOfItem: number;
  updateItemNumber: (value: number) => void;
  totalPrice: number;
  handleCartDetail: (isOpen: boolean) => void;
}

const FloatingCartForm = (formData: FormProps) => {
  //   const t = useTranslations("Review");

  // const totalPrice = useMemo(() => {
  //   return (
  //     formData.numberOfItem * formData.mainProductPrice +
  //     formData.totalComboPrice
  //   );
  // }, [formData.totalComboPrice, formData.numberOfItem]);
  const onIncrement = (key: React.Key, value: number) => {
    if (value === 100) return;
    formData.updateItemNumber(value + 1);
  };

  const onDecrement = (key: React.Key, value: number) => {
    if (value === 1) return;
    formData.updateItemNumber(value - 1);
  };

  const onQuantityChange = (key: React.Key, value: number) => {
    // Update the 'amount' field of the product with the specified key
    if (value) {
      formData.updateItemNumber(value);
    }
  };

  return (
    <div className="sticky top-10 lg:w-72 min-w-40 mr-10 p-3 bg-white rounded-xl border-2 overflow-hidden">
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

          <QuantityControl
            componentSize={5}
            keyProp={0}
            value={formData.numberOfItem}
            minValue={1}
            maxValue={100}
            defaultValue={1}
            inputWidth={75}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            onQuantityChange={onQuantityChange}
          />

          <div className="my-5">
            <div className="font-semibold">Tạm tính:</div>
            <div className="text-xl">{priceIndex(formData.totalPrice)}</div>
          </div>
        </div>

        <Button type="primary" href="/cart" danger block size="large">
          Mua ngay
        </Button>
        {/* <Button type="primary" ghost block disabled>
            Mua trả góp - trả sau
          </Button> */}
        <Button type="primary" ghost block>
          Thêm vào giỏ
        </Button>
        <Button
          type="primary"
          ghost
          block
          onClick={() => formData.handleCartDetail(true)}
        >
          Xem chi tiết
        </Button>
      </Flex>
    </div>
  );
};

export default FloatingCartForm;
