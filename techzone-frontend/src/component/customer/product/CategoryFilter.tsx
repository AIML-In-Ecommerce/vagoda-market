import type { TreeDataNode } from "antd";
import { Tree } from "antd";
import React from "react";

const options: TreeDataNode[] = [
  {
    title: "Nam",
    key: "nam",
    children: [
      { title: "Áo Nam", key: "ao-nam" },
      { title: "Quần Nam", key: "quan-nam" },
      { title: "Đồ Bộ Nam", key: "do-bo-nam" },
      { title: "Đồ Thể Thao Nam", key: "do-the-thao-nam" },
      { title: "Đồ Lót Nam", key: "do-lot-nam" },
      { title: "Giày Nam - Dép Nam", key: "giay-nam-dep-nam" },
      { title: "Phụ Kiện Nam", key: "phu-kien-nam" },
    ],
  },
  {
    title: "Nữ",
    key: "nu",
    children: [
      { title: "Áo Nữ", key: "ao-nu" },
      { title: "Quần Nữ", key: "quan-nu" },
      { title: "Đồ Bộ Nữ", key: "do-bo-nu" },
      { title: "Đồ Thể Thao Nữ", key: "do-the-thao-nu" },
      { title: "Đồ Lót Nữ", key: "do-lot-nu" },
      { title: "Chân Váy Nữ", key: "chan-vay-nu" },
      { title: "Đầm Nữ - Váy Nữ", key: "dam-vay-nu" },
      { title: "Phụ Kiện Nữ", key: "phu-kien-nu" },
      { title: "Giày Nữ - Dép Nữ", key: "giay-nu-dep-nu" },
    ],
  },
  {
    title: "Nam/Nữ",
    key: "nam-nu",
    // children: [
    //   { title: "Áo Nữ", key: "ao-nu" },
    //   { title: "Quần Nữ", key: "quan-nu" },
    //   { title: "Đồ Bộ Nữ", key: "do-bo-nu" },
    //   { title: "Đồ Thể Thao Nữ", key: "do-the-thao-nu" },
    //   { title: "Đồ Lót Nữ", key: "do-lot-nu" },
    //   { title: "Chân Váy Nữ", key: "chan-vay-nu" },
    //   { title: "Đầm Nữ - Váy Nữ", key: "dam-vay-nu" },
    //   { title: "Phụ Kiện Nữ", key: "phu-kien-nu" },
    //   { title: "Giày Nữ - Dép Nữ", key: "giay-nu-dep-nu" },
    // ],
  },
  {
    title: "Trẻ Em",
    key: "tre-em",
    children: [
      { title: "Áo Trẻ Em", key: "ao-tre-em" },
      { title: "Quần Trẻ Em", key: "quan-tre-em" },
      { title: "Đồ Bộ Trẻ Em", key: "do-bo-tre-em" },
      { title: "Đồ Thể Thao Trẻ Em", key: "do-the-thao-tre-em" },
      { title: "Đầm/Váy Bé Gái", key: "dam-vay-be-gai" },
      { title: "Giày Dép Trẻ Em", key: "giay-dep-tre-em" },
      { title: "Phụ Kiện Trẻ Em", key: "phu-kien-tre-em" },
    ],
  },
];

const CategoryFilter: React.FC = () => (
  <Tree checkable treeData={options} blockNode className="bg-[#f3f3f3]" />
);

export default CategoryFilter;
