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
};

export type _ProductType = {
  _id: string;
  name: string;
  image: string;
  avgRating: number;
  soldQuantity: number;
  finalPrice: number;
  originalPrice: number;
  isFlashSale: boolean;
  // category: { id: string; name: string };
  // subCategory: { id: string; name: string };
  // subCategoryType: { id: string; name: string };
};

export type ProductDetailType = {
  _id: string;
  name: string;
  description: string;
  originalPrice: number;
  finalPrice: number;

  category: string; // TODO
  subCategory: string; // TODO
  subCategoryType: any; // TODO
  attribute: {
    colors: {
      link: string;
      color: { label: string; value: string };
    }[];
    size: string[];
    material: string;
    warranty: string;
  }; // TODO
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
  color: {
    link: string;
    color: { label: string; value: string };
  };
  size: string;
  quantity: number;
};

export enum ProductStatus {
  AVAILABLE = "AVAILABLE",
  SOLD_OUT = "SOLD_OUT",
  SALE = "SALE",
}
