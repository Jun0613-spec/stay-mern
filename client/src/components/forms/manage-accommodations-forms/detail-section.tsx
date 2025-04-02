import { useFormContext } from "react-hook-form";
import { useLocation } from "react-router-dom";

import { AccommodationFormData } from "@/types";

const DetailSection = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext<AccommodationFormData>();

  const location = useLocation();

  const sectionTitle =
    location.pathname === "/list-accommodation"
      ? "List your accommodation"
      : location.pathname.startsWith("/edit-accommodation")
      ? "Edit your accommodation"
      : "";

  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold mb-3">{sectionTitle}</h1>

      <label className="text-sm font-bold">
        Name
        <input
          type="text"
          className="border rounded w-full py-1 px-2"
          placeholder="Enter accommodation name"
          {...register("name", { required: "This field is required" })}
        />
        {errors.name && (
          <span className="text-red-500 dark:text-red-600">
            {errors.name.message}
          </span>
        )}
      </label>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="text-sm font-bold">Country</label>
          <input
            type="text"
            className="border rounded w-full py-1 px-2"
            placeholder="Enter country"
            {...register("country", { required: "This field is required" })}
          />
          {errors.country && (
            <span className="text-red-500 dark:text-red-600">
              {errors.country.message}
            </span>
          )}
        </div>

        <div className="flex-1">
          <label className="text-sm font-bold">City</label>
          <input
            type="text"
            className="border rounded w-full py-1 px-2"
            placeholder="Enter city"
            {...register("city", { required: "This field is required" })}
          />
          {errors.city && (
            <span className="text-red-500 dark:text-red-600">
              {errors.city.message}
            </span>
          )}
        </div>
      </div>

      <label className="text-sm font-bold">
        Description
        <textarea
          rows={10}
          className="border rounded w-full py-1 px-2"
          placeholder="Enter the description"
          {...register("description", { required: "This field is required" })}
        />
        {errors.description && (
          <span className="text-red-500 dark:text-red-600">
            {errors.description.message}
          </span>
        )}
      </label>

      <label className="text-sm font-bold ">
        Price Per Night
        <input
          type="number"
          min={10}
          className="border rounded w-full py-1 px-2"
          placeholder="Enter price per night"
          {...register("pricePerNight", {
            required: "This field is required"
          })}
        />
        {errors.pricePerNight && (
          <span className="text-red-500 dark:text-red-600">
            {errors.pricePerNight.message}
          </span>
        )}
      </label>
    </section>
  );
};

export default DetailSection;
