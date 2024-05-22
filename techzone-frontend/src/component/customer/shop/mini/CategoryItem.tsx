"use client";
import { CategoryType } from "@/model/CategoryType";
import { Avatar } from "antd";
import Link from "next/link";

export interface CategoryItemProps {
  category: CategoryType;
}

export default function CategoryItem(props: CategoryItemProps) {
  return (
    <Link href={props.category.urlKey ? props.category.urlKey : "#"}>
      <div
        className="flex gap-5 rounded-full bg-gradient-to-r from-slate-300 to-stone-500 h-[50px]
       text-white font-bold items-center hover:border-2 hover:border-slate-200"
      >
        <Avatar size={64} src={props.category.image} />
        <div className="flex text-center text-xl line-clamp-2 pr-4">
          {props.category.name}
        </div>
      </div>
    </Link>
  );
}
