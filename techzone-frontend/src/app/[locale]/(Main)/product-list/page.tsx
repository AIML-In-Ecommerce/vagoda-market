"use client";
// import { ProductFilterInput } from "@/apis/product/ProductAPI";
// import ProductItemList from "@/component/customer/ProductItemList";
// import PriceFilter from "@/component/customer/filter/PriceFilter";
// import RatingFilter from "@/component/customer/filter/RatingFilter";
// import CategoryFilter from "@/component/customer/product/CategoryFilter";
// import { _ProductType } from "@/model/ProductType";
// import { CategoryService } from "@/services/Category";
// import { ProductService } from "@/services/Product";
// import { Button, Divider, TreeDataNode } from "antd";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
// import "../../globals.css";

// export interface FilterCriteria {
//   key: string;
//   value: any;
// }

// const suggestedPrices = [
//   { min: null, max: 100000 },
//   { min: 100000, max: 300000 },
//   { min: 300000, max: 500000 },
//   { min: 500000, max: 1000000 },
//   { min: 1000000, max: null },
// ];

// const products = [
//   {
//     name: "Apple iPad 10.2-inch (9th Gen) Wi-Fi, 2021",
//     imageLink:
//       "https://images.pexels.com/photos/5693891/pexels-photo-5693891.jpeg?auto=compress&cs=tinysrgb&w=600",
//     rating: 4.5,
//     soldAmount: 2690000,
//     price: 500000,
//     originalPrice: 794300,
//     flashSale: true,
//     category: "Category A",
//   },
//   {
//     name: "Apple iPad 10.9-inch (10th Gen) Wi-Fi, 2022",
//     rating: 4.0,
//     soldAmount: 1565,
//     price: 400000,
//     flashSale: false,
//     originalPrice: 5305000,
//     imageLink:
//       "https://images.pexels.com/photos/5693889/pexels-photo-5693889.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
//     category: "Category A",
//   },
//   {
//     name: "Điện Thoại POCO C65 (6GB/128GB) - Hàng Chính Hãng",
//     rating: 5.0,
//     soldAmount: 3032,
//     price: 6000000,
//     originalPrice: 6500000,
//     flashSale: true,
//     imageLink:
//       "https://images.pexels.com/photos/6186447/pexels-photo-6186447.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
//     category: "Category B",
//   },
//   {
//     name: "Apple iPad 10.2-inch (9th Gen) Wi-Fi, 2021",
//     imageLink:
//       "https://images.pexels.com/photos/3067624/pexels-photo-3067624.jpeg?auto=compress&cs=tinysrgb&w=600",
//     rating: 4.5,
//     soldAmount: 2690000,
//     price: 500000,
//     originalPrice: 794300,
//     flashSale: true,
//     category: "Category A",
//   },
//   {
//     name: "Apple iPad 10.9-inch (10th Gen) Wi-Fi, 2022",
//     rating: 4.0,
//     soldAmount: 1565,
//     price: 400000,
//     flashSale: false,
//     originalPrice: 5305000,
//     imageLink:
//       "https://images.pexels.com/photos/3119215/pexels-photo-3119215.jpeg?auto=compress&cs=tinysrgb&w=600",
//     category: "Category A",
//   },
//   {
//     name: "Điện Thoại POCO C65 (6GB/128GB) - Hàng Chính Hãng",
//     rating: 5.0,
//     soldAmount: 3032,
//     price: 6000000,
//     originalPrice: 6500000,
//     flashSale: true,
//     imageLink:
//       "https://images.pexels.com/photos/14706202/pexels-photo-14706202.jpeg?auto=compress&cs=tinysrgb&w=600",
//     category: "Category B",
//   },
//   {
//     name: "Apple iPad 10.2-inch (9th Gen) Wi-Fi, 2021",
//     imageLink:
//       "https://images.pexels.com/photos/18533668/pexels-photo-18533668/free-photo-of-jeans-camera-sunglasses-and-shoes.jpeg?auto=compress&cs=tinysrgb&w=600",
//     rating: 4.5,
//     soldAmount: 2690000,
//     price: 500000,
//     originalPrice: 794300,
//     flashSale: true,
//     category: "Category A",
//   },
//   {
//     name: "Apple iPad 10.9-inch (10th Gen) Wi-Fi, 2022",
//     rating: 4.0,
//     soldAmount: 1565,
//     price: 400000,
//     flashSale: false,
//     originalPrice: 5305000,
//     imageLink:
//       "https://salt.tikicdn.com/cache/750x750/ts/product/ba/76/5b/3a6f121cb64e208aa6b2934454fa8fed.png.webp",
//     category: "Category A",
//   },
//   {
//     name: "Điện Thoại POCO C65 (6GB/128GB) - Hàng Chính Hãng",
//     rating: 5.0,
//     soldAmount: 3032,
//     price: 6000000,
//     originalPrice: 6500000,
//     flashSale: true,
//     imageLink:
//       "https://salt.tikicdn.com/cache/750x750/ts/product/38/06/c3/01d16bdaf31be91903e7911595b6ee31.jpg.webp",
//     category: "Category B",
//   },
//   {
//     name: "Apple iPad 10.2-inch (9th Gen) Wi-Fi, 2021",
//     imageLink:
//       "https://ipoint.ae/cdn/shop/products/MacBook-A1708-1_68d90d77-c563-4afe-9359-cf9872da1cc3.jpg?v=1670855829",
//     rating: 4.5,
//     soldAmount: 2690000,
//     price: 500000,
//     originalPrice: 794300,
//     flashSale: true,
//     category: "Category A",
//   },
//   {
//     name: "Apple iPad 10.9-inch (10th Gen) Wi-Fi, 2022",
//     rating: 4.0,
//     soldAmount: 1565,
//     price: 400000,
//     flashSale: false,
//     originalPrice: 5305000,
//     imageLink:
//       "https://salt.tikicdn.com/cache/750x750/ts/product/ba/76/5b/3a6f121cb64e208aa6b2934454fa8fed.png.webp",
//     category: "Category A",
//   },
//   {
//     name: "Điện Thoại POCO C65 (6GB/128GB) - Hàng Chính Hãng",
//     rating: 5.0,
//     soldAmount: 3032,
//     price: 6000000,
//     originalPrice: 6500000,
//     flashSale: true,
//     imageLink:
//       "https://salt.tikicdn.com/cache/750x750/ts/product/38/06/c3/01d16bdaf31be91903e7911595b6ee31.jpg.webp",
//     category: "Category B",
//   },
// ];

