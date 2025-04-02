import ManageAccommodationsForm from "@/components/forms/manage-accommodations-forms/manage-accommodations-form";

import { useCreateAccommodation } from "@/hooks/my-accommodations/use-create-accommodation";

const ListAccommodation = () => {
  const { mutate: createAccommodation, isPending } = useCreateAccommodation();

  const handleSave = (formData: FormData) => {
    createAccommodation(formData);
  };

  return <ManageAccommodationsForm onSave={handleSave} isLoading={isPending} />;
};

export default ListAccommodation;
