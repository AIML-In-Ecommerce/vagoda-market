"use client";
import { Flex, List } from "antd";
// import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import ReactImageMagnify from "react-image-magnify";

export type ImageType = {
  url: string;
};

interface FormProps {
  editable: boolean;
  currentEditMode: string;
  images: Array<ImageType>;
  name: string;
}

const ImageForm = (formData: FormProps) => {
  //   const t = useTranslations("Review");

  // images
  type ImageInfoType = {
    width: number;
    height: number;
  };

  const [mainImage, setMainImage] = useState(formData.images[0].url);
  const [mainImageInfo, setMainImageInfo] = useState<ImageInfoType>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    function getMeta(url: string, callback: any) {
      const img = new Image();
      img.src = url;
      img.onload = function () {
        callback(img.width, img.height);
      };
    }
    getMeta(mainImage, (width: number, height: number) => {
      // alert(width + "px " + height + "px");
      let imageInfo = { width, height };
      setMainImageInfo(imageInfo);
    });
  }, [mainImage]);

  // display UI elements that are editable
  const visible = useMemo(() => {
    if (formData.currentEditMode === "image") return formData.editable;
    return false;
  }, [formData.editable, formData.currentEditMode]);

  return (
    <>
      {(!visible && (
        <Flex vertical>
          <div className="m-2">
            <List
              grid={{ gutter: 16, column: 5 }}
              dataSource={formData.images}
              renderItem={(item) => (
                <List.Item>
                  <div
                    className={`cursor-pointer ${
                      mainImage == item.url
                        ? "border-4 border-blue-400"
                        : "border-2"
                    }`}
                    onClick={() => {
                      setMainImage(item.url);
                    }}
                  >
                    <img
                      className="h-14 w-full object-contain"
                      src={item.url}
                      alt={item.url}
                    />
                  </div>
                </List.Item>
              )}
            />
          </div>

          <div className="bg-white h-fit shadow-md p-4 z-50">
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: formData.name,
                  isFluidWidth: true,
                  width: 500,
                  height: 500,
                  src: mainImage,
                  // src: mainImage + "?width=500&height=500",
                },
                largeImage: {
                  src: mainImage,
                  // width: mainImageInfo.width * 0.8,
                  // height: mainImageInfo.height * 0.8,
                  width: mainImageInfo.width,
                  height: mainImageInfo.height,
                },
                enlargedImageContainerDimensions: {
                  // width: "160%",
                  // height: "120%",
                  width: "200%",
                  height: "100%",
                },
              }}
            />
          </div>
        </Flex>
      )) || <Flex vertical>edit text</Flex>}
    </>
  );
};

export default ImageForm;
