import { useFormContext } from "react-hook-form";

import { AccommodationFormData } from "@/types";

import { accommodationFacilities } from "@/lib/constants";
import { cn } from "@/lib/utils";

const FacilitiesSection = () => {
  const {
    register,
    watch,
    formState: { errors }
  } = useFormContext<AccommodationFormData>();

  const selectedFacilities: string[] = watch("facilities") || [];

  return (
    <section className="mt-6 space-y-6">
      <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">
        Facilities
      </h2>

      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5  gap-4">
        {accommodationFacilities.map((facility) => {
          const isSelected = selectedFacilities.includes(facility.label);

          return (
            <label
              key={facility.label}
              className={cn(
                "flex items-center gap-2 cursor-pointer text-sm transition-colors duration-200",
                isSelected
                  ? "text-indigo-600 dark:text-indigo-400"
                  : "text-neutral-700 dark:text-neutral-300 hover:text-indigo-600 dark:hover:text-indigo-400"
              )}
            >
              <input
                type="checkbox"
                value={facility.label}
                {...register("facilities", {
                  validate: (facilities) =>
                    facilities && facilities.length > 0
                      ? true
                      : "At least one facility is required"
                })}
                className="h-4 w-4 rounded text-indigo-600 dark:text-indigo-800 border-neutral-300 dark:border-neutral-600 dark:bg-neutral-800 focus:ring-indigo-500"
              />
              {facility.icon && <facility.icon className="w-5 h-5" />}
              <p>{facility.label}</p>
            </label>
          );
        })}
      </div>

      {errors.facilities && (
        <p className="text-red-500 dark:text-red-600">
          {errors.facilities.message}
        </p>
      )}
    </section>
  );
};

export default FacilitiesSection;
