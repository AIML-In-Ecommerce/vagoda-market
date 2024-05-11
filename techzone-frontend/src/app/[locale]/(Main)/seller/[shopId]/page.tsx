import Banner from "@/component/customer/shop/Banner";
import ProductList from "../../product-list/page";
import { Tabs } from "antd";
import AboutShop from "@/component/customer/shop/AboutShop";
import Search from "antd/es/transfer/search";
import ProductItemList from "@/component/customer/ProductItemList";

export default function ShopPage() {
  const tabItems = [
    {
      label: "Cửa Hàng",
      children: <div className="p-2"></div>,
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
      label: "Bộ sưu tập",
      children: (
        <div className="p-2">
          {/* temp */}
          {/* <ProductItemList
            isFilterOpened={isFilterOpened}
            setIsFilterOpened={setIsFilterOpened}
            filterList={filterList}
            products={products}
          /> */}
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
    <div className="mx-20 h-fit">
      <Banner
        color={shopInfo.color}
        name={shopInfo.name}
        avatarUrl={shopInfo.avatarUrl}
      />

      <Tabs
        defaultActiveKey="1"
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
