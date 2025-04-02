import { useFormContext } from "react-hook-form";

import { AccommodationFormData } from "@/types";

const GuestsSection = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext<AccommodationFormData>();

  return (
    <section className="mt-6 space-y-6">
      <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100 mb-3">
        Guests
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <label className="text-neutral-700 dark:text-neutral-200 text-sm font-semibold">
          Adults
          <input
            className="border rounded w-full py-2 px-3 "
            type="number"
            min={1}
            max={20}
            {...register("adultCount", {
              required: "This field is required"
            })}
          />
          {errors.adultCount?.message && (
            <span className="text-red-500 dark:text-red-600 ">
              {errors.adultCount?.message}
            </span>
          )}
        </label>
        <label className="text-neutral-700 dark:text-neutral-200 text-sm font-semibold">
          Children
          <input
            className="border rounded w-full py-2 px-3 "
            type="number"
            min={0}
            max={20}
            {...register("childCount", {
              required: "This field is required"
            })}
          />
          {errors.childCount?.message && (
            <span className="text-red-500 text-sm fold-bold">
              {errors.childCount?.message}
            </span>
          )}
        </label>
      </div>
    </section>
  );
};

export default GuestsSection;
