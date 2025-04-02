import { useState, useRef, useEffect } from "react";
import { FaUserFriends, FaChevronDown } from "react-icons/fa";
import { LuMinus, LuPlus } from "react-icons/lu";

import { cn } from "@/lib/utils";

interface GuestSelectorProps {
  adultCount: number;
  childCount: number;
  onAdultCountChange: (count: number) => void;
  onChildCountChange: (count: number) => void;
}

const GuestSelector = ({
  adultCount,
  childCount,
  onAdultCountChange,
  onChildCountChange
}: GuestSelectorProps) => {
  const [showGuestOptions, setShowGuestOptions] = useState(false);
  const [focused, setFocused] = useState(false);
  const guestOptionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        guestOptionsRef.current &&
        !guestOptionsRef.current.contains(event.target as Node)
      ) {
        setShowGuestOptions(false);
        setFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAdultCount = (value: number) => {
    onAdultCountChange(Math.max(1, Math.min(20, value)));
  };

  const handleChildCount = (value: number) => {
    onChildCountChange(Math.max(0, Math.min(20, value)));
  };

  return (
    <div className="relative flex-1" ref={guestOptionsRef}>
      <div
        className={cn(
          "flex items-center bg-neutral-50 dark:bg-neutral-700 rounded-md px-3 py-2 border transition-all duration-200 cursor-pointer h-12",
          focused || showGuestOptions
            ? "border-indigo-600 dark:border-indigo-800 shadow-inner bg-white dark:bg-neutral-800"
            : "border-neutral-200 hover:border-indigo-400 dark:border-neutral-600 dark:hover:border-indigo-600"
        )}
        onClick={() => {
          setShowGuestOptions(!showGuestOptions);
          setFocused(true);
        }}
      >
        <FaUserFriends
          size={18}
          className="text-neutral-500 dark:text-neutral-300 mr-2 flex-shrink-0"
        />
        <p className=" text-neutral-800 dark:text-neutral-200 text-sm ">
          {adultCount} {adultCount === 1 ? "Adult" : "Adults"}, {childCount}{" "}
          {childCount === 1 ? "Child" : "Children"}
        </p>
        <FaChevronDown
          size={14}
          className={cn(
            "text-neutral-500 dark:text-neutral-300 ml-auto transition-transform duration-200 flex-shrink-0",
            showGuestOptions ? "rotate-180" : ""
          )}
        />
      </div>

      {showGuestOptions && (
        <div
          className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-lg rounded-md p-4 z-10 animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          <h3 className="sr-only">Guest options</h3>
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm text-neutral-800 dark:text-neutral-200 font-medium">
                Adults
              </p>
              <p className="text-neutral-500 dark:text-neutral-400 text-xs">
                Ages 13 or above
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors text-neutral-600 dark:text-neutral-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => handleAdultCount(adultCount - 1)}
                disabled={adultCount <= 1}
              >
                <LuMinus />
              </button>
              <p className="w-6 text-center text-neutral-800 dark:text-neutral-200">
                {adultCount}
              </p>
              <button
                type="button"
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors text-neutral-600 dark:text-neutral-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => handleAdultCount(adultCount + 1)}
                disabled={adultCount >= 20}
              >
                <LuPlus />
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-neutral-800 dark:text-neutral-200 font-medium">
                Children
              </p>
              <p className="text-neutral-500 dark:text-neutral-400 text-xs">
                Ages 2-12
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors text-neutral-600 dark:text-neutral-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => handleChildCount(childCount - 1)}
                disabled={childCount <= 0}
              >
                <LuMinus />
              </button>
              <span className="w-6 text-center text-neutral-800 dark:text-neutral-200">
                {childCount}
              </span>
              <button
                type="button"
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors text-neutral-600 dark:text-neutral-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => handleChildCount(childCount + 1)}
                disabled={childCount >= 20}
              >
                <LuPlus />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestSelector;
