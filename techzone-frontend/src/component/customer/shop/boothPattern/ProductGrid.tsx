"use client";
import { List, Typography } from "antd";
import ProductItem from "../../ProductItem";
import { ProductType } from "@/model/ProductType";

interface ProductGridProps {
  products: ProductType[];
}

export default function ProductGrid(props: ProductGridProps) {
  return (
    <div className="bg-white my-5 py-5 px-10 ">
      <Typography.Text className="text-2xl font-semibold w-full">
        Sản phẩm dạng lưới
      </Typography.Text>
      <div className="invisible h-5">hidden block</div>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={props.products}
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
