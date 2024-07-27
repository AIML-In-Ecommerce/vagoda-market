"use client";
import Banner from "@/component/customer/shop/Banner";
import {
  ConfigProvider,
  Input,
  notification,
  NotificationArgsProps,
  Skeleton,
  Tabs,
} from "antd";
import AboutShop from "@/component/customer/shop/AboutShop";
import { GoSearch } from "react-icons/go";

import { WidgetType } from "@/model/WidgetType";
import { ReactElement, useEffect, useState } from "react";
import WidgetList from "@/component/customer/shop/WidgetList";
import Collections from "@/component/customer/shop/collection/Collections";
import { ShopDetailType, ShopType } from "@/model/ShopType";
import { useParams, useRouter } from "next/navigation";
import { GET_GetShop } from "@/apis/shop/ShopAPI";
import { POST_GetWidgetList } from "@/apis/widget/WidgetAPI";
import ShopProductList from "@/component/customer/shop/ShopProductList";

interface ShopInfoProps {
  color: string;
  name: string;
  avatarUrl: string;
  bannerUrl: string;
}

type NotificationPlacement = NotificationArgsProps["placement"];

export default function ShopPage() {
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
  const [api, contextHolder] = notification.useNotification();

  const placement: NotificationPlacement = "topRight"; //topLeft, bottomRight, bottomLeft
  const openNotification = (title: string, content: ReactElement) => {
    api.info({
      message: `${title}`,
      description: content,
      placement,
    });
  };

  const [widgets, setWidgets] = useState<WidgetType[]>();
  const [shopInfo, setShopInfo] = useState<ShopInfoProps>();
  const [shopDetail, setShopDetail] = useState<ShopDetailType>(shopDetailData);
  const [tab, setTab] = useState<string>("0");
  const [selectedCollectionId, setSelectedCollectionId] = useState("");

  const { shopId } = useParams();
  const [shop, setShop] = useState<ShopType>();

  const router = useRouter();
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
              setTab1={() => setTab("1")}
              notify={openNotification}
            />
          )) || <Skeleton active style={{ margin: 10 }} />}
        </div>
      ),
    },
    {
      label: "Tất Cả Sản Phẩm",
      children: (
        <div className="p-2">
          {/* Filter product items based on search text */}
          <ShopProductList
            shopId={shopId.toString()}
            keyword={searchText}
            notify={openNotification}
          />
        </div>
      ),
    },
    {
      label: "Bộ Sưu Tập",
      children: (
        <div className="p-2">
          {/* key = 2 */}
          <Collections
            selectedId={selectedCollectionId}
            notify={openNotification}
          />
        </div>
      ),
    },
    {
      label: "Hồ Sơ Cửa Hàng",
      children: (
        <div className="p-2">
          <AboutShop shopDetail={shopDetail} notify={openNotification} />
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
  const handleChange = (e: any) => {
    setSearchText(e.target.value);
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
        avatarUrl: shop.shopInfoDesign.avatarUrl,
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

    if (shop.design) {
      if (shop.design.length > 0)
        // get widgets and update them
        handleGetWidgetList(shop.design);
      else setWidgets([]);
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
    <div className="mx-2 lg:mx-24 py-2 h-fit overflow-hidden">
      <section id="top-content" />
      {contextHolder}

      {(shopInfo && (
        <Banner
          color={shopInfo.color}
          name={shopInfo.name}
          avatarUrl={shopInfo.avatarUrl}
          bannerUrl={shopInfo.bannerUrl}
          replyPercentage={shopDetail.replyPercentage}
          rating={shopDetail.rating}
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
              <Input
                size="middle"
                placeholder="Tìm sản phẩm tại cửa hàng"
                suffix={<GoSearch color="#5c6856" />}
                className="rounded-full w-64 m-1 "
                onChange={handleChange}
                value={searchText}
              />
            </div>
          }
        />
      </ConfigProvider>
    </div>
  );
}

//mock data
// const widgetList = [
//   {
//     _id: "collection_ID1",
//     type: WidgetCategoryType.COLLECTION,
//     order: 7,
//     visibility: true,
//     element: {
//       pattern: CollectionPatternType.GRID,
//       collectionIdList: [],
//     },
//   },
//   {
//     _id: "collection_ID2",
//     type: WidgetCategoryType.COLLECTION,
//     order: 8,
//     visibility: true,
//     element: {
//       pattern: CollectionPatternType.CAROUSEL,
//       collectionIdList: [],
//     },
//   },
//   {
//     _id: "category_ID",
//     type: WidgetCategoryType.CATEGORY,
//     order: 1,
//     visibility: false,
//     element: {
//       pattern: CategoryPatternType.GRID,
//       title: "Danh mục nổi bật",
//       categoryIdList: [],
//     },
//   },
//   {
//     _id: "product_ID",
//     type: WidgetCategoryType.PRODUCT,
//     order: 2,
//     visibility: true,
//     element: {
//       pattern: ProductPatternType.GRID,
//       title: "Sản phẩm mới",
//       collectionId: "",
//     },
//   },
//   {
//     _id: "product_ID2",
//     type: WidgetCategoryType.PRODUCT,
//     order: 4,
//     visibility: true,
//     element: {
//       pattern: ProductPatternType.CAROUSEL,
//       title: "Sản phẩm giá hời",
//       collectionId: "",
//     },
//   },
//   {
//     _id: "product_ID3",
//     type: WidgetCategoryType.PRODUCT,
//     order: 5,
//     visibility: true,
//     element: {
//       pattern: ProductPatternType.GRID,
//       title: "Sản phẩm nổi bật",
//       collectionId: "",
//     },
//   },
//   {
//     _id: "product_ID4",
//     type: WidgetCategoryType.PRODUCT,
//     order: 6,
//     visibility: true,
//     element: {
//       pattern: ProductPatternType.CAROUSEL,
//       title: "Sản phẩm cho bạn",
//       collectionId: "",
//     },
//   },
//   {
//     _id: "promotion_ID",
//     type: WidgetCategoryType.PROMOTION,
//     order: 3,
//     visibility: false,
//     element: {
//       pattern: PromotionPatternType.GRID,
//       title: "Voucher trao tay",
//       promotionIdList: [],
//     },
//   },
//   {
//     _id: "banner_ID",
//     type: WidgetCategoryType.BANNER,
//     order: 0,
//     visibility: true,
//     element: {
//       pattern: BannerPatternType.CAROUSEL,
//       images: [],
//     },
//   },
// ];

// const shopInfoData = {
//   color: "white",
//   name: "TechZone Shop",
//   avatarUrl: "",
//   bannerUrl: "",
// };
