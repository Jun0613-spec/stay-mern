import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { FiLogIn, FiCalendar } from "react-icons/fi";

import "react-datepicker/dist/react-datepicker.css";

import { GuestInfoFormData } from "@/types";

import { useSearch } from "@/contexts/search-context";

import Button from "@/components/button";

import { useAuth } from "@/contexts/auth-context";
import { FaChildren, FaUser } from "react-icons/fa6";

interface GuestInfoFormProps {
  accommodationId: string;
  pricePerNight: number;
}

const GuestInfoForm = ({
  accommodationId,
  pricePerNight
}: GuestInfoFormProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const search = useSearch();
  const { isLoggedIn } = useAuth();

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<GuestInfoFormData>({
    defaultValues: {
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adultCount: search.adultCount,
      childCount: search.childCount
    }
  });

  const [checkIn, checkOut] = watch(["checkIn", "checkOut"]);
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const calculateNightCount = () => {
    if (!checkIn || !checkOut) return 0;
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const onLoginClick = (data: GuestInfoFormData) => {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );

    navigate("/login", { state: { from: location } });
  };

  const onSubmit = (data: GuestInfoFormData) => {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );

    navigate(`/accommodation/${accommodationId}/booking`);
  };

  return (
    <div className="flex flex-col p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700 gap-4">
      <div className="flex items-end gap-1">
        <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
          £{pricePerNight}
        </h3>
        <span className="text-neutral-600 dark:text-neutral-400 text-sm">
          / night
        </span>
      </div>

      <form
        onSubmit={
          isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onLoginClick)
        }
      >
        <div className="space-y-3">
          {/* Date Pickers */}
          <div className="space-y-1">
            <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300">
              Stay dates
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div className="relative">
                <DatePicker
                  required
                  selected={checkIn}
                  onChange={(date) => setValue("checkIn", date as Date)}
                  selectsStart
                  startDate={checkIn}
                  endDate={checkOut}
                  minDate={minDate}
                  maxDate={maxDate}
                  placeholderText="Check-in"
                  className="w-full pl-8 pr-3 py-1.5 rounded-md border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-neutral-900 dark:text-white text-sm"
                />
                <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 dark:text-neutral-500" />
              </div>
              <div className="relative">
                <DatePicker
                  required
                  selected={checkOut}
                  onChange={(date) => setValue("checkOut", date as Date)}
                  selectsEnd
                  startDate={checkIn}
                  endDate={checkOut}
                  minDate={checkIn || minDate}
                  maxDate={maxDate}
                  placeholderText="Check-out"
                  className="w-full pl-8 pr-3 py-1.5 rounded-md border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-neutral-900 dark:text-white text-sm"
                />
                <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 dark:text-neutral-500" />
              </div>
            </div>
          </div>

          {/* Guest Count */}
          <div className="space-y-1">
            <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300">
              Guests
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div className="relative">
                <label className="sr-only">Adults</label>
                <div className="flex items-center gap-1 px-3 py-1.5 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-700">
                  <FaUser className="text-neutral-500 dark:text-neutral-400" />
                  <input
                    className="w-full bg-transparent focus:outline-none text-neutral-900 dark:text-white text-sm"
                    type="number"
                    min={1}
                    max={20}
                    {...register("adultCount", {
                      required: "At least one adult is required",
                      min: {
                        value: 1,
                        message: "Minimum 1 adult"
                      },
                      valueAsNumber: true
                    })}
                  />
                </div>
              </div>
              <div className="relative">
                <label className="sr-only">Children</label>
                <div className="flex items-center gap-1 px-3 py-1.5 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-700">
                  <FaChildren className="text-neutral-500 dark:text-neutral-400 w-5 h-5" />
                  <input
                    className="w-full bg-transparent focus:outline-none text-neutral-900 dark:text-white text-sm"
                    type="number"
                    min={0}
                    max={20}
                    {...register("childCount", {
                      valueAsNumber: true
                    })}
                  />
                </div>
              </div>
            </div>
            {errors.adultCount && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                {errors.adultCount.message}
              </p>
            )}
          </div>

          {/* Price Summary */}
          {checkIn && checkOut && (
            <div className="bg-blue-50 dark:bg-indigo-900/20 p-3 rounded-md space-y-1">
              <div className="flex justify-between text-xs">
                <p className="text-neutral-600 dark:text-neutral-300">
                  £{pricePerNight} × {calculateNightCount()} nights
                </p>
                <p className="font-medium">
                  £{(pricePerNight * calculateNightCount()).toFixed(2)}
                </p>
              </div>
              <div className="border-t border-neutral-300 dark:border-neutral-600 pt-1 flex justify-between font-semibold">
                <p className="text-neutral-800 dark:text-neutral-200 text-sm">
                  Total
                </p>
                <p className="text-blue-600 dark:text-blue-400 text-sm">
                  £{(pricePerNight * calculateNightCount()).toFixed(2)}
                </p>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="md"
            className="w-full flex items-center justify-center gap-2"
          >
            {isLoggedIn ? (
              <p className="font-bold">Book Now</p>
            ) : (
              <>
                <p>Login</p>
                <FiLogIn className="w-5 h-5" />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default GuestInfoForm;
