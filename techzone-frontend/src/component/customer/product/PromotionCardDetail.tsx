import { PromotionType } from "@/model/PromotionType";
import { Button } from "antd";
import React from "react";
import { HiOutlineClipboardDocument } from "react-icons/hi2";

interface PromotionDetailProps {
    item: PromotionType,

}

export default function PromotionCardDetail(props: PromotionDetailProps) {
    return (
        <React.Fragment>
            <div className="mt-3 container flex flex-col gap-y-2">
                <div className="grid bg-slate-50 p-4">
                    <div className="col-start-1 w-24 self-center font-semibold">Mã</div>
                    <div className="col-start-2 flex items-center gap-1">
                        <div>{props.item.code}</div>
                        <Button className="text-lg" icon={<HiOutlineClipboardDocument />} onClick={async () => {
                            await navigator.clipboard.writeText(props.item.code);
                            // alert('Đã sao chép vào clipboard');
                        }} />
                    </div>
                </div>
                <div className="grid p-4 flex">
                    <div className="col-start-1 w-24 text-slate-30 self-center font-semibold">Hạn sử dụng</div>
                    <div className="col-start-2">{props.item.expiredDate}</div>
                </div>
                <div className="grid bg-slate-50 p-4 flex flex-col">
                    <div className="text-slate-30 col-start-1 font-semibold">Điều kiện</div>
                    <div className="col-start-1">{props.item.description}</div>
                </div>
            </div>

        </React.Fragment>
    )
}