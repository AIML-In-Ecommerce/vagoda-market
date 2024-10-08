"use client";
import {
  Affix,
  ColorPicker,
  ConfigProvider,
  Descriptions,
  DescriptionsProps,
  Divider,
  FloatButton,
  Skeleton,
  Tabs,
  Tooltip,
} from "antd";
import { useParams } from "next/navigation";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import useOnScreen from "../../user/utils/UseOnScreen";

import ReviewList from "../review/ReviewList";
import ReviewSummary from "../review/ReviewSummary";
import ComboList from "./productDetail/ComboList";
import FloatingCartForm from "./productDetail/FloatingCartForm";
import CartSummaryModal from "./productDetail/ProductSummaryModal";
import SimilarList from "./productDetail/SimilarList";
import AboutProduct from "./productDetail/AboutProduct";

import { ProductAccessType } from "@/enum/ProductAccessType";
import { ReviewType } from "@/model/ReviewType";
import { ProductDetailType, ProductType } from "@/model/ProductType";

import StatisticsService from "@/services/statistics.service";
import { GET_GetReviewListByProduct } from "@/apis/review/ReviewAPI";
import { GET_GetProductDetail } from "@/apis/product/ProductDetailAPI";

interface ProductDetailProps {
  notify(message: string, content: any): void;
}

