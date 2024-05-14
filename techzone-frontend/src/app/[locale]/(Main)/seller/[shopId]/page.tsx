"use client";
import Banner from "@/component/customer/shop/Banner";
import ProductList from "../../product-list/page";
import { Input, Skeleton, Tabs } from "antd";
import AboutShop, { shopDetailType } from "@/component/customer/shop/AboutShop";
const { Search } = Input;

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
import { SearchProps } from "antd/es/input";
import { ShopType } from "@/model/ShopType";
import { useParams } from "next/navigation";
import { GET_GetShop } from "@/app/apis/shop/ShopAPI";

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
  const [shopInfo, setShopInfo] = useState<ShopInfoProps>();
  const [shopDetail, setShopDetail] = useState<shopDetailType>(shopDetailData);
  const [tab, setTab] = useState<string>("0");
  const [selectedCollectionId, setSelectedCollectionId] = useState("");

  const { shopId } = useParams();
  const [shop, setShop] = useState<ShopType>();

  // TODO
  const [searchText, setSearchText] = useState("");

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

          {/* // TODO: Filter menu items based on search text
            // .filter((item) =>
            //   item.name.toLowerCase().includes(searchText.toLowerCase())
            // ) */}

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

  // functions

  // TODO: wip
  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    console.log(info?.source, value);

    setSearchText(value);
  };

  // call api
  useEffect(() => {
    handleGetShop();
  }, []);

  useEffect(() => {
    if (!shop) return;
    if (shop.shopInfoDesign) {
      setShopInfo({
        color: shop.shopInfoDesign.color,
        name: shop.name,
        avatarUrl: shop.shopInfoDesign.name,
        bannerUrl: shop.shopInfoDesign.bannerUrl,
      });
    } else
      setShopInfo({
        color: "white",
        name: shop.name,
        avatarUrl: "",
        bannerUrl: "",
      });

    if (shop.shopDetail) {
      setShopDetail({
        cancelPercentage: shop.shopDetail.cancelPercentage,
        refundPercentage: shop.shopDetail.refundPercentage,
        sinceYear: shop.shopDetail.sinceYear,
        totalProductNumber: shop.shopDetail.totalProductNumber,
        description: shop.description,
        rating: shop.shopDetail.rating,
        replyPercentage: shop.shopDetail.replyPercentage,
        address: shop.location,
      });
    }

    if (shop.design && shop.design.length > 0) {
      // TODO: get widgets and update them
    }
  }, [shop]);

  const handleGetShop = async () => {
    const response = await GET_GetShop(shopId.toString());
    if (response.status == 200) {
      // console.log(response.data);

      let data = response.data as ShopType;
      if (data) {
        setShop(data);
      }
    }
  };

  return (
    <div className="mx-20 pb-10 h-fit overflow-hidden">
      <section id="top-content" />
      {(shopInfo && (
        <Banner
          color={shopInfo.color}
          name={shopInfo.name}
          avatarUrl={shopInfo.avatarUrl}
          bannerUrl={shopInfo.bannerUrl}
        />
      )) || <Skeleton active style={{ margin: 10 }} />}

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
        tabBarExtraContent={
          <div onClick={() => setTab("1")}>
            <Search
              size="large"
              style={{
                background: "gray",
                borderRadius: "10px",
                width: 280,
                fontSize: "8px",
              }}
              placeholder="Tìm sản phẩm tại cửa hàng"
              onSearch={onSearch}
              enterButton
              className="text-xs"
            />
          </div>
        }
      />
    </div>
  );
}
