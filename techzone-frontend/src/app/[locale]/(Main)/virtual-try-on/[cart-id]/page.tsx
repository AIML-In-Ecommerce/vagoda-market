import React from "react";

const VirtualTryOn = () => {
  return (
    <div className="bg-[url('https://res.cloudinary.com/dgsrxvev1/image/upload/v1716347947/dressing_room_c9bl2n.jpg')] bg-center bg-cover bg-no-repeat w-[100vw] h-[100vh] flex flex-col gap-10 justify-center items-center">
      <div className="flex w-[300px] h-[68px] bg-slate-400 text-white justify-center items-center">
        Ảnh của bạn
      </div>
      <div className="w-full h-[70%] flex flex-row justify-center items-center gap-10 ">
        <div className="w-[200px] h-full flex justify-end items-center">
          <div className="w-[80px] h-[264px] bg-slate-400 flex flex-col justify-center items-center text-white">
            <div>A</div>
            <div>B</div>
            <div>C</div>
          </div>
        </div>
        <div className="w-[50%] h-full bg-slate-400 text-white rounded-3xl"></div>
        <div className="w-[220px] h-[68px] bg-slate-400 text-white">Buton</div>
      </div>
    </div>
  );
};

export default VirtualTryOn;
