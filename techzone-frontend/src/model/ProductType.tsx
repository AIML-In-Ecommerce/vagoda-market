export type ProductType = {
  _id: string;
  name: string;
  imageLink: string;
  rating: number;
  soldAmount: number;
  price: number;
  originalPrice: number;
  flashSale: boolean;
  category: string;
  shop: string;
};

export type _ProductType = {
  _id: string;
  name: string;
  images: string[];
  avgRating: number;
  soldQuantity: number;
  finalPrice: number;
  originalPrice: number;
  isFlashSale: boolean;
  category: { _id: string; name: string };
  subCategory: { _id: string; name: string };
  subCategoryType: { _id: string; name: string };
  shop: string;
};

export type ProductDetailType = {
  _id: string;
  name: string;
  description: string;
  originalPrice: number;
  finalPrice: number;

  category: string;
  subCategory: string;
  subCategoryType: any;
  attribute: {
    colors: {
      link: string;
      color: { label: string; value: string };
    }[];
    size: string[];
    material: string;
    warranty: string;
  };
  isFlashSale: boolean;
  inventoryAmount: number;
  platformFee: number;
  createAt: string; //??
  createdAt: string; //??
  brand: string;
  profit: string;

  shop: string;
  status: ProductStatus;
  images: string[];
  avgRating: number;
  soldQuantity: number;
};

export type CartProductType = {
  product: string;
  color?: {
    link: string;
    color: { label: string; value: string };
  };
  size?: string;
  quantity: number;
};

export enum ProductStatus {
  AVAILABLE = "AVAILABLE",
  SOLD_OUT = "SOLD_OUT",
  SALE = "SALE",
}
