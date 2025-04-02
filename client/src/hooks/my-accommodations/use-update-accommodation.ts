import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { axiosInstance, handleAxiosError } from "@/lib/axios";

const updateMyAccommodation = async ({
  accommodationId,
  formData
}: {
  accommodationId: string;
  formData: FormData;
}) => {
  try {
    const response = await axiosInstance.put(
      `/api/my-accommodations/${accommodationId}`,
      formData
    );

    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const useUpdateAccommodation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: updateMyAccommodation,
    onSuccess: async (data) => {
      toast.success("Your accommodation has been updated");

      await queryClient.invalidateQueries({
        queryKey: ["my-accommodation", data.id]
      });

      await queryClient.invalidateQueries({
        queryKey: ["my-accommodations"]
      });

      navigate(`/my-accommodations`);
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  return mutation;
};
