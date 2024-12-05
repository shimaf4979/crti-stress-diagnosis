"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/images/iLoveIMG 400x400.png",
  "/images/IMG_8810.png",
  "/images/IMG_8811.png",
];

export function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className='relative w-full h-[600px] overflow-hidden'>
      <AnimatePresence mode='wait'>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt='ストレス診断'
          className='absolute inset-0 w-full h-full object-cover'
          initial={{ opacity: 0, rotateY: -90 }}
          animate={{ opacity: 1, rotateY: 0 }}
          exit={{ opacity: 0, rotateY: 90 }}
          transition={{ duration: 1, type: "spring" }}
        />
      </AnimatePresence>
      <div className='absolute inset-0 bg-black/30' />
    </div>
  );
}
