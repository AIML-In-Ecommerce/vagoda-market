import { ProductStatus } from "@/model/ProductType";

export const ProductStatusToStringConverter = (value: ProductStatus) => {
  return (
    <span>
      {value === ProductStatus.AVAILABLE && <span>Còn hàng</span>}
      {value === ProductStatus.SOLD_OUT && <span>Hết hàng</span>}
      {value === ProductStatus.SALE && <span>Giảm giá</span>}
    </span>
  );
};
