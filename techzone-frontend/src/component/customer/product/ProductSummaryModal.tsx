"use client";
import { Flex, Modal, Spin } from "antd";
// import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { priceIndex } from "./ProductDetail";
import CustomEmpty from "../shop/mini/CustomEmpty";
import { ProductDetailType, ProductType } from "@/model/ProductType";
import {
  GET_GetProductDetail,
  POST_GetProductList,
} from "@/apis/product/ProductDetailAPI";

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

  useEffect(() => {
    setModalText(
      <div className="font-bold">
        Tạm tính: {priceIndex(modalData.totalPrice)}
      </div>
    );
  }, [modalData.totalPrice]);

  const [mainProduct, setMainProduct] = useState<ProductDetailType>();
  const [comboList, setComboList] = useState<ProductType[]>();

  // call api
  useEffect(() => {
    handleGetProduct();
    handleGetProductList();
  }, [modalData]);

  const handleGetProduct = async () => {
    if (!modalData.mainProductId) return;
    const response = await GET_GetProductDetail(modalData.mainProductId);
    if (response.status == 200) {
      if (response.data) {
        setMainProduct(response.data);
        // console.log("product", data);
      }
    }
  };
  const handleGetProductList = async () => {
    if (!modalData.comboIdList) return;
    const response = await POST_GetProductList(modalData.comboIdList);
    if (response.status == 200) {
      if (response.data) {
        setComboList(response.data);
        // console.log("product", data);
      }
    }
  };

  return (
    <Modal
      open={modalData.open}
      //   title="Product Summary"
      title="Chi tiết Món hàng"
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      footer={
        //   [
        //   <Button
        //     key="submit"
        //     // type="primary"
        //     loading={confirmLoading}
        //     onClick={handleOk}
        //     type="primary"
        //     ghost
        //   >
        //     {/* Add to Cart */}
        //     Thêm vào giỏ
        //   </Button>,
        //   <Button
        //     key="link"
        //     href="/cart"
        //     type="primary"
        //     loading={confirmLoading}
        //     onClick={handleOk}
        //     danger
        //   >
        //     {/* Move to Checkout */}
        //     Thanh toán ngay
        //   </Button>,
        // ]
        null
      }
    >
      <div className="flex flex-col gap-3 m-5 truncate">
        <div className="bg-white max-w-1/4 h-fit p-4 grid grid-cols-4">
          <div className="col-span-1 col-start-1">Tên sản phẩm</div>
          <div className="col-span-1 col-start-2">Đơn giá</div>
          <div className="col-span-1 col-start-3">Số lượng</div>
          <div className="col-span-1 col-start-4">Thành tiền</div>
        </div>

        <div className="bg-white border-2 rounded-xl max-w-1/4 h-fit p-4 grid grid-cols-4">
          <div className="col-span-1 col-start-1">{mainProduct?.name}</div>
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
        {comboList && comboList.length === 0 && <CustomEmpty />}

        <div className="max-h-40 overflow-y-auto">
          {comboList &&
            comboList.length > 0 &&
            comboList.map((item, index) => (
              <div
                key={index}
                className="bg-white border-2 rounded-xl max-w-1/4 h-fit p-4 grid grid-cols-4"
              >
                <div className="col-span-1 col-start-1">{item.name}</div>
                <div className="col-span-1 col-start-2">
                  {priceIndex(item.price)}
                </div>
                <div className="col-span-1 col-start-3">1</div>
              </div>
            ))}
        </div>

        {comboList && comboList.length > 0 && (
          <div className="bg-white max-w-1/4 h-fit p-4 grid grid-cols-4">
            <div className="col-span-3 col-start-1 font-bold">Tổng combo</div>
            <div className="col-span-1 col-start-4">
              {priceIndex(modalData.totalComboPrice)}
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-row-reverse mb-2 mr-2">
        <p>{modalText}</p>
      </div>
    </Modal>
  );
};

export default ProductSummaryModal;
