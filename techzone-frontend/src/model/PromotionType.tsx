// export type PromotionType = {
//   _id: string;
//   name: string;
//   description: string;
//   shop?: string;
//   discountType: DiscountType;
//   discountValue?: number;
//   upperBound?: number;
//   lowerBound?: number;
//   quantity: number;
//   activeDate?: string;
//   expiredDate?: string;
//   // saleCategory: [ObjectId, ...]
//   createdAt?: string;
//   code: string;
// };

export enum DiscountType {
  PERCENTAGE = "PERCENTAGE",
  DIRECT_PRICE = "DIRECT_PRICE",
}

export enum PromotionStatus {
  UPCOMMING = "UPCOMMING",
  IN_PROGRESS = "IN_PROGRESS",
  EXPIRED = "EXPIRED"
}

export type ShopSmallInfo = {
  _id: string;
  name: string;
  avatarUrl: string;
}

export type PromotionType = {
  _id: string;
  name: string;
  shop?: ShopSmallInfo;
  description: string;
  discountTypeInfo: DiscountTypeInfo;
  activeDate: Date;
  expiredDate: Date;
  targetProducts: string[];
  quantity: number;
  redeemedTotal?: number;
  status: PromotionStatus;
  code: string;
  createAt: Date;
}

export type DiscountTypeInfo = {
  type: DiscountType;
  value: number;
  lowerBoundaryForOrder: number;
  limitAmountToReduce: number;
}
