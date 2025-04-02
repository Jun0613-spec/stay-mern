import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { Accommodation, AccommodationFormData } from "@/types";

import DetailSection from "./detail-section";
import TypeSection from "./type-section";
import FacilitiesSection from "./facilities-section";
import GuestsSection from "./guests-section";
import ImageUploadSection from "./image-upload-section";

import Spinner from "@/components/spinner";
import Button from "@/components/button";

interface ManageAccommodationsFormProps {
  accommodation?: Accommodation;
  onSave: (formData: FormData) => void;
  isLoading: boolean;
}

const ManageAccommodationsForm = ({
  onSave,
  isLoading,
  accommodation
}: ManageAccommodationsFormProps) => {
  const formMethods = useForm<AccommodationFormData>();
  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    reset(accommodation);
  }, [accommodation, reset]);

  const onSubmit = handleSubmit((formDataJson: AccommodationFormData) => {
    const formData = new FormData();

    if (accommodation) {
      formData.append("accommodationId", accommodation.id);
    }

    formData.append("name", formDataJson.name);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("description", formDataJson.description);
    formData.append("type", formDataJson.type);
    formData.append("pricePerNight", formDataJson.pricePerNight.toString());
    formData.append("adultCount", formDataJson.adultCount.toString());
    formData.append("childCount", formDataJson.childCount.toString());

    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    if (formDataJson.imageUrls) {
      formDataJson.imageUrls.forEach((url, index) => {
        formData.append(`imageUrls[${index}]`, url);
      });
    }

    const imageFilesArray = formDataJson.imageFiles
      ? Array.from(formDataJson.imageFiles)
      : [];

    imageFilesArray.forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    });

    onSave(formData);
  });

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={onSubmit} className="space-y-5">
        <DetailSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestsSection />
        <ImageUploadSection />

        <div className="flex justify-end mt-6">
          <Button size="md" disabled={isLoading} type="submit">
            {isLoading ? <Spinner /> : "Save"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default ManageAccommodationsForm;
