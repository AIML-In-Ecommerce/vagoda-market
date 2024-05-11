"use client";
import ProductItemList from "@/component/customer/ProductItemList";
import PriceFilter from "@/component/customer/filter/PriceFilter";
import RatingFilter from "@/component/customer/filter/RatingFilter";
import CategoryFilter from "@/component/customer/product/CategoryFilter";
import { Button, Divider } from "antd";
import { useState } from "react";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import "../../globals.css";

export interface FilterCriteria {
  key: string;
  value: any;
}

const products = [
  {
    name: "Apple iPad 10.2-inch (9th Gen) Wi-Fi, 2021",
    imageLink:
      "https://images.pexels.com/photos/5693891/pexels-photo-5693891.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4.5,
    soldAmount: 2690000,
    price: 500000,
    originalPrice: 794300,
    flashSale: true,
    category: "Category A",
  },
  {
    name: "Apple iPad 10.9-inch (10th Gen) Wi-Fi, 2022",
    rating: 4.0,
    soldAmount: 1565,
    price: 400000,
    flashSale: false,
    originalPrice: 5305000,
    imageLink:
      "https://images.pexels.com/photos/5693889/pexels-photo-5693889.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    category: "Category A",
  },
  {
    name: "Điện Thoại POCO C65 (6GB/128GB) - Hàng Chính Hãng",
    rating: 5.0,
    soldAmount: 3032,
    price: 6000000,
    originalPrice: 6500000,
    flashSale: true,
    imageLink:
      "https://images.pexels.com/photos/6186447/pexels-photo-6186447.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    category: "Category B",
  },
  {
    name: "Apple iPad 10.2-inch (9th Gen) Wi-Fi, 2021",
    imageLink:
      "https://images.pexels.com/photos/3067624/pexels-photo-3067624.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4.5,
    soldAmount: 2690000,
    price: 500000,
    originalPrice: 794300,
    flashSale: true,
    category: "Category A",
  },
  {
    name: "Apple iPad 10.9-inch (10th Gen) Wi-Fi, 2022",
    rating: 4.0,
    soldAmount: 1565,
    price: 400000,
    flashSale: false,
    originalPrice: 5305000,
    imageLink:
      "https://images.pexels.com/photos/3119215/pexels-photo-3119215.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Category A",
  },
  {
    name: "Điện Thoại POCO C65 (6GB/128GB) - Hàng Chính Hãng",
    rating: 5.0,
    soldAmount: 3032,
    price: 6000000,
    originalPrice: 6500000,
    flashSale: true,
    imageLink:
      "https://images.pexels.com/photos/14706202/pexels-photo-14706202.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Category B",
  },
  {
    name: "Apple iPad 10.2-inch (9th Gen) Wi-Fi, 2021",
    imageLink:
      "https://images.pexels.com/photos/18533668/pexels-photo-18533668/free-photo-of-jeans-camera-sunglasses-and-shoes.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4.5,
    soldAmount: 2690000,
    price: 500000,
    originalPrice: 794300,
    flashSale: true,
    category: "Category A",
  },
  {
    name: "Apple iPad 10.9-inch (10th Gen) Wi-Fi, 2022",
    rating: 4.0,
    soldAmount: 1565,
    price: 400000,
    flashSale: false,
    originalPrice: 5305000,
    imageLink:
      "https://salt.tikicdn.com/cache/750x750/ts/product/ba/76/5b/3a6f121cb64e208aa6b2934454fa8fed.png.webp",
    category: "Category A",
  },
  {
    name: "Điện Thoại POCO C65 (6GB/128GB) - Hàng Chính Hãng",
    rating: 5.0,
    soldAmount: 3032,
    price: 6000000,
    originalPrice: 6500000,
    flashSale: true,
    imageLink:
      "https://salt.tikicdn.com/cache/750x750/ts/product/38/06/c3/01d16bdaf31be91903e7911595b6ee31.jpg.webp",
    category: "Category B",
  },
  {
    name: "Apple iPad 10.2-inch (9th Gen) Wi-Fi, 2021",
    imageLink:
      "https://ipoint.ae/cdn/shop/products/MacBook-A1708-1_68d90d77-c563-4afe-9359-cf9872da1cc3.jpg?v=1670855829",
    rating: 4.5,
    soldAmount: 2690000,
    price: 500000,
    originalPrice: 794300,
    flashSale: true,
    category: "Category A",
  },
  {
    name: "Apple iPad 10.9-inch (10th Gen) Wi-Fi, 2022",
    rating: 4.0,
    soldAmount: 1565,
    price: 400000,
    flashSale: false,
    originalPrice: 5305000,
    imageLink:
      "https://salt.tikicdn.com/cache/750x750/ts/product/ba/76/5b/3a6f121cb64e208aa6b2934454fa8fed.png.webp",
    category: "Category A",
  },
  {
    name: "Điện Thoại POCO C65 (6GB/128GB) - Hàng Chính Hãng",
    rating: 5.0,
    soldAmount: 3032,
    price: 6000000,
    originalPrice: 6500000,
    flashSale: true,
    imageLink:
      "https://salt.tikicdn.com/cache/750x750/ts/product/38/06/c3/01d16bdaf31be91903e7911595b6ee31.jpg.webp",
    category: "Category B",
  },
];

