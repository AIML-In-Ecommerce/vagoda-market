import { Typography, Divider, List } from "antd";
import React, { useState } from "react";
import CustomEmpty from "../mini/CustomEmpty";
import ProductItem from "../../ProductItem";
import { ProductType } from "@/model/ProductType";

const MockData = [
  {
    _id: "sp-01",
    imageLink:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Lenovo 15i",
    rating: 4.5,
    soldAmount: 20,
    price: 15000000,
    flashSale: true,
    originalPrice: 17000000,
    category: "",
  },
  {
    _id: "sp-02",
    imageLink:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Dell Vostro",
    rating: 4.5,
    soldAmount: 32,
    price: 17000000,
    flashSale: false,
    originalPrice: 17000000,
    category: "",
  },
  {
    _id: "sp-03",
    imageLink:
      "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Dell SuperLight",
    rating: 4.5,
    soldAmount: 10,
    price: 18000000,
    flashSale: true,
    originalPrice: 20000000,
    category: "",
  },
  {
    _id: "sp-04",
    imageLink:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Lenovo 15i",
    rating: 4.5,
    soldAmount: 20,
    price: 15000000,
    flashSale: true,
    originalPrice: 17000000,
    category: "",
  },
  {
    _id: "sp-05",
    imageLink:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Dell Vostro",
    rating: 4.5,
    soldAmount: 32,
    price: 17000000,
    flashSale: false,
    originalPrice: 17000000,
    category: "",
  },
  {
    _id: "sp-06",
    imageLink:
      "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Dell SuperLight",
    rating: 4.5,
    soldAmount: 10,
    price: 18000000,
    flashSale: true,
    originalPrice: 20000000,
    category: "",
  },
  {
    _id: "sp-07",
    imageLink:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Lenovo 15i",
    rating: 4.5,
    soldAmount: 20,
    price: 15000000,
    flashSale: true,
    originalPrice: 17000000,
    category: "",
  },
  {
    _id: "sp-08",
    imageLink:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Dell Vostro",
    rating: 4.5,
    soldAmount: 32,
    price: 17000000,
    flashSale: false,
    originalPrice: 17000000,
    category: "",
  },
  {
    _id: "sp-09",
    imageLink:
      "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Dell SuperLight",
    rating: 4.5,
    soldAmount: 10,
    price: 18000000,
    flashSale: true,
    originalPrice: 20000000,
    category: "",
  },
  {
    _id: "sp-10",
    imageLink:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Lenovo 15i",
    rating: 4.5,
    soldAmount: 20,
    price: 15000000,
    flashSale: true,
    originalPrice: 17000000,
    category: "",
  },
  {
    _id: "sp-11",
    imageLink:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Dell Vostro",
    rating: 4.5,
    soldAmount: 32,
    price: 17000000,
    flashSale: false,
    originalPrice: 17000000,
    category: "",
  },
  {
    _id: "sp-12",
    imageLink:
      "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Dell SuperLight",
    rating: 4.5,
    soldAmount: 10,
    price: 18000000,
    flashSale: true,
    originalPrice: 20000000,
    category: "",
  },
];

interface CollectionDetailProps {
  collectionId: string;
}

export default function CollectionDetail(props: CollectionDetailProps) {
  const [products, setProducts] = useState<ProductType[]>(MockData);

  return (
    <div>
      <Typography.Text className="text-xl font-semibold w-full">
        Số sản phẩm: {products.length}
      </Typography.Text>
      <Divider />
      <List
        grid={{
          gutter: 5,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 2,
          xl: 3,
          xxl: 3,
        }}
        dataSource={products} // TODO: get data from collectionId
        locale={{
          emptyText: <CustomEmpty />,
        }}
        renderItem={(item) => (
          <List.Item>
            <ProductItem
              imageLink={item.imageLink}
              name={item.name}
              rating={item.rating}
              soldAmount={item.soldAmount}
              price={item.price}
              isFlashSale={item.flashSale}
              originalPrice={item.originalPrice}
            />
          </List.Item>
        )}
      />
    </div>
  );
}
