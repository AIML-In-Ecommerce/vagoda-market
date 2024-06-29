"use client";
import { GetProp, message, Upload, UploadFile, UploadProps, Image } from "antd";
import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";

interface MultipleUploadProps {
  asset: string[];
  setAsset: (value: string[]) => void;

  fileList: UploadFile[];
  setFileList: (value: UploadFile[]) => void;
}

export default function MultipleUpload(props: MultipleUploadProps) {
  // image
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = async ({
    fileList: newFileList,
  }) => {
    await newFileList.forEach(async (file) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj as FileType);
        props.setFileList(newFileList);
      }
    });
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <div style={{ marginTop: 8 }}>Đăng tải</div>
      <PlusOutlined />
    </button>
  );

  useEffect(() => {
    let newUrls: string[] = [];
    props.fileList.forEach((file) => {
      let url = file.url || file.preview;

      if (url) {
        newUrls.push(url);
      } else {
        newUrls.push("url");
      }
    });

    props.setAsset(newUrls);
  }, [props.fileList]);

  return (
    <div className="max-w-[800px]">
      <Upload
        name="avatar"
        listType="picture-card"
        showUploadList={true}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        onRemove={(file) =>
          props.setFileList(props.fileList.filter((f) => f !== file))
        }
        fileList={props.fileList}
        onPreview={handlePreview}
      >
        {props.fileList.length >= 10 ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </div>
  );
}

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};
