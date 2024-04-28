"use client";
import { Empty, List, Typography } from "antd";
import ProductItem from "../../ProductItem";
import { ProductType } from "@/model/ProductType";
import { ProductElement, WidgetType } from "@/model/WidgetType";

interface ProductGridProps {
  products: ProductType[]; // TODO: get this from collection id
  widget: WidgetType;
}

export default function ProductGrid(props: ProductGridProps) {
  // var
  const element = props.widget.element as ProductElement;

  return (
    <div className="bg-white my-5 py-5 px-10 ">
      <Typography.Text className="text-2xl font-semibold w-full">
        {element.title}
      </Typography.Text>
      <div className="invisible h-5">hidden block</div>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={props.products}
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={<span>Không có</span>}
            />
          ),
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
