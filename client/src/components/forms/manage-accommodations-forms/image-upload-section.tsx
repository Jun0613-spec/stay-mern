import { useFormContext } from "react-hook-form";
import { MdCancel } from "react-icons/md";

import { useRef, useState } from "react";

import { AccommodationFormData } from "@/types";

import Button from "@/components/button";
const ImageUploadSection = () => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    formState: { errors },
    watch,
    setValue
  } = useFormContext<AccommodationFormData>();

  const existingImageUrls = watch("imageUrls");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      // Preview selected images
      const newPreviews = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );

      // Add the new previews to the state
      setImagePreviews((prev) => [...prev, ...newPreviews]);

      // Set the files directly to form state
      setValue("imageFiles", files); // Set the FileList directly
    }
  };

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUrl: string
  ) => {
    event.preventDefault();

    setImagePreviews(imagePreviews.filter((url) => url !== imageUrl));

    setValue(
      "imageUrls",
      existingImageUrls.filter((url) => url !== imageUrl)
    );
  };

  return (
    <section className="mt-8 space-y-6 ">
      <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100 mb-3">
        Images
      </h2>
      <div className="border rounded p-4 flex flex-col gap-4">
        {/* Display existing images */}
        {(existingImageUrls?.length || imagePreviews.length) > 0 && (
          <div className="grid grid-cols-6 gap-4">
            {existingImageUrls?.map((url) => (
              <div className="relative group" key={url}>
                <img
                  src={url}
                  className="object-cover h-32 w-full rounded"
                  alt="Accommodation Images"
                />
                <Button
                  onClick={(event) => handleDelete(event, url)}
                  variant="danger"
                  size="sm"
                  className="absolute top-2 right-2 p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MdCancel className="w-4 h-4" />
                </Button>
              </div>
            ))}
            {/* Previwes images */}
            {imagePreviews.map((previewUrl, index) => (
              <div className="relative group" key={index}>
                <img
                  src={previewUrl}
                  className="object-cover h-32 w-full rounded"
                  alt="Image Preview"
                />
                <Button
                  onClick={(event) => handleDelete(event, previewUrl)}
                  variant="danger"
                  size="sm"
                  className="absolute top-2 right-2 p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MdCancel className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Image upload input */}
        <input
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const files = imageFiles || [];
              const totalLength =
                files.length + (existingImageUrls?.length || 0);

              if (totalLength === 0) {
                return "At least one image should be added";
              }

              if (totalLength > 6) {
                return "Total number of images cannot be more than 6";
              }

              return true;
            }
          })}
          onChange={handleFileChange}
          ref={inputRef}
        />

        <Button
          type="button"
          variant="primary"
          size="sm"
          onClick={() => inputRef.current?.click()}
        >
          Upload Images
        </Button>
      </div>

      {/* Validation error message */}
      {errors.imageFiles && (
        <span className="text-red-500 dark:text-red-600">
          {errors.imageFiles.message}
        </span>
      )}
    </section>
  );
};

export default ImageUploadSection;