// export default function ProductList() {
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
//   const [totalProduct, setTotalProduct] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);
//   const [isFilterOpened, setIsFilterOpened] = useState(false);
//   const [allProducts, setAllProducts] = useState<_ProductType[]>([]);
//   const router = useRouter();
//   const query = useSearchParams();
//   const [filterCriterias, setFilterCriterias] = useState<FilterCriteria[]>([]);
//   const [filter, setFilter] = useState<ProductFilterInput>();
//   const [allCategories, setAllCategories] = useState<TreeDataNode[]>([]);

//   const clearAllFilterCriterias = () => {
//     const keyword = query.get("keyword") || undefined;
//     router.push(`/product-list${keyword ? `?keyword=${keyword}` : ""}`);
//     setFilterCriterias([]);
//     setFilter({ keyword });
//   };

//   const addFilterCriteria = (key: string, value: any) => {
//     const updatedFilterCriterias = [...filterCriterias];

//     const existingCriteriaIndex = updatedFilterCriterias.findIndex(
//       (criteria) => criteria.key === key
//     );

//     if (existingCriteriaIndex !== -1) {
//       updatedFilterCriterias[existingCriteriaIndex].value = value;
//     } else {
//       const newFilterCriteria: FilterCriteria = { key, value };
//       updatedFilterCriterias.push(newFilterCriteria);
//     }

//     setFilterCriterias(updatedFilterCriterias);
//   };

//   const updateURL = (key: string, value: any) => {
//     const updatedQuery = new URLSearchParams(query.toString());
//     if (key == "category") {
//       switch (value.level) {
//         case 1:
//           const categoryValues = query.get("category")
//             ? decodeURIComponent(query.get("category")!)!.split(",")
//             : undefined;
//           if (categoryValues) {
//             const updatedCategoryValues = categoryValues.filter(
//               (item) => item != value.id
//             );
//             if (updatedCategoryValues.length > 0) {
//               updatedQuery.set(
//                 "category",
//                 encodeURIComponent(updatedCategoryValues.join(","))
//               );
//             } else {
//               updatedQuery.delete(key);
//             }
//           }
//           break;
//         case 2:
//           const subCategoryValues = query.get("subCategory")
//             ? decodeURIComponent(query.get("subCategory")!)!.split(",")
//             : undefined;
//           if (subCategoryValues) {
//             const updatedSubCategoryValues = subCategoryValues.filter(
//               (item) => item != value.id
//             );

//             if (updatedSubCategoryValues.length > 0) {
//               updatedQuery.set(
//                 "subCategory",
//                 encodeURIComponent(updatedSubCategoryValues.join(","))
//               );
//             } else {
//               updatedQuery.delete("subCategory");
//             }
//           }
//           break;
//         case 3:
//           const subCategoryTypeValues = query.get("subCategoryType")
//             ? decodeURIComponent(query.get("subCategoryType")!)!.split(",")
//             : undefined;
//           if (subCategoryTypeValues) {
//             const updatedSubCategoryTypeValues = subCategoryTypeValues.filter(
//               (item) => item != value.id
//             );

