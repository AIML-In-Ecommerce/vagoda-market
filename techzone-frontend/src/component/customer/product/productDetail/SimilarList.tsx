import { CarouselArrow } from "@/component/user/utils/CarouselArrow";
import { ProductType } from "@/model/ProductType";
import { Carousel, List } from "antd";
import { useEffect, useState } from "react";
import CustomEmpty from "../../shop/mini/CustomEmpty";
import ProductItem from "../../ProductItem";
import { POST_GetProductListByShop } from "@/apis/product/ProductDetailAPI";

export default function SimilarList() {
  // mock data
  const MockData = [
    {
      _id: "6645bab5f4c7faf064f1bcdc",
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
      _id: "6645bab5f4c7faf064f1bcdc",
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
      _id: "6645bbaef4c7faf064f1bce0",
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
      price: 22000000,
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
      name: "Lenovo 15i",
      rating: 4.5,
      soldAmount: 20,
      price: 15000000,
      flashSale: true,
      originalPrice: 17000000,
      category: "",
    },
  ];

  const autoPlayCarouselSpeed = 5000; //ms

  const [products, setProducts] = useState<ProductType[]>();

  // call api (temporarily)
  const mockId = "65f1e8bbc4e39014df775166";

  useEffect(() => {
    handleGetProductList();
  }, [mockId]);

  const handleGetProductList = async () => {
    const response = await POST_GetProductListByShop(mockId);
    if (response.status == 200) {
      if (response.data) {
        setProducts(response.data);
        // console.log("product", data);
      }
    }
  };

  return (
    <div>
      {(products && products.length > 0 && (
        <div>
          {products.length < 4 ? (
            <div className="px-10">
              <List
                grid={{
                  gutter: 5,
                  xs: 0,
                  sm: 1,
                  md: 2,
                  lg: 3,
                  xl: 5,
                  xxl: 5,
                }}
                dataSource={products}
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
          ) : (
            <Carousel
              className="items-center"
              autoplay
              autoplaySpeed={autoPlayCarouselSpeed}
              arrows
              prevArrow={<CarouselArrow direction="left" />}
              nextArrow={<CarouselArrow direction="right" />}
              style={{ padding: 40 }}
              slidesToShow={5}
              slidesToScroll={1}
              initialSlide={0}
              responsive={[
                {
                  breakpoint: 1280,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                  },
                },
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                  },
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                  },
                },
              ]}
            >
              {products.map((item, index) => (
                <div key={index} className="z-50">
                  <ProductItem
                    imageLink={item.imageLink}
                    name={item.name}
                    rating={item.rating}
                    soldAmount={item.soldAmount}
                    price={item.price}
                    isFlashSale={item.flashSale}
                    originalPrice={item.originalPrice}
                  />
                </div>
              ))}
            </Carousel>
          )}
        </div>
      )) || (
        <div className="bg-white p-10 my-5">
          <CustomEmpty />
        </div>
      )}
    </div>
  );
}
