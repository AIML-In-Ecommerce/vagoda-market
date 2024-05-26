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
  // attribute: {
  //   ....
  // }
  description: string;
  originalPrice: number;
  finalPrice: number;
  category: string;
  shopId: string;
  // status: ENUM[AVAILABLE, SOLD_OUT, SALE];
  image: string[];
  avgRating: number;
  createdAt: string;
};
