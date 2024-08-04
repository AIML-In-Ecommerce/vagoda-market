"use client";
import { PromotionType } from '@/model/PromotionType';
import { Input, Modal, Space, Button, Skeleton, Card, Empty, Tooltip } from 'antd';
import React, { useEffect } from 'react'
import { FaRegCircleQuestion } from 'react-icons/fa6';
import PromotionCard from '../product/PromotionCard';

type ShopInfo = {
    _id: string,
    name: string,
}

type PromotionDisplay = {
    shopInfo: ShopInfo,
    promotions: PromotionType[]
}

interface PromotionListModalProps {
    loading: boolean;
    open: boolean;
    currentCode: string;
    handleCodeFilter: (code: string) => void;
    handleOKPromotionModal: () => void;
    handleCancelPromotionModal: () => void;
    queryPromotionList: PromotionDisplay[] | undefined;
    selectedPromotions: PromotionType[];
    applyDiscount: (promotion: PromotionType) => void;
    removeDiscount: (promotion: PromotionType) => void;
}

export default function PromotionListModal(props: PromotionListModalProps) {
    const promotion_help = "Áp dụng tối đa 1 Mã giảm giá Sản Phẩm Mỗi Cửa Hàng";

    useEffect(() => {
        // console.log("Inside modal", props.queryPromotionList);
    }, [props.open, props.queryPromotionList])
    return (
        <React.Fragment>
            <Modal
                width={550}
                open={props.open}
                onOk={() => props.handleOKPromotionModal()}
                onCancel={() => props.handleCancelPromotionModal()}
                title={<span className="text-xl">Các Khuyến Mãi</span>}
                footer={null}
                centered>
                {
                    <div className="flex flex-col">
                        <Space direction="vertical">
                            <div className="flex gap-5 mt-5 border rounded bg-slate-100 p-5">
                                <Input placeholder="Nhập để tìm mã"
                                    value={props.currentCode}
                                    onChange={(e) => props.handleCodeFilter(e.target.value)}></Input>
                                <Button className="bg-blue-500 font-semibold text-white"
                                    onClick={() => props.handleCodeFilter(props.currentCode)}>Áp dụng</Button>
                            </div>
                            <div className="overflow-auto h-96">
                                {
                                    props.loading ? <Skeleton active /> : (props.queryPromotionList) ? props.queryPromotionList.map((item: PromotionDisplay) => {
                                        return (
                                            <Card key={item.shopInfo._id} title={<div className="font-semibold">{item.shopInfo.name}</div>}>
                                                <div className="flex flex-col gap-5 mx-3">
                                                    {
                                                        item.promotions.length > 0 ? item.promotions.sort(
                                                            (a, b) => (a.expiredDate! >= b.expiredDate! ? -1 : 1)
                                                        ).map(item => {

                                                            const isExpiredPromotion = (item: PromotionType) => {
                                                                return item.expiredDate <= new Date();
                                                            }
                                                            if (isExpiredPromotion(item)) return;

                                                            const isSelected =
                                                                props.selectedPromotions.find(selected => selected._id === item._id) ? true : false;


                                                            return (
                                                                <PromotionCard
                                                                    key={item._id}
                                                                    item={item}
                                                                    isSelected={isSelected}
                                                                    applyDiscount={props.applyDiscount}
                                                                    removeDiscount={props.removeDiscount} />
                                                            )
                                                        }) : <Empty description="Không có promotion khả dụng" />
                                                    }
                                                </div>
                                            </Card>
                                        )
                                    }) : <Empty description="Không có promotion khả dụng" />
                                }
                            </div>
                            <div className="my-5 flex flex-row justify-center items-center">
                                <div>Bạn đã chọn &nbsp;</div>
                                <div className={`${props.selectedPromotions.length > 0 ? "text-red-500" : ""} font-bold text-2xl`}>
                                    {props.selectedPromotions.length}
                                </div>
                                <div>&nbsp; mã giảm giá Sản Phẩm &nbsp;</div>
                                <Tooltip title={promotion_help}>
                                    <div className="text-slate-500"><FaRegCircleQuestion /></div>
                                </Tooltip>
                            </div>
                        </Space>
                    </div>
                }
            </Modal>
        </React.Fragment>
    )
}
