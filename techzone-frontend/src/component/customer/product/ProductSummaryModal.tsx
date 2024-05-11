"use client";
import { Button, Empty, Flex, InputNumber, Modal, Spin } from "antd";
// import { useTranslations } from "next-intl";
import { useState } from "react";
import { priceIndex } from "./ProductDetail";

interface ModalProps {
  open: boolean;
  setOpen(value: boolean): void;
  totalPrice: number;
  mainProductId: string;
  mainProductPrice: number;
  numberOfItem: number;
  comboIdList: string[];
  totalComboPrice: number;
}

const ProductSummaryModal = (modalData: ModalProps) => {
  //   const t = useTranslations("Review");
  // modal
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(
    <div className="font-bold">
      Tạm tính: {priceIndex(modalData.totalPrice)}
    </div>
  );

  const handleOk = () => {
    setModalText(
      <Flex gap="small">
        <Spin />
        {/* Adding to cart... */}
        Đang thêm vào giỏ hàng...
      </Flex>
    );
    setConfirmLoading(true);
    setTimeout(() => {
      modalData.setOpen(false);
      setConfirmLoading(false);
      setModalText(
        <div className="font-bold">
          Tạm tính: {priceIndex(modalData.totalPrice)}
        </div>
      );
    }, 2000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    modalData.setOpen(false);
  };

  return (
    <Modal
      open={modalData.open}
      //   title="Product Summary"
      title="Chi tiết Món hàng"
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      footer={[
        // <Button key="back" onClick={handleCancel}>
        //   {/* Return */}
        //   Quay về
        // </Button>,
        <Button
          key="submit"
          // type="primary"
          loading={confirmLoading}
          onClick={handleOk}
          type="primary"
          ghost
        >
          {/* Add to Cart */}
          Thêm vào giỏ
        </Button>,
        <Button
          key="link"
          href="/cart"
          type="primary"
          loading={confirmLoading}
          onClick={handleOk}
          danger
        >
          {/* Move to Checkout */}
          Thanh toán ngay
        </Button>,
      ]}
    >
      {/* put cart summary here? */}

      <div className="flex flex-col gap-3 m-5">
        <div className="bg-white shadow-md max-w-1/4 h-fit p-4 grid grid-cols-4">
          <div className="col-span-1 col-start-1">ID</div>
          <div className="col-span-1 col-start-2">Đơn giá</div>
          <div className="col-span-1 col-start-3">Số lượng</div>
          <div className="col-span-1 col-start-4">Thành tiền</div>
        </div>

        <div className="bg-white shadow-md max-w-1/4 h-fit p-4 grid grid-cols-4">
          <div className="col-span-1 col-start-1">
            {modalData.mainProductId}
          </div>
          <div className="col-span-1 col-start-2">
            {priceIndex(modalData.mainProductPrice)}
          </div>
          <div className="col-span-1 col-start-3">{modalData.numberOfItem}</div>
          <div className="col-span-1 col-start-4">
            {priceIndex(modalData.numberOfItem * modalData.mainProductPrice)}
          </div>
        </div>

        <div className="font-semibold px-5 text-md">
          Sản phẩm có thể kết hợp
        </div>
        {modalData.comboIdList.length === 0 && (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={<span>Không có</span>}
          />
        )}

        {modalData.comboIdList.length > 0 &&
          modalData.comboIdList.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md max-w-1/4 h-fit p-4 grid grid-cols-4"
            >
              <div className="col-span-1 col-start-1">{item}</div>
              <div className="col-span-1 col-start-2"></div>
              <div className="col-span-1 col-start-3">1</div>
            </div>
          ))}
        {modalData.comboIdList.length > 0 && (
          <div className="bg-white shadow-md max-w-1/4 h-fit p-4 grid grid-cols-4">
            <div className="col-span-3 col-start-1 font-bold">Tổng combo</div>
            <div className="col-span-1 col-start-4">
              {priceIndex(modalData.totalComboPrice)}
            </div>
          </div>
        )}
      </div>

      <p>{modalText}</p>
    </Modal>
  );
};

export default ProductSummaryModal;
