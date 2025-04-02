import { useParams } from "react-router-dom";

import ManageAccommodationsForm from "@/components/forms/manage-accommodations-forms/manage-accommodations-form";

import { useGetMyAccommodationById } from "@/hooks/my-accommodations/use-get-my-accommodation-by-id";
import { useUpdateAccommodation } from "@/hooks/my-accommodations/use-update-accommodation";

const EditAccommodation = () => {
  const { accommodationId } = useParams();

  const { data: accommodation } = useGetMyAccommodationById(
    accommodationId as string
  );
  const { mutate: updateAccommodation, isPending } = useUpdateAccommodation();

  const handleSave = (formData: FormData) => {
    if (accommodationId) {
      updateAccommodation({
        accommodationId: accommodationId,
        formData: formData
      });
    }
  };

  return (
    <ManageAccommodationsForm
      accommodation={accommodation}
      onSave={handleSave}
      isLoading={isPending}
    />
  );
};

export default EditAccommodation;
