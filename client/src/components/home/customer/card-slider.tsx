import { useState, useEffect } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

import DestinationCard from "./destination-card";

import { Accommodation } from "@/types";

interface CardSliderProps {
  accommodations: Accommodation[];
}

const CardSlider = ({ accommodations }: CardSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [itemsPerSlide, setItemsPerSlide] = useState<number>(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerSlide(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerSlide(2);
      } else {
        setItemsPerSlide(4);
      }

      setCurrentIndex(0);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    if (canGoNext) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (canGoPrev) {
      setCurrentIndex((prev) => Math.max(0, prev - 1));
    }
  };

  const canGoNext = currentIndex < accommodations.length - itemsPerSlide;
  const canGoPrev = currentIndex > 0;

  return (
    <div className="relative overflow-hidden w-full">
      {/* Slider container */}
      <div
        className="flex transition-transform duration-300"
        style={{
          transform: `translateX(-${currentIndex * (100 / itemsPerSlide)}%)`
        }}
      >
        {accommodations.map((accommodation) => {
          return (
            <div
              key={accommodation.id}
              className="px-2 flex-shrink-0"
              style={{ width: `${100 / itemsPerSlide}%` }}
            >
              <DestinationCard accommodation={accommodation} />
            </div>
          );
        })}
      </div>

      {/* Navigation buttons */}
      {accommodations.length > itemsPerSlide && (
        <>
          {canGoPrev && (
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-neutral-50 dark:bg-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-600 p-2 rounded-full shadow-md cursor-pointer z-10"
            >
              <FaAngleLeft />
            </button>
          )}
          {canGoNext && (
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-neutral-50 dark:bg-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-600 p-2 rounded-full shadow-md cursor-pointer z-10"
            >
              <FaAngleRight />
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default CardSlider;
