"use client";
import { CategoryType } from "@/model/CategoryType";
import { Avatar } from "antd";

export interface CategoryItemProps {
  category: CategoryType;
}

export default function CategoryItem(props: CategoryItemProps) {
  return (
    // <Link href={"/product-list?category=" + props.category._id}>
    <div className="flex flex-col gap-3 items-center pb-3">
      <Avatar
        size={220}
        src={props.category.image}
        className="hover:border-2 hover:border-slate-400 "
      />
      <div
        className="flex text-center text-xl line-clamp-2 
        text-slate-800 overline overline-offset-2 decoration-double decoration-slate-400"
      >
        {props.category.name}
      </div>
    </div>
    // </Link>
  );
}
