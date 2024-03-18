"use client";
import { Flex, List } from "antd";
// import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";

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
  const [mainImage, setMainImage] = useState(formData.images[0].url);

  // display UI elements that are editable
  const visible = useMemo(() => {
    if (formData.currentEditMode === "image") return formData.editable;
    return false;
  }, [formData.editable, formData.currentEditMode]);

  return (
    <>
      {(!visible && (
        <Flex vertical>
          <div className="bg-white shadow-md max-w-1/4 h-fit p-4">
            <img
              className="h-80 w-80 object-contain"
              src={mainImage}
              alt={formData.name}
            />
          </div>

          <div className="m-2">
            <List
              grid={{ gutter: 16, column: 4 }}
              dataSource={formData.images}
              renderItem={(item) => (
                <List.Item>
                  <div
                    className="cursor-pointer border-2"
                    onClick={() => setMainImage(item.url)}
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
        </Flex>
      )) || <Flex vertical>edit text</Flex>}
    </>
  );
};

export default ImageForm;
