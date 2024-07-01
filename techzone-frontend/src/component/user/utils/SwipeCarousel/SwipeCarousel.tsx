"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

// const imgs: string[] = [
//   "https://res.cloudinary.com/dgsrxvev1/image/upload/v1705337097/samples/ecommerce/accessories-bag.jpg",
//   "https://res.cloudinary.com/dgsrxvev1/image/upload/v1705337095/samples/people/bicycle.jpg",
//   "https://res.cloudinary.com/dgsrxvev1/image/upload/v1705337094/samples/landscapes/architecture-signs.jpg",
//   "https://res.cloudinary.com/dgsrxvev1/image/upload/v1705337092/samples/bike.jpg",
//   "https://res.cloudinary.com/dgsrxvev1/image/upload/v1705337089/samples/food/pot-mussels.jpg",
// ];

const ONE_SECOND: number = 1000;
const AUTO_DELAY: number = ONE_SECOND * 10;
const DRAG_BUFFER: number = 50;

const SPRING_OPTIONS = {
  type: "spring",
  mass: 3,
  stiffness: 400,
  damping: 50,
};

interface SwipeCarouselProps {
  imgs: string[];
}

export const SwipeCarousel: React.FC<SwipeCarouselProps> = ({ imgs }) => {
  const [imgIndex, setImgIndex] = useState<number>(0);

  const dragX = useMotionValue<number>(0);

  useEffect(() => {
    const intervalRef = setInterval(() => {
      const x: number = dragX.get();

      if (x === 0) {
        setImgIndex((pv) => {
          if (pv === imgs.length - 1) {
            return 0;
          }
          return pv + 1;
        });
      }
    }, AUTO_DELAY);

    return () => clearInterval(intervalRef);
  }, []);

  const onDragEnd = () => {
    const x: number = dragX.get();

    if (x <= -DRAG_BUFFER && imgIndex < imgs.length - 1) {
      setImgIndex((pv) => pv + 1);
    } else if (x >= DRAG_BUFFER && imgIndex > 0) {
      setImgIndex((pv) => pv - 1);
    }
  };

  return (
    <div className="relative overflow-hidden bg-neutral-950 py-8">
      <motion.div
        drag="x"
        dragConstraints={{
          left: 0,
          right: 0,
        }}
        style={{
          x: dragX,
        }}
        animate={{
          translateX: `-${imgIndex * 80}%`,
        }}
        transition={SPRING_OPTIONS}
        onDragEnd={onDragEnd}
        className="flex cursor-grab items-center active:cursor-grabbing"
      >
        <Images imgIndex={imgIndex} imgs={imgs} />
      </motion.div>

      <Dots imgIndex={imgIndex} setImgIndex={setImgIndex} imgs={imgs} />
      <GradientEdges />
    </div>
  );
};

const Images: React.FC<{ imgIndex: number; imgs: string[] }> = ({
  imgIndex,
  imgs,
}) => {
  return (
    <>
      {imgs.map((imgSrc, idx) => {
        return (
          <motion.div
            key={idx}
            style={{
              backgroundImage: `url(${imgSrc})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "100%", // Set width to 60%
              marginLeft: "10%", // Center the image
            }}
            animate={{
              scale: imgIndex === idx ? 0.95 : 0.85,
            }}
            transition={SPRING_OPTIONS}
            className="aspect-square w-[200px] shrink-0 rounded-xl bg-neutral-800 object-cover"
          />
        );
      })}
    </>
  );
};

const Dots: React.FC<{
  imgIndex: number;
  setImgIndex: React.Dispatch<React.SetStateAction<number>>;
  imgs: string[];
}> = ({ imgIndex, setImgIndex, imgs }) => {
  return (
    <div className="mt-2 flex w-full justify-center gap-2">
      {imgs.map((_, idx) => {
        return (
          <button
            key={idx}
            onClick={() => setImgIndex(idx)}
            className={`h-1 w-1 md:h-3 md:w-3 rounded-full transition-colors ${
              idx === imgIndex ? "bg-darkGray " : "bg-lightGray"
            }`}
          />
        );
      })}
    </div>
  );
};

const GradientEdges: React.FC = () => {
  return (
    <>
      <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-r from-neutral-950/50 to-neutral-950/0" />
      <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-l from-neutral-950/50 to-neutral-950/0" />
    </>
  );
};
