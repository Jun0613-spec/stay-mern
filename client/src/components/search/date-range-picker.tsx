import { useState, useRef, useEffect } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { LuMinus } from "react-icons/lu";

import { cn } from "@/lib/utils";

interface DateRangePickerProps {
  checkIn: string;
  checkOut: string;
  onCheckInChange: (date: string) => void;
  onCheckOutChange: (date: string) => void;
}

const DateRangePicker = ({
  checkIn,
  checkOut,
  onCheckInChange,
  onCheckOutChange
}: DateRangePickerProps) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [focused, setFocused] = useState(false);

  const datePickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        setShowDatePicker(false);
        setFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const getMaxDate = () => {
    const oneYearLater = new Date();
    oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
    return oneYearLater.toISOString().split("T")[0];
  };

  const formatDisplayDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "short"
    };
    return date.toLocaleDateString("en-UK", options);
  };

  return (
    <div className="relative flex-1" ref={datePickerRef}>
      <div
        className={cn(
          "flex items-center bg-neutral-50 dark:bg-neutral-700 rounded-md px-3 py-2 border transition-all duration-200 cursor-pointer h-12",
          focused || showDatePicker
            ? "border-indigo-600 dark:border-indigo-800 shadow-inner bg-white dark:bg-neutral-800"
            : "border-neutral-200 hover:border-indigo-400 dark:border-neutral-600 dark:hover:border-indigo-600"
        )}
        onClick={() => {
          setShowDatePicker(!showDatePicker);
          setFocused(true);
        }}
      >
        <FaRegCalendarAlt
          size={16}
          className="text-neutral-500 dark:text-neutral-300 mr-2 flex-shrink-0"
        />
        <div className="flex items-center gap-1 flex-1">
          <p className="text-neutral-800 dark:text-neutral-200 text-sm min-w-[120px] text-center">
            {checkIn ? formatDisplayDate(checkIn) : "Check-in"}
          </p>

          <LuMinus />

          <p className="text-neutral-800 dark:text-neutral-200 text-sm min-w-[120px] text-center">
            {checkOut ? formatDisplayDate(checkOut) : "Check-out"}
          </p>
        </div>
      </div>

      {showDatePicker && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-lg rounded-md p-4 z-10 animate-fadeIn grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="check-in"
              className="block text-sm font-medium text-neutral-800 dark:text-neutral-200 mb-1"
            >
              Check-in
            </label>
            <input
              type="date"
              id="check-in"
              value={checkIn}
              min={getMinDate()}
              max={getMaxDate()}
              onChange={(e) => {
                onCheckInChange(e.target.value);
                // If check-out is before new check-in, update check-out
                if (e.target.value && checkOut && e.target.value > checkOut) {
                  onCheckOutChange(e.target.value);
                }
              }}
              className="w-full bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-md px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="check-out"
              className="block text-sm font-medium text-neutral-800 dark:text-neutral-200 mb-1"
            >
              Check-out
            </label>
            <input
              type="date"
              id="check-out"
              value={checkOut}
              min={checkIn || getMinDate()}
              max={getMaxDate()}
              onChange={(e) => onCheckOutChange(e.target.value)}
              className="w-full bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-md px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