export default function ProductList() {
  const filterList = ["Dưới 1.000.000", "5 sao", "Laptop", "Màn hình máy tính"];
  const [filterCriterias, setFilterCriterias] = useState<FilterCriteria[]>([]);
  const [isFilterOpened, setIsFilterOpened] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [displayProduct, setDisplayProduct] = useState([]);

  const categories = [
    "Laptop",
    "Điện máy - Điện gia dụng",
    "PC- Máy tính bộ",
    "Màn hình máy tính",
    "Linh kiện máy tính",
    "Phụ kiện máy tính",
    "Game & Stream",
    "Điện thoại & Phụ kiện",
    "Phụ kiện",
    "Thiết bị âm thanh",
    "Thiết bị văn phòng",
    "Khác",
  ];

  const suggestedPrices = [
    { min: null, max: 100000 },
    { min: 100000, max: 300000 },
    { min: 300000, max: 500000 },
    { min: 500000, max: 1000000 },
    { min: 1000000, max: 3000000 },
    { min: 3000000, max: 5000000 },
    { min: 5000000, max: null },
  ];

  const addFilterCriteria = (key: string, value: any) => {
    const updatedFilterCriterias = [...filterCriterias];

    const existingCriteriaIndex = updatedFilterCriterias.findIndex(
      (criteria) => criteria.key === key
    );

    if (existingCriteriaIndex !== -1) {
      updatedFilterCriterias[existingCriteriaIndex].value = value;
    } else {
      const newFilterCriteria: FilterCriteria = { key, value };
      updatedFilterCriterias.push(newFilterCriteria);
    }

    setFilterCriterias(updatedFilterCriterias);
    console.log(filterCriterias);
  };

  const removeFilterCriteria = (key: string, value: any) => {
    let updatedFilterCriterias: FilterCriteria[] = [...filterCriterias];

    updatedFilterCriterias = updatedFilterCriterias.filter(
      (criteria) => criteria.key !== key
    );

    setFilterCriterias(updatedFilterCriterias);
    console.log(updatedFilterCriterias);
  };

  const clearAllFilterCriterias = () => {
    setFilterCriterias([]);
  };

  // useEffect(() => {
  //       const filterProducts = () => {
  //     // Lọc sản phẩm dựa trên filterCriterias
  //     const filteredProducts = products.filter((product) => {
  //       // Lấy danh sách các key đã được lọc
  //       const filterKeys = filterCriterias.map((criteria) => criteria.key);

  //       // Kiểm tra xem sản phẩm có chứa tất cả các tiêu chí lọc không
  //       return filterKeys.every((key) => {
  //         // Nếu key không tồn tại trong filterCriterias thì sản phẩm đó không cần lọc
  //         if (!filterCriterias.find((criteria) => criteria.key === key)) {
  //           return true;
  //         }

  //         // Lấy giá trị cần so sánh
  //         const valueToCompare = product[key];

  //         // So sánh giá trị của sản phẩm với giá trị lọc
  //         return filterCriterias.some((criteria) => {
  //           if (criteria.key === key) {
  //             // Thực hiện so sánh giá trị của sản phẩm với giá trị lọc
  //             // Ở đây mình giả sử chỉ có hai trường hợp là string hoặc number, bạn có thể điều chỉnh cho phù hợp với dữ liệu thực tế
  //             if (typeof valueToCompare === 'string') {
  //               // So sánh chuỗi
  //               return valueToCompare.includes(criteria.value);
  //             } else if (typeof valueToCompare === 'number') {
  //               // So sánh số
  //               return valueToCompare === criteria.value;
  //             }
  //           }
  //           return false;
  //         });
  //       });
  //     });

  //     // Cập nhật danh sách sản phẩm hiển thị
  //     setDisplayedProducts(filteredProducts);
  //   };
  //   console.log("FILTER", filterCriterias);
  // }, [filterCriterias]);

  // useEffect(() => {
  //   // Hàm lọc sản phẩm dựa trên các tiêu chí lọc
  //   const filterProducts = () => {
  //     // Lọc sản phẩm dựa trên filterCriterias
  //     const filteredProducts = products.filter((product) => {
  //       // Lấy danh sách các key đã được lọc
  //       const filterKeys = filterCriterias.map((criteria) => criteria.key);

  //       // Kiểm tra xem sản phẩm có chứa tất cả các tiêu chí lọc không
  //       return filterKeys.every((key) => {
  //         // Nếu key không tồn tại trong filterCriterias thì sản phẩm đó không cần lọc
  //         if (!filterCriterias.find((criteria) => criteria.key === key)) {
  //           return true;
  //         }

  //         // Lấy giá trị cần so sánh
  //         const valueToCompare = product[key];

  //         // So sánh giá trị của sản phẩm với giá trị lọc
  //         return filterCriterias.some((criteria) => {
  //           if (criteria.key === key) {
  //             // Thực hiện so sánh giá trị của sản phẩm với giá trị lọc
  //             // Ở đây mình giả sử chỉ có hai trường hợp là string hoặc number, bạn có thể điều chỉnh cho phù hợp với dữ liệu thực tế
  //             if (typeof valueToCompare === 'string') {
  //               // So sánh chuỗi
  //               return valueToCompare.includes(criteria.value);
  //             } else if (typeof valueToCompare === 'number') {
  //               // So sánh số
  //               return valueToCompare === criteria.value;
  //             }
  //           }
  //           return false;
  //         });
  //       });
  //     });

  //     // Cập nhật danh sách sản phẩm hiển thị
  //     setDisplayedProducts(filteredProducts);
  //   };

  //   // Gọi hàm lọc sản phẩm khi filterCriterias thay đổi
  //   filterProducts();
  // }, [filterCriterias, products]); // Thêm products vào dependencies để khi products thay đổi, danh sách sản phẩm cũng được lọc lại

  return (
    <div className="flex">
      {/* Filter section */}
      {isFilterOpened && (
        <div className="md:w-1/4 p-4 border-r sm:w-1/2  min-w-[20%]">
          <div className=" flex justify-center mx-auto items-center space-x-2 mb-4">
            {" "}
            <HiOutlineAdjustmentsHorizontal size={25} color="black" />
            <h2 className="text-xl font-bold ">Bộ lọc</h2>
          </div>
          <Button
            danger
            className="flex mx-auto justify-center w-full mb-2"
            onClick={() => clearAllFilterCriterias()}
          >
            Clear all
          </Button>

          <PriceFilter
            suggestedPrices={suggestedPrices}
            addFilter={addFilterCriteria}
            removeFilter={removeFilterCriteria}
            isFiltered={filterCriterias.some(
              (criteria) => criteria.key === "price"
            )}
          />
          <Divider className="mx-2" />
          <RatingFilter
            addFilter={addFilterCriteria}
            removeFilter={removeFilterCriteria}
            isFiltered={filterCriterias.some(
              (criteria) => criteria.key === "rating"
            )}
          />
          <Divider className="mx-2" />
          {/* <CheckboxFilter
            filterCriteria="Danh mục sản phẩm"
            addFilter={addFilterCriteria}
            removeFilter={removeFilterCriteria}
            options={categories}
            isFiltered={filterCriterias.some(
              (criteria) => criteria.key === "category"
            )}
          /> */}
          <h3 className="font-semibold my-4">Danh mục sản phẩm</h3>
          <CategoryFilter />
        </div>
      )}
      <div
        className={`${isFilterOpened ? "sm:w-1/2 md:w-3/4" : "w-full"} ml-2`}
      >
        <ProductItemList
          isFilterOpened={isFilterOpened}
          setIsFilterOpened={setIsFilterOpened}
          filterList={filterCriterias}
          products={products}
          removeFilter={removeFilterCriteria}
        />
      </div>
    </div>
  );
}
