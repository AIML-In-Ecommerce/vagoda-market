// "use client";

// const imgs = [
//   "https://res.cloudinary.com/dgsrxvev1/image/upload/v1716443926/vn-11134207-7r98o-lp8u23rvrf4r40_hcpkjk.jpg",
//   "https://res.cloudinary.com/dgsrxvev1/image/upload/v1716443927/%C3%A1o_thun_cppclk.jpg",
//   "https://res.cloudinary.com/dgsrxvev1/image/upload/v1716443927/l%E1%BA%A3utent_qwmpog.jpg",
//   "https://res.cloudinary.com/dgsrxvev1/image/upload/v1716443927/thun_n0jgqa.jpg",
//   "https://res.cloudinary.com/dgsrxvev1/image/upload/v1716443927/l%E1%BA%A3utent_qwmpog.jpg",
// ];

// import { Swiper, SwiperSlide } from "swiper/react";

// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/free-mode";

// import { FreeMode, Pagination } from "swiper/modules";

// import { RxArrowTopRight } from "react-icons/rx";

// const SwipeCarousel = () => {
//   return (
//     <div className="flex items-center justify-center flex-col h-[900px] bg-[#6c34af]">
//       <Swiper
//         breakpoints={{
//           340: {
//             slidesPerView: 2,
//             spaceBetween: 15,
//           },
//           700: {
//             slidesPerView: 3,
//             spaceBetween: 15,
//           },
//         }}
//         freeMode={true}
//         pagination={{
//           clickable: true,
//         }}
//         modules={[FreeMode, Pagination]}
//         className="max-w-[90%] lg:max-w-[80%]"
//       >
//         {imgs.map((item, index) => (
//           <SwiperSlide key={imgs[index]}>
//             <div className="flex flex-col gap-6 mb-20 group relative shadow-lg text-white rounded-xl px-6 py-8 h-[250px] w-[215px] lg:h-[400px] lg:w-[350px] overflow-hidden cursor-pointer">
//               <div
//                 className="absolute inset-0 bg-cover bg-center"
//                 style={{ backgroundImage: `url(${item[index]})` }}
//               />
//               <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-50" />
//               <div className="relative flex flex-col gap-3">
//                 {/* <item.icon className="text-blue-600 group-hover:text-blue-400 w-[32px] h-[32px]" /> */}
//                 <h1 className="text-xl lg:text-2xl">{item[index]} </h1>
//                 <p className="lg:text-[18px]">{item[index]} </p>
//               </div>
//               <RxArrowTopRight className="absolute bottom-5 left-5 w-[35px] h-[35px] text-white group-hover:text-blue-500 group-hover:rotate-45 duration-100" />
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default SwipeCarousel;
