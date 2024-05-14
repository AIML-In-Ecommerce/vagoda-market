type ShopInfoDesignType = {
  color: string;
  name: string; // optional
  avatarUrl: string;
  bannerUrl: string;
};

type ShopDetailType = {
  cancelPercentage: number;
  refundPercentage: number;
  sinceYear: number;
  totalProductNumber: number;
  description: string; //optional
  rating: number;
  replyPercentage: number;
  address: string; //optional
};

export type ShopType = {
  account: string;
  name: string;
  location: string;
  description: string;
  design: string[];
  shopInfoDesign: ShopInfoDesignType;
  shopDetail: ShopDetailType;
  createAt: Date;
};