export default function ProductDetail(props: ProductDetailProps) {
  // variables and functions
  const { productId } = useParams();

  const [product, setProduct] = useState<ProductDetailType>();
  const [mainImage, setMainImage] = useState<string>("");

  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [combo, setCombo] = useState<ProductType[]>([]);

  // selected attributes--------------------------------------------------------
  const [selectedColorOption, setSelectedColorOption] = useState<any>();
  const [selectedSizeOption, setSelectedSizeOption] = useState<string>("");
  //----------------------------------------------------------------------------

  // price--------------------------------------------------------
  // number of main item
  const [numberOfItem, setNumberOfItem] = useState(1);

  const [totalComboPrice, setTotalComboPrice] = useState(0);

  const [comboList, setComboList] = useState<ProductType[]>([]);

  const totalPrice = useMemo(() => {
    if (!product) return 0;
    return numberOfItem * product.finalPrice + totalComboPrice;
  }, [totalComboPrice, numberOfItem, product]);
  //----------------------------------------------------------------

  // modal
  const [open, setOpen] = useState(false);

  // review summary visibility----------------------------------------------------------------
  // const [reviewSummaryVisibility, setReviewSummaryVisibility] = useState(true);
  // -----------------------------------------------------------------------------------------

  // ATTEMPT 1
  // Get the navbar
  // const bottom = document.getElementById("page-bottom-boundary");

  // // Get the offset position of the navbar

  // // Add the sticky class to the navbar when you reach its scroll position. Remove the sticky class when you leave the scroll position.
  // useEffect(() => {
  //   const sticky = bottom ? bottom.offsetTop : window.scrollY;

  //   if (bottom) {
  //     if (window.scrollY >= sticky) {
  //       setReviewSummaryVisibility(false);
  //     } else {
  //       setReviewSummaryVisibility(true);
  //     }

  //     console.log("bottom ", bottom.offsetTop);
  //   } else console.log("bottom is null");
  // }, [bottom]);

  // ATTEMPT 2
  //   function getDocHeight() {
  //     var D = document;
  //     return Math.max(
  //         D.body.scrollHeight, D.documentElement.scrollHeight,
  //         D.body.offsetHeight, D.documentElement.offsetHeight,
  //         D.body.clientHeight, D.documentElement.clientHeight
  //     );
  // }
  //   window.scroll(function() {
  //     if(window.innerHeight && window.screenTop + window.innerHeight == getDocHeight()) {
  //         alert("bottom!");
  //     }
  //  });

  // ATTEMPT 3: SUCCESSFUL
  const ref = useRef<HTMLDivElement>(null);
  const reviewSummaryVisibility = !useOnScreen(ref);

  const ref2 = useRef<HTMLDivElement>(null);
  const cartVisibility = !useOnScreen(ref2);

  // all reviews
  const allReviews = (
    <ReviewList
      productId={productId ? productId.toString() : ""}
      reviews={reviews}
      setReviews={setReviews}
    />
  );
  const reviewSummary = <ReviewSummary product={product} reviews={reviews} />;

  // selected tab key
  const [tabKey, setTabKey] = useState("1");

  const onTabClick = (tabKey: string) => {
    console.log("key: " + tabKey);
    setTabKey(tabKey);
  };

  const items: DescriptionsProps["items"] = [
    // key can be index, label is title, children is content
    {
      key: "1",
      label: "Sản phẩm",
      children: product?.name,
      span: 2,
    },
    {
      key: "5",
      label: "Bảo hành",
      children: product?.attribute.warranty,
      span: 2,
    },
    {
      key: "2",
      label: "Màu sắc",
      children: (
        <div>
          {(product &&
            product.attribute.colors.length > 0 &&
            product.attribute.colors.map((color, index) => (
              <div className="flex flex-row gap-2" key={index}>
                <Tooltip title={color.color.value} className="cursor-pointer">
                  <ColorPicker defaultValue={color.color.value} disabled />
                </Tooltip>
                <div className="mt-1">{color.color.label}</div>
              </div>
            ))) || <span>Không có</span>}
        </div>
      ),
      span: 5,
    },
    {
      key: "3",
      label: "Kích cỡ",
      children: (
        <div>
          {(product &&
            product.attribute.size.length > 0 &&
            product.attribute.size.map((size, index) => (
              <span key={index}>
                {size}
                {index == product.attribute.size.length - 1 ? "" : ", "}
              </span>
            ))) || <span>Không có</span>}
        </div>
      ),
      span: 5,
    },
    {
      key: "4",
      label: "Chất liệu",
      children: product?.attribute.material,
      span: 5,
    },
  ];

  // tabs, descriptions and review summary
  const tabItems = [
    {
      // label: `Descriptions`,
      label: (
        <div
          className={`uppercase font-bold ${
            tabKey === "1" ? "underline underline-offset-8" : ""
          }`}
        >
          Mô tả
        </div>
      ),
      key: "1",
      children: (
        <div className="p-2">
          {product && (
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          )}
        </div>
      ),
    },
    {
      // label: `Specifications`,
      label: (
        <div
          className={`uppercase font-bold ${
            tabKey === "2" ? "underline underline-offset-8" : ""
          }`}
        >
          Đặc điểm nổi bật
        </div>
      ),
      key: "2",
      children: (
        <Descriptions
          bordered
          // column={1}
          items={items}
          labelStyle={{ fontWeight: "bold" }}
        />
      ),
    },
    {
      // label: `Review Summary`,
      label: (
        <div
          className={`uppercase font-bold ${
            tabKey === "3" ? "underline underline-offset-8" : ""
          }`}
        >
          Tổng quan đánh giá
        </div>
      ),
      key: "3",
      children: (
        <div>
          <div className="lg:grid lg:grid-cols-5 gap-5 h-fit">
            <div className="lg:col-span-2 overflow-y-hidden">
              {(reviews.length == 1 && <div>{reviewSummary}</div>) || (
                <Affix
                  offsetTop={60}
                  className={`${reviewSummaryVisibility ? "" : "invisible"} `}
                >
                  {reviewSummary}
                </Affix>
              )}
            </div>
            <div className="lg:col-span-3">{allReviews}</div>
          </div>
        </div>
      ),
    },
  ];

  // functions

  const authContext = useContext(AuthContext);

  console.log("id", authContext.userInfo?._id);

  // call api
  useEffect(() => {
    handleGetProductDetail();
    handleGetReviews();
    handleGetComboList();
  }, []);

  useEffect(() => {
    if (!product) return;
    if (product.images && product.images.length > 0)
      setMainImage(product.images[0]);
  }, [product]);

  const handleGetProductDetail = async () => {
    if (!productId) return;
    const response = await GET_GetProductDetail(productId.toString());
    if (response.status == 200) {
      let data = response.data as ProductDetailType;
      if (data) {
        setProduct(data);
        console.log("product", data);
        await setAccessProductByAuthUser(data.shop, data._id);
      }
    } else console.log(response.message);
  };

  async function setAccessProductByAuthUser(shopId: string, productId: string) {
    const userId =
      authContext.userInfo != null ? authContext.userInfo._id : null;

    let sessionId: string | null = null;
    if (authContext.methods) {
      sessionId = authContext.methods.getSessionId();
    }

    const accessType = ProductAccessType.WATCH_DETAIL;

    await StatisticsService.setProductAccess(
      userId,
      sessionId,
      productId,
      shopId,
      accessType
    );
  }

  const handleGetReviews = async () => {
    if (!productId) return;
    const response = await GET_GetReviewListByProduct(productId.toString());
    if (response.status == 200) {
      let data = response.data;
      if (data) {
        // console.log("review", data);
        setReviews(data);
      }
    } else console.log(response.message);
  };

  const handleGetComboList = async () => {
    if (!productId) return;
    const response = await StatisticsService.getComboProducts(
      productId.toString()
    );
    if (response && response.length > 0) {
      console.log("combo response", response);
      let data: ProductType[] = [];

      response.forEach((item: ProductDetailType) => {
        data.push({
          _id: item._id,
          name: item.name,
          imageLink: item.images[0],
          rating: item.avgRating,
          soldAmount: item.soldQuantity,
          price: item.finalPrice,
          originalPrice: item.originalPrice,
          flashSale: item.isFlashSale,
          category: item.category,
          shop: item.shop,
        });
      });

      console.log("combo data", data);
      setCombo(data);
    } else console.log("no combo data");
  };

  return (
    <div className="bg-slate-50 px-2 lg:px-24 ">
      {(product && (
        <div className="justify-between pb-10 gap-5 h-fit overflow-hidden relative">
          <div className="">
            {/* about product */}
            <div ref={ref2}>
              <AboutProduct
                product={product}
                numberOfItem={numberOfItem}
                setNumberOfItem={setNumberOfItem}
                mainImage={mainImage}
                setMainImage={setMainImage}
                notify={props.notify}
                selectedColorOption={selectedColorOption}
                setSelectedColorOption={setSelectedColorOption}
                selectedSizeOption={selectedSizeOption}
                setSelectedSizeOption={setSelectedSizeOption}
              />
            </div>

            {/* top floating cart */}
            <Affix
              offsetTop={0}
              className={`${cartVisibility ? "" : "hidden"} `}
            >
              <FloatingCartForm
                // handleCartDetail={setOpen}
                // totalPrice={totalPrice}
                numberOfItem={numberOfItem}
                updateItemNumber={setNumberOfItem}
                name={product.name}
                price={product.finalPrice}
                mainImage={mainImage}
                shop={product.shop}
                _id={product._id}
                notify={props.notify}
              />
            </Affix>

            {/* related products to buy with  */}
            {combo.length > 0 && (
              <div className="w-full">
                <div className="w-full flex flex-col align-middle justify-center items-center">
                  <div className="w-1/2">
                    {/* <ConfigProvider
                      theme={{
                        token: {
                          colorSplit: "black",
                        },
                      }}
                    > */}
                    <Divider
                      className="mt-8"
                      style={{
                        border: "2px solid silver",
                        borderTop: 0,
                        borderBottom: 0,
                        borderLeft: 0,
                        borderRight: 0,
                        paddingBottom: 0,
                        marginBottom: 0,
                      }}
                    >
                      <div className="px-5 text-lg uppercase">
                        ✦ Sản phẩm có thể kết hợp ✦
                      </div>
                    </Divider>
                    {/* </ConfigProvider> */}
                  </div>
                </div>

                <ComboList
                  combo={combo}
                  totalPrice={totalPrice}
                  totalComboPrice={totalComboPrice}
                  updateTotalComboPrice={(price) => {
                    setTotalComboPrice(price);
                  }}
                  comboList={comboList}
                  setComboList={setComboList}
                  notify={props.notify}
                  product={product}
                  numberOfItem={numberOfItem}
                  handleCartDetail={setOpen}
                />
              </div>
            )}

            {/* tabs, descriptions and review summary */}
            <div className="my-5">
              <ConfigProvider
                theme={{
                  components: {
                    Tabs: {
                      itemActiveColor: "#c4996c",
                      itemHoverColor: "#c4996c",
                      itemSelectedColor: "#c4996c",
                    },
                  },
                }}
              >
                <Tabs
                  defaultActiveKey="1"
                  type="card"
                  items={tabItems.map((item, i) => {
                    //   const id = String(i + 1);
                    return {
                      label: item.label,
                      key: item.key,
                      children: item.children,
                    };
                  })}
                  className="overflow-y-hidden"
                  style={{ overflow: "hidden" }}
                  onTabClick={onTabClick}
                />
              </ConfigProvider>
            </div>

            <div id="page-bottom-boundary" ref={ref}>
              <Divider />
              {/* similar products */}
              <div className="w-full flex align-middle justify-center items-center">
                <div className="w-1/2">
                  <Divider
                    // className="mt-20"
                    style={{
                      border: "2px solid silver",
                      borderTop: 0,
                      borderBottom: 0,
                      borderLeft: 0,
                      borderRight: 0,
                      paddingBottom: 0,
                      marginBottom: 0,
                    }}
                  >
                    <div className="px-5 text-lg uppercase">
                      ✦ Sản phẩm tương tự ✦
                    </div>
                  </Divider>
                </div>
              </div>
              <SimilarList notify={props.notify} />
            </div>
          </div>

          {/* others */}
          <FloatButton.Group>
            <FloatButton.BackTop tooltip={<div>Lướt lên đầu</div>} />
          </FloatButton.Group>

          <CartSummaryModal
            open={open}
            setOpen={setOpen}
            totalPrice={totalPrice}
            mainProductId={product._id}
            mainProductPrice={product.finalPrice}
            numberOfItem={numberOfItem}
            comboList={comboList}
            totalComboPrice={totalComboPrice}
          />
        </div>
      )) || <Skeleton active style={{ margin: 10 }} />}
    </div>
  );
}

// price
export const priceIndex = (price: number) => {
  return price.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  });
};
