"use client";
import Banner from "@/component/customer/shop/Banner";
import ProductList from "../../product-list/page";
import { ConfigProvider, Input, Skeleton, Tabs } from "antd";
import AboutShop from "@/component/customer/shop/AboutShop";
import { GoSearch } from "react-icons/go";

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
import { ShopDetailType, ShopType } from "@/model/ShopType";
import { useParams } from "next/navigation";
import { GET_GetShop } from "@/app/apis/shop/ShopAPI";
import { POST_GetWidgetList } from "@/app/apis/widget/WidgetAPI";

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
    cancelPercentage: 0,
    refundPercentage: 0,
    sinceYear: 0,
    totalProductNumber: 0,
    description: "",
    rating: 0,
    replyPercentage: 0,
    address: "",
  };

  //variables

  const [widgets, setWidgets] = useState<WidgetType[]>();
  const [shopInfo, setShopInfo] = useState<ShopInfoProps>();
  const [shopDetail, setShopDetail] = useState<ShopDetailType>(shopDetailData);
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
          {(widgets && (
            <WidgetList
              widgets={widgets}
              setCollectionId={setSelectedCollectionId}
            />
          )) || <Skeleton active style={{ margin: 10 }} />}
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
      // get widgets and update them
      handleGetWidgetList(shop.design);
    }
  }, [shop]);

  const handleGetShop = async () => {
    const response = await GET_GetShop(shopId.toString());
    if (response.status == 200) {
      // console.log(response.data);
      if (response.data) {
        setShop(response.data);
      }
    }
  };

  const handleGetWidgetList = async (ids: string[]) => {
    const response = await POST_GetWidgetList(ids);
    if (response.status == 200) {
      // console.log(response.data);
      if (response.data) {
        setWidgets(response.data);
      }
    }
  };

  return (
    <div className="mx-24 py-2 h-fit overflow-hidden">
      <section id="top-content" />
      {(shopInfo && (
        <Banner
          color={shopInfo.color}
          name={shopInfo.name}
          avatarUrl={shopInfo.avatarUrl}
          bannerUrl={shopInfo.bannerUrl}
          replyPercentage={shopDetail.replyPercentage}
        />
      )) || <Skeleton active style={{ margin: 10 }} />}

      <ConfigProvider
        theme={{
          components: {
            Tabs: {
              // inkBarColor: "#c4996c",
              // itemActiveColor: "#c4996c",
              // itemHoverColor: "#c4996c",
              // itemSelectedColor: "#c4996c",
              inkBarColor: "#5c6856",
              itemActiveColor: "#5c6856",
              itemHoverColor: "#5c6856",
              itemSelectedColor: "#5c6856",
            },
          },
        }}
      >
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
              {/* <Input
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
              /> */}

              <Input
                size="middle"
                placeholder="Tìm sản phẩm tại cửa hàng"
                suffix={<GoSearch color="#5c6856" />}
                className="rounded-full w-64 m-1 "
                // onChange={onSearch}
                value={searchText}
              />
            </div>
          }
        />{" "}
      </ConfigProvider>
    </div>
  );
}
