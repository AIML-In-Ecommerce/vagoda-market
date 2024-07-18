import { Skeleton, Tooltip } from 'antd';
import React, { ReactElement } from 'react'
import { FaRegCircleQuestion } from 'react-icons/fa6';
import { TiTicket } from 'react-icons/ti';
import PromotionCard from '../product/PromotionCard';
import { PromotionType } from '@/model/PromotionType';


interface PromotionSectionProps {
  loading: boolean;
  selectedProducts: any[];
  openNotification: (message: string, content: ReactElement) => void;
  showPromotionModal: () => Promise<void>;
  selectedDiscounts: PromotionType[];
  applyDiscount: (promotion: PromotionType) => void;
  removeDiscount: (promotion: PromotionType) => void;
}

const promotion_help = "Áp dụng tối đa 1 Mã giảm giá Sản Phẩm mỗi Cửa hàng";

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

// const IncrementProgressBar = (props: any) => {
//   const [percent, setPercent] = useState(0);

//   useEffect(() => {
//     const duration = props.durationInMiliseconds; // 4 seconds
//     const intervalTime = 100; // update every 100ms
//     const increment = 100 / (duration / intervalTime);

//     const interval = setInterval(() => {
//       setPercent((prevPercent) => {
//         if (prevPercent + increment >= 100) {
//           clearInterval(interval);
//           return 100;
//         }
//         return prevPercent + increment;
//       });
//     }, intervalTime);

//     return () => clearInterval(interval);
//   }, []);

//   return <Progress showInfo={false} percent={percent} />;
// };




export default function PromotionSection(props: PromotionSectionProps) {
  // notification

  const handleShowPromotionModal = async () => {
    if (props.selectedProducts && props.selectedProducts.length > 0) {
        return props.showPromotionModal();
    }
    else {
        // const message = "Thông báo";
        const description = "Không thể áp dụng mã giảm giá khi chưa chọn sản phẩm. Vui lòng chọn sản phẩm bất kỳ trong giỏ hàng.";
        // openNotification(description, <IncrementProgressBar durationInMiliseconds={durationInMiliseconds}/>);
        props.openNotification(description, <></>);
    }
    
  }
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
              {/* <div className="text-slate-500"></div> */}
              <Tooltip placement="bottom" title={promotion_help}>
                <div className="text-slate-500"><FaRegCircleQuestion /></div>
              </Tooltip>
            </div>
          </div>
          <div className="mt-5 flex flex-col lg:grid lg:grid-cols-2 gap-5 overflow-x-auto overflow-y-hidden">
            {
              props.selectedDiscounts.sort((a, b) => a.expiredDate > b.expiredDate ? -1 : 1
              ).map((item: PromotionType) => {
                return (
                  <PromotionCard
                    key={item._id}
                    item={item}
                    isSelected={props.selectedDiscounts.includes(item)}
                    applyDiscount={props.applyDiscount}
                    removeDiscount={props.removeDiscount} />
                )
              })
            }
          </div>
          <div className="mt-10 flex gap-2 text-sky-500 hover:text-blue-700 font-semibold"
            onClick={async () => await handleShowPromotionModal()}>
            <TiTicket className="text-lg self-center" />
            <div>Chọn hoặc nhập Khuyến mãi khác</div>
          </div>
        </div>
        )}
      </div>
    </div>
  )
}
