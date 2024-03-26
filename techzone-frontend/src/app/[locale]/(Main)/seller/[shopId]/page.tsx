import Banner from "@/component/customer/shop/Banner";
import ProductList from "../../product-list/page";
import { Tabs } from "antd";
import AboutShop from "@/component/customer/shop/AboutShop";
import Search from "antd/es/transfer/search";

export default function ShopPage() {
  const tabItems = [
    {
      label: "Cửa Hàng",
      key: "1",
      children: <div className="p-2"></div>,
    },
    {
      label: "Tất Cả Sản Phẩm",
      key: "2",
      children: (
        <div className="p-2">
          {/* temp */}
          <ProductList />
        </div>
      ),
    },
    {
      label: "Bộ sưu tập",
      key: "3",
      children: <div className="p-2"></div>,
    },
    {
      label: "Hồ Sơ Cửa Hàng",
      key: "4",
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
          //   const id = String(i + 1);
          return {
            label: item.label,
            key: item.key,
            children: item.children,
          };
        })}
        tabBarExtraContent={<Search placeholder="Tìm tại cửa hàng" />}
      />
    </div>
  );
}
