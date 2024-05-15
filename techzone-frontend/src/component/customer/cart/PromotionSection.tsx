import { Card, Skeleton, Tooltip } from 'antd';
import React from 'react'
import { FaRegCircleQuestion } from 'react-icons/fa6';
import { TiTicket } from 'react-icons/ti';
import PromotionCard from '../product/PromotionCard';
import { PromotionType } from '@/model/PromotionType';

interface PromotionSectionProps {
  loading: boolean;
  showPromotionModal: () => void;
  selectedDiscounts: any;
  allPromotions: any;
  applyDiscount: (promotion: PromotionType) => void;
  removeDiscount: (promotion: PromotionType) => void;
}

const promotion_help = "Áp dụng tối đa 1 Mã giảm giá Sản Phẩm và 1 Mã Vận Chuyển";

const parseDateString = (dateString: string) => {
  const [timePart, datePart] = dateString.split(' ');
  const [hours, minutes] = timePart.split(':').map(Number);
  const [day, month, year] = datePart.split('/').map(Number);

  // JavaScript months are 0-indexed, so we subtract 1 from the month
  return new Date(year, month - 1, day, hours, minutes);
};

const compareDateString = (dateString1: string, dateString2: string) => {
  return parseDateString(dateString1) <= parseDateString(dateString2) ? 1 : -1;
};

export default function PromotionSection(props: PromotionSectionProps) {
  return (
    <div>
      <div className="flex flex-col">
        {props.loading ? <Skeleton active /> : (<div className="bg-white px-4 py-2 flex flex-col">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-2">
              <div className="font-semibold">Khuyến Mãi</div>
              <div>(Đã chọn {props.selectedDiscounts.length})</div>
            </div>
            <div className="flex flex-row space-x-2">
              <div className="text-slate-500">Có thể chọn 2</div>
              <Tooltip placement="bottom" title={promotion_help}>
                <div className="text-slate-500"><FaRegCircleQuestion /></div>
              </Tooltip>
            </div>
          </div>
          <div className="mt-5 flex flex-row gap-5 overflow-x-auto overflow-y-hidden">
            {
              props.selectedDiscounts.sort(
                (a: { expiredDate: string; }, b: { expiredDate: string; }) => compareDateString(a.expiredDate!, b.expiredDate!)
              ).map((item: PromotionType) => {
                return (
                  <PromotionCard
                    key={item._id}
                    item={item}
                    promotions={props.allPromotions}
                    applyDiscount={props.applyDiscount}
                    removeDiscount={props.removeDiscount} />
                )
              })
            }
          </div>
          <div className="mt-10 flex gap-2 text-sky-500 hover:text-blue-700 font-semibold"
            onClick={() => props.showPromotionModal()}>
            <TiTicket className="text-lg self-center" />
            <div>Chọn hoặc nhập Khuyến mãi khác</div>
          </div>
        </div>
        )}
      </div>
    </div>
  )
}
