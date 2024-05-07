"use client";
import Banner from "@/component/customer/shop/Banner";
import ProductList from "../../product-list/page";
import { Tabs } from "antd";
import AboutShop, { shopDetailType } from "@/component/customer/shop/AboutShop";
import Search from "antd/es/transfer/search";
import {
  WidgetType,
  WidgetCategoryType,
  CategoryPatternType,
  ProductPatternType,
  PromotionPatternType,
  BannerPatternType,
  CollectionPatternType,
} from "@/model/WidgetType";
import { useEffect, useState } from "react";
import WidgetList from "@/component/customer/shop/WidgetList";
import Collections from "@/component/customer/shop/collection/Collections";

interface ShopInfoProps {
  color: string;
  name: string;
  avatarUrl: string;
  bannerUrl: string;
}

export default function ShopPage() {
  //mock data
  const widgetList = [
    {
      _id: "collection_ID1",
      type: WidgetCategoryType.COLLECTION,
      order: 7,
      visibility: true,
      element: {
        pattern: CollectionPatternType.GRID,
        collectionIdList: [],
      },
    },
    {
      _id: "collection_ID2",
      type: WidgetCategoryType.COLLECTION,
      order: 8,
      visibility: true,
      element: {
        pattern: CollectionPatternType.CAROUSEL,
        collectionIdList: [],
      },
    },
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
  ];

  const shopInfoData = {
    color: "white",
    name: "TechZone Shop",
    avatarUrl: "",
    bannerUrl: "",
  };

  const shopDetailData = {
    cancelPercentage: 11.29,
    refundPercentage: 9.4,
    sinceYear: 2023,
    totalProductNumber: 510,
    description:
      "Mua ngay online sản phẩm của cửa hàng TechZone Trading trên TechZone.vn. ✓ chất lượng cao, uy tín, giá tốt ✓ Chính hãng ✓ Giao hàng toàn quốc",
    rating: 4.6,
    replyPercentage: 99,
    address: "4820 Hilltop Haven Drive",
  };

  //variables
  const [widgets, setWidgets] = useState<WidgetType[]>(widgetList);
  const [shopInfo, setShopInfo] = useState<ShopInfoProps>(shopInfoData);
  const [shopDetail, setShopDetail] = useState<shopDetailType>(shopDetailData);
  const [tab, setTab] = useState<string>("0");
  const [selectedCollectionId, setSelectedCollectionId] = useState("");

  const tabItems = [
    {
      label: "Cửa Hàng",
      children: (
        <div className="p-2">
          {/* pattern list here */}
          <WidgetList
            widgets={widgets}
            setCollectionId={setSelectedCollectionId}
          />
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
          {/* key = 2 */}
          <Collections selectedId={selectedCollectionId} />
        </div>
      ),
    },
    {
      label: "Hồ Sơ Cửa Hàng",
      children: (
        <div className="p-2">
          <AboutShop shopDetail={shopDetail} />
        </div>
      ),
    },
  ];

  useEffect(() => {
    setTab("2");
    window.scrollTo(0, 0);
  }, [selectedCollectionId]);

  useEffect(() => {
    setTab("0");
  }, []);

  return (
    <div className="mx-20 pb-10 h-fit">
      <section id="top-content" />
      <Banner
        color={shopInfo.color}
        name={shopInfo.name}
        avatarUrl={shopInfo.avatarUrl}
        bannerUrl={shopInfo.bannerUrl}
      />

      <Tabs
        defaultActiveKey="0"
        activeKey={tab}
        onChange={(key) => setTab(key)}
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
