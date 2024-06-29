export type CategoryType = {
  _id: string;
  key: string;
  urlKey: string;
  name: string; //ex: Laptop, Màn hình máy tính, Ổ cứng
  image: string;
  subCategoryType: string[]; // objectid []
};

export type _CategoryType = {
  _id: string;
  key?: string;
  urlKey?: string;
  name: string;
  image: string;
  subCategories: _CategoryType[];
};

export type SubCategoryType = {
  _id: string;
  name: string; //ex: Laptop, Màn hình máy tính, Ổ cứng
  image: string;
  category: string;
  subCategories: SubCategoryType[];
  subCategoryType: string[]; // objectid []
};