//             if (updatedSubCategoryTypeValues.length > 0) {
//               updatedQuery.set(
//                 "subCategoryType",
//                 encodeURIComponent(updatedSubCategoryTypeValues.join(","))
//               );
//             } else {
//               updatedQuery.delete("subCategoryType");
//             }
//           }
//           break;
//         default:
//           const defaultCategoryValues = query.get("category")
//             ? decodeURIComponent(query.get("category")!)!.split(",")
//             : undefined;
//           if (defaultCategoryValues) {
//             const updatedDefaultCategoryValues = defaultCategoryValues.filter(
//               (item) => item != value.id
//             );
//             if (updatedDefaultCategoryValues.length > 0) {
//               updatedQuery.set(
//                 "category",
//                 encodeURIComponent(updatedDefaultCategoryValues.join(","))
//               );
//             } else {
//               updatedQuery.delete(key);
//             }
//           }
//           break;
//       }
//     } else if (key === "price") {
//       updatedQuery.delete("maxPrice");
//       updatedQuery.delete("minPrice");
//     } else {
//       updatedQuery.delete(key);
//     }

//     window.history.pushState(
//       {},
//       "",
//       `${window.location.pathname}?${updatedQuery.toString()}`
//     );
//   };

//   const removeFilterCriteria = (key: string, value: any) => {
//     let updatedFilterCriterias: FilterCriteria[] = [...filterCriterias];

//     if (
//       key === "category" ||
//       key === "subCategory" ||
//       key === "subCategoryType"
//     ) {
//       const criteriaIndex = updatedFilterCriterias.findIndex(
//         (criteria) => criteria.key === key
//       );

//       if (criteriaIndex !== -1) {
//         setSelectedCategories((prev) =>
//           prev.filter((item) => item != value.id)
//         );

//         const updatedCategory = updatedFilterCriterias[criteriaIndex].value;

//         const newValues = updatedCategory.filter(
//           (item: any) => item.id !== value.id
//         );

//         if (newValues.length > 0) {
//           updatedFilterCriterias[criteriaIndex] = {
//             ...updatedFilterCriterias[criteriaIndex],
//             value: newValues,
//           };
//         } else {
//           updatedFilterCriterias = updatedFilterCriterias.filter(
//             (_, index) => index !== criteriaIndex
//           );
//         }
//       }
//     } else {
//       updatedFilterCriterias = updatedFilterCriterias.filter(
//         (criteria) => criteria.key !== key
//       );
//     }

//     updateURL(key, value);
//     setFilterCriterias(updatedFilterCriterias);
//   };
//   const handleFilterChange = async () => {
//     const updatedFilterCriterias: FilterCriteria[] = [];

//     if (filters.minPrice || filters.maxPrice) {
//       updatedFilterCriterias.push({
//         key: "price",
//         value: {
//           min: filters.minPrice ? filters.minPrice : null,
//           max: filters.maxPrice ? filters.maxPrice : null,
//         },
//       });
//     }

//     const categoryPromises: Promise<{
//       id: string;
//       name: string;
//       level: number;
//     }>[] = [];

//     if (filters.category) {
//       filters.category.forEach((id) => {
//         categoryPromises.push(
//           CategoryService.getCategoryById(id).then((categoryInfo) => ({
//             id,
//             name: categoryInfo.name,
//             level: 1,
//           }))
//         );
//       });
//     }

//     if (filters.subCategory) {
//       filters.subCategory.forEach((id) => {
//         categoryPromises.push(
//           CategoryService.getSubCategoryById(id).then((categoryInfo) => ({
//             id,
//             name: categoryInfo.name,
//             level: 2,
//           }))
//         );
//       });
//     }

//     if (filters.subCategoryType) {
//       filters.subCategoryType.forEach((id) => {
//         categoryPromises.push(
//           CategoryService.getSubCategoryTypeById(id).then((categoryInfo) => ({
//             id,
//             name: categoryInfo.name,
//             level: 3,
//           }))
//         );
//       });
//     }

//     const categories = await Promise.all(categoryPromises);

//     if (categories.length > 0) {
//       updatedFilterCriterias.push({
//         key: "category",
//         value: categories,
//       });
//       const categoryIds = categories.map((category) => category.id);
//       setSelectedCategories(categoryIds);
//     }

//     if (filters.avgRating) {
//       updatedFilterCriterias.push({
//         key: "rating",
//         value: `${filters.avgRating} sao`,
//       });
//     }

//     setFilterCriterias(updatedFilterCriterias);
//   };

