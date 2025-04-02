import { useFormContext } from "react-hook-form";

import { AccommodationFormData } from "@/types";

import { cn } from "@/lib/utils";
import { accommodationTypes } from "@/lib/constants";

const TypeSection = () => {
  const {
    register,
    watch,
    formState: { errors }
  } = useFormContext<AccommodationFormData>();

  const selectedType = watch("type");

  return (
    <section className="mt-6 space-y-4">
      <h2 className="font-semibold">Accommodation Type</h2>

      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4">
        {accommodationTypes.map((accommodationType) => (
          <label
            key={accommodationType.label}
            className={cn(
              "cursor-pointer rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-300 ease-in-out",
              selectedType === accommodationType.label
                ? "bg-indigo-600 text-white dark:bg-indigo-800 dark:text-white"
                : "bg-indigo-50 text-indigo-800 dark:bg-indigo-500 dark:text-indigo-100",
              "hover:bg-indigo-500 hover:text-white focus:ring-2 focus:ring-indigo-500 dark:hover:bg-indigo-800 dark:hover:text-white"
            )}
          >
            <input
              id={accommodationType.label}
              type="radio"
              value={accommodationType.label}
              {...register("type", { required: "This field is required" })}
              className="hidden"
            />
            <div className="flex items-center gap-2">
              <accommodationType.icon className="w-5 h-5" />
              <p>{accommodationType.label}</p>
            </div>
          </label>
        ))}
      </div>

      {errors.type && (
        <p className="text-red-500 dark:text-red-600">{errors.type.message}</p>
      )}
    </section>
  );
};

export default TypeSection;
