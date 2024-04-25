"use client";
import Banner from "@/component/customer/shop/Banner";
import ProductList from "../../product-list/page";
import { Tabs } from "antd";
import AboutShop from "@/component/customer/shop/AboutShop";
import Search from "antd/es/transfer/search";
import {
  WidgetType,
  WidgetCategoryType,
  CategoryPatternType,
  ProductPatternType,
  PromotionPatternType,
  BannerPatternType,
} from "@/model/WidgetType";
import { useState } from "react";
import WidgetList from "@/component/customer/shop/WidgetList";

export default function ShopPage() {
  const [widgets, setWidgets] = useState<WidgetType[]>([
    {
      _id: "category_ID",
      type: WidgetCategoryType.CATEGORY,
      order: 1,
      visibility: false,
      element: {
        pattern: CategoryPatternType.GRID,
        title: "Danh mục nổi bật",
        categoryIdList: [],
      },
    },
    {
      _id: "product_ID",
      type: WidgetCategoryType.PRODUCT,
      order: 2,
      visibility: true,
      element: {
        pattern: ProductPatternType.GRID,
        title: "Sản phẩm mới",
        collectionId: "",
      },
    },
    {
      _id: "product_ID2",
      type: WidgetCategoryType.PRODUCT,
      order: 4,
      visibility: true,
      element: {
        pattern: ProductPatternType.CAROUSEL,
        title: "Sản phẩm giá hời",
        collectionId: "",
      },
    },
    {
      _id: "product_ID3",
      type: WidgetCategoryType.PRODUCT,
      order: 5,
      visibility: true,
      element: {
        pattern: ProductPatternType.GRID,
        title: "Sản phẩm nổi bật",
        collectionId: "",
      },
    },
    {
      _id: "product_ID4",
      type: WidgetCategoryType.PRODUCT,
      order: 6,
      visibility: true,
      element: {
        pattern: ProductPatternType.CAROUSEL,
        title: "Sản phẩm cho bạn",
        collectionId: "",
      },
    },
    {
      _id: "promotion_ID",
      type: WidgetCategoryType.PROMOTION,
      order: 3,
      visibility: false,
      element: {
        pattern: PromotionPatternType.GRID,
        title: "Voucher trao tay",
        promotionIdList: [],
      },
    },
    {
      _id: "banner_ID",
      type: WidgetCategoryType.BANNER,
      order: 0,
      visibility: true,
      element: {
        pattern: BannerPatternType.CAROUSEL,
        images: [],
      },
    },
  ]);

  const tabItems = [
    {
      label: "Cửa Hàng",
      children: (
        <div className="p-2">
          {/* pattern list here */}
          <WidgetList widgets={widgets} />
        </div>
      ),
    },
    {
      label: "Tất Cả Sản Phẩm",
      children: (
        <div className="p-2">
          {/* temp */}
          <ProductList />
        </div>
      ),
    },
    {
      label: "Bộ Sưu Tập",
      children: (
        <div className="p-2">
          {/* temp */}
          <ProductList />
        </div>
      ),
    },
    {
      label: "Hồ Sơ Cửa Hàng",
      children: (
        <div className="p-2">
          <AboutShop />
        </div>
      ),
    },
  ];

  const shopInfo = { color: "white", name: "TechZone Shop", avatarUrl: "" };

  return (
    <div className="mx-20 pb-10 h-fit">
      <Banner
        color={shopInfo.color}
        name={shopInfo.name}
        avatarUrl={shopInfo.avatarUrl}
      />

      <Tabs
        defaultActiveKey="0"
        size="middle"
        style={{ marginLeft: 10, marginRight: 10, marginTop: 10 }}
        items={tabItems.map((item, i) => {
          return {
            label: item.label,
            key: i.toString(),
            children: item.children,
          };
        })}
        tabBarExtraContent={<Search placeholder="Tìm tại cửa hàng" />}
      />
    </div>
  );
}