//   const filters: ProductFilterInput = {
//     keyword: query.get("keyword") || undefined,
//     shopId: query.get("shopId") || undefined,
//     minPrice: query.get("minPrice") ? Number(query.get("minPrice")) : undefined,
//     maxPrice: query.get("maxPrice") ? Number(query.get("maxPrice")) : undefined,
//     category: query.get("category")
//       ? decodeURIComponent(query.get("category")!)!.split(",")
//       : undefined,
//     subCategory: query.get("subCategory")
//       ? decodeURIComponent(query.get("subCategory")!)!.split(",")
//       : undefined,
//     subCategoryType: query.get("subCategoryType")
//       ? decodeURIComponent(query.get("subCategoryType")!)!.split(",")
//       : undefined,
//     avgRating: query.get("rating") ? Number(query.get("rating")) : undefined,
//     sortBy: query.get("sortBy") || undefined,
//     index: query.get("index") ? Number(query.get("index")) : undefined,
//     amount: query.get("amount") ? Number(query.get("amount")) : undefined,
//   };

//   useEffect(() => {
//     setFilter(filters);
//   }, [query]);

//   useEffect(() => {
//     handleFilterChange();
//   }, []);

//   useEffect(() => {
//     const loadFilteredProducts = async () => {
//       if (filter) {
//         const response: {
//           total: number;
//           totalPages: number;
//           products: _ProductType[];
//         } = await ProductService.getProductByFilter(filter);
//         setAllProducts(response.products);
//         setTotalProduct(response.total);
//         setTotalPages(response.totalPages);
//       }
//     };

//     loadFilteredProducts();
//   }, [filter]);

//   return (
//     <div className="flex ">
//       {/* Filter section */}
//       {isFilterOpened && (
//         <div className="md:w-1/5 p-4 border-r sm:w-1/2  min-w-[20%]">
//           <div className=" flex mx-auto items-center space-x-2 mb-4">
//             {" "}
//             <HiOutlineAdjustmentsHorizontal size={25} color="black" />
//             <h2 className="text-md font-bold ">Bộ lọc</h2>
//           </div>
//           <Button
//             danger
//             className="flex mx-auto justify-center w-full mb-2 text-xs items-center"
//             onClick={() => clearAllFilterCriterias()}
//           >
//             Clear all
//           </Button>

//           <PriceFilter
//             selectedPriceRange={
//               filterCriterias.find((item) => item.key === "price")?.value
//             }
//             suggestedPrices={suggestedPrices}
//             addFilter={addFilterCriteria}
//             removeFilter={removeFilterCriteria}
//             isFiltered={filterCriterias.some(
//               (criteria) => criteria.key === "price"
//             )}
//           />
//           <Divider className="mx-2" />
//           <RatingFilter
//             selectedValue={filter?.avgRating ? filter.avgRating : 0}
//             addFilter={addFilterCriteria}
//             removeFilter={removeFilterCriteria}
//             isFiltered={filterCriterias.some(
//               (criteria) => criteria.key === "rating"
//             )}
//           />
//           <Divider className="mx-2" />

//           <h3 className="font-semibold my-4 text-sm">Danh mục sản phẩm</h3>
//           <CategoryFilter
//             selectedCategories={selectedCategories}
//             setSelectedCategories={setSelectedCategories}
//             addFilter={addFilterCriteria}
//             removeFilter={removeFilterCriteria}
//             isFiltered={filterCriterias.some(
//               (criteria) => criteria.key === "category"
//             )}
//           />
//         </div>
//       )}
//       <div
//         className={`${isFilterOpened ? "sm:w-1/2 md:w-3/4" : "w-full"} ml-2`}
//       >
//         <ProductItemList
//           isFilterOpened={isFilterOpened}
//           setIsFilterOpened={setIsFilterOpened}
//           filterList={filterCriterias}
//           products={allProducts}
//           removeFilter={removeFilterCriteria}
//           total={totalProduct}
//           totalPages={totalPages}
//         />
//       </div>
//     </div>
//   );
// }

import ShopProductList from "@/component/customer/shop/ShopProductList";
import { ReactElement } from "react";
import { notification } from "antd";
import type { NotificationArgsProps } from "antd";

type NotificationPlacement = NotificationArgsProps["placement"];
export default function ProductList() {
  const [api, contextHolder] = notification.useNotification();

  const placement: NotificationPlacement = "topRight"; //topLeft, bottomRight, bottomLeft
  const openNotification = (title: string, content: ReactElement) => {
    api.info({
      message: `${title}`,
      description: content,
      placement,
    });
  };

  return (
    <div>
      {contextHolder}
      <ShopProductList notify={openNotification} />
    </div>
  );
}
