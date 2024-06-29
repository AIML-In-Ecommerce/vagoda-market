"use client";

import { Col, Flex, Row, Skeleton } from "antd";
import { useEffect, useState } from "react";
import CategoryItem from "./utils/CategoryItem";
import { SubCategoryType } from "@/model/CategoryType";
import CenterTitle from "./utils/CenterTitle";
import { GET_GetAllSubCategories } from "@/apis/category/_CategoryAPI";

interface HotCategoryProps {}

export default function HotCategory({}: HotCategoryProps) {
  const titleValue = "Danh mục phổ biến";
  const subTitleValue = "Danh mục được lựa chọn nhiều trong tuần";
  const titleBackground = "bg-[#F2F2F2]";

  // const nonAppearanceEffect = "transition-opacity duration-700 ease-in opacity-0"
  // const appearanceEffect = "transition-opacity duration-700 ease-in opacity-100"

  const numOfItemPerSlide = 7;
  const [category, setCategory] = useState<SubCategoryType[]>([]);
  const [currentSlide, setCurrentSlide] = useState<number>(-1);
  const [mainDisplay, setMainDisplay] = useState<JSX.Element | undefined>(
    undefined
  );
  // const [fadedEffect, setFadedEffect] = useState<string>(appearanceEffect)

  const [changeFlat, setChangeFlat] = useState<boolean>(false);
  const [isHolding, setIsHolding] = useState<boolean>(false);

  const handleGetSubCategoryList = async () => {
    const response = await GET_GetAllSubCategories();
    if (response.status == 200) {
      if (response.data) {
        console.log("category", response.data);
        setCategory(response.data);

        setCurrentSlide(0);
      }
    }
  };

  useEffect(() => {
    //fetch data here
    handleGetSubCategoryList();

    //for testing
    // const data = [...MockData];
    // data.forEach((value) => {
    //   const foundImage = listOfImage.find((str) => str[0] == value._id);
    //   if (foundImage != undefined) {
    //     value.image = foundImage[1];
    //   }
    // });

    // setCategory(data);
    // setCurrentSlide(0);
  }, []);

  useEffect(() => {
    //TODO: create a view here

    if (category.length == 0) {
      setMainDisplay(<Skeleton active />);
    } else {
      const endIndex =
        currentSlide + numOfItemPerSlide > category.length
          ? category.length
          : currentSlide + numOfItemPerSlide;
      let data = category.slice(currentSlide, endIndex);

      if (data.length < numOfItemPerSlide) {
        const complementData = category.slice(
          0,
          numOfItemPerSlide - data.length
        );
        data = data.concat(complementData);
      }

      setMainDisplay(get7ItemsDisplay(data));
    }

    //auto change
    setTimeout(() => {
      setChangeFlat((prev) => !prev);
    }, 6000);
  }, [currentSlide]);

  useEffect(() => {
    if (category.length == 0) {
      return;
    }

    if (isHolding == true) {
      return;
    }

    const nextSlideIndex = (currentSlide + 1) % category.length;
    setCurrentSlide(nextSlideIndex);
  }, [changeFlat, isHolding]);

  function onHoldingCallback() {
    setIsHolding(true);
  }

  function onLeavingCallback() {
    setTimeout(() => {
      setIsHolding(false);
    }, 6000);
  }

  function get7ItemsDisplay(data: SubCategoryType[]) {
    return (
      <>
        {/* <Row className="w-full" gutter={12}>
          <Col span={8} style={{ maxHeight: "500px" }} flex={"auto"}>
            <CategoryItem
              // onHoldingCallback={onHoldingCallback}
              // onLeavingCallback={onLeavingCallback}
              category={data[0]}
            />
          </Col>
          <Col span={16}>
            <Row gutter={[5, 10]}>
              <Row gutter={10}>
                <Col
                  span={6}
                  style={{
                    height: "250px",
                  }}
                >
                  <CategoryItem
                    // onHoldingCallback={onHoldingCallback}
                    // onLeavingCallback={onLeavingCallback}
                    category={data[1]}
                  />
                </Col>
                <Col
                  span={9}
                  style={{
                    height: "250px",
                  }}
                >
                  <CategoryItem
                    // onHoldingCallback={onHoldingCallback}
                    // onLeavingCallback={onLeavingCallback}
                    category={data[2]}
                  />
                </Col>
                <Col
                  span={9}
                  style={{
                    height: "250px",
                  }}
                >
                  <CategoryItem
                    // onHoldingCallback={onHoldingCallback}
                    // onLeavingCallback={onLeavingCallback}
                    category={data[3]}
                  />
                </Col>
              </Row>
              <Row gutter={10}>
                <Col
                  span={9}
                  style={{
                    height: "240px",
                  }}
                >
                  <CategoryItem
                    // onHoldingCallback={onHoldingCallback}
                    // onLeavingCallback={onLeavingCallback}
                    category={data[4]}
                  />
                </Col>
                <Col
                  span={9}
                  style={{
                    height: "240px",
                  }}
                >
                  <CategoryItem
                    // onHoldingCallback={onHoldingCallback}
                    // onLeavingCallback={onLeavingCallback}
                    category={data[5]}
                  />
                </Col>
                <Col
                  span={6}
                  style={{
                    height: "240px",
                  }}
                >
                  <CategoryItem
                    // onHoldingCallback={onHoldingCallback}
                    // onLeavingCallback={onLeavingCallback}
                    category={data[6]}
                  />
                </Col>
              </Row>
            </Row>
          </Col>
        </Row> */}

        <div className="grid grid-cols-3 gap-2">
          <div className="h-[320px] lg:h-[510px]">
            <CategoryItem category={data[0]} />
          </div>
          <div className="col-span-2 grid grid-cols-3 grid-rows-2 gap-2">
            <div className="h-[150px] lg:h-[250px]">
              <CategoryItem category={data[1]} />
            </div>
            <div className="h-[150px] lg:h-[250px]">
              <CategoryItem category={data[2]} />
            </div>
            <div className="h-[150px] lg:h-[250px]">
              <CategoryItem category={data[3]} />
            </div>

            <div className="row-start-2 h-[150px] lg:h-[250px]">
              <CategoryItem category={data[4]} />
            </div>
            <div className="row-start-2 h-[150px] lg:h-[250px]">
              <CategoryItem category={data[5]} />
            </div>
            <div className="row-start-2 h-[150px] lg:h-[250px]">
              <CategoryItem category={data[6]} />
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div
      className="mx-5"
      onMouseEnter={() => {
        onHoldingCallback();
      }}
      onMouseLeave={() => {
        onLeavingCallback();
      }}
    >
      <Flex vertical className="w-full" justify="start" align="center">
        <Flex vertical className="w-full py-6" justify="center" align="center">
          <CenterTitle
            title={titleValue}
            subTitle={subTitleValue}
            background={titleBackground}
            isUppercase
          />
          <div className="invisible h-10 w-full"></div>
          <div className="container w-full mt-4">{mainDisplay}</div>
        </Flex>
        <div className="invisible h-14 w-full"></div>
      </Flex>
    </div>
  );
}
