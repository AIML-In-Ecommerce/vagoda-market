"use client";
import { PromotionType } from "@/model/PromotionType"
import { Card, Tooltip, Button } from "antd"
import { FaRegCircleQuestion } from "react-icons/fa6"
import TICKET_EXPIRED from "@/app/[locale]/(Main)/cart/(asset)/coupon_unselected_short_fill.png"
import TICKET_UNSELECTED from "@/app/[locale]/(Main)/cart/(asset)/coupon_unselected_short.png"
import TICKET_SELECTED from "@/app/[locale]/(Main)/cart/(asset)/coupon_selected_short_fill.png"
import LOGO from "../../../../public/asset/logo.png"
import PromotionCardDetail from "./PromotionCardDetail";

interface PromotionCardProps {
    item: PromotionType
    promotions: Array<PromotionType>
    applyDiscount: (item: PromotionType) => void
    removeDiscount: (item: PromotionType) => void
}

const parseDateString = (dateString: string) => {
    const [timePart, datePart] = dateString.split(' ');
    const [hours, minutes] = timePart.split(':').map(Number);
    const [day, month, year] = datePart.split('/').map(Number);

    // JavaScript months are 0-indexed, so we subtract 1 from the month
    return new Date(year, month - 1, day, hours, minutes);
};

const isExpiredPromotion = (item: PromotionType) => {
    return parseDateString(item.expiredDate!) <= new Date();
}

const handleBackgroundPromotion = (promotions: PromotionType[], item: PromotionType) => {
    if (isExpiredPromotion(item)) { return `url(${TICKET_EXPIRED.src})` }
    return promotions.includes(item) ?
        `url(${TICKET_SELECTED.src})` : `url(${TICKET_UNSELECTED.src})`
}

export default function PromotionCard(props: PromotionCardProps) {
    return (
        <Card type="inner" className="mb-10 h-32 w-[437.2px] select-none"
            key={props.item._id}
            style={{
                backgroundImage: `${handleBackgroundPromotion(props.promotions, props.item)}`,
                backgroundSize: "100% 100%"
            }}>
            <div className="relative grid h-36">
                <div className="absolute top-3 z-10 w-16">
                    <div className="flex flex-col justify-center items-center">
                        <img alt="logo" src={LOGO.src}></img>
                        <div className="font-semibold">FashionStyle</div>
                    </div>
                </div>
                <div className="absolute right-0 top-1 text-lg w-auto">
                    <Tooltip title={
                        <div className="text-black">
                            <PromotionCardDetail item={props.item} />
                        </div>}
                        color="white"
                        trigger={["click", "hover", "contextMenu"]}
                        autoAdjustOverflow
                        placement="right">
                        <div className="text-slate-500">
                            {/* {
                                isExpiredPromotion(props.item) ?
                                    <div>Đã hết hạn</div> : <FaRegCircleQuestion />
                            } */}
                            <FaRegCircleQuestion />
                        </div>
                    </Tooltip>
                </div>
                <div className="absolute left-28 top-1 z-10 text-xl font-semibold">{props.item.name}</div>
                <div className="absolute left-28 top-8 z-10 text-md">{props.item.description}</div>
                <div className="absolute left-28 bottom-12 z-10 text-xs">HSD: {props.item.expiredDate}</div>
                <div className="absolute right-0 bottom-12 z-10 text-xs">
                    {
                        isExpiredPromotion(props.item) ? <Button disabled>Đã hết hạn</Button> :
                            (
                                !props.promotions.includes(props.item) ?
                                    <Button className="w-24 bg-sky-500 text-white font-semibold text-center"
                                        onClick={() => props.applyDiscount(props.item)}>
                                        Áp dụng
                                    </Button> :
                                    <Button className="w-24 bg-gray-500 text-white font-semibold text-center"
                                        onClick={() => props.removeDiscount(props.item)}>
                                        Hủy
                                    </Button>
                            )

                    }
                </div>
            </div>
        </Card>
    )
}