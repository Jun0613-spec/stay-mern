import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { axiosInstance, handleAxiosError } from "@/lib/axios";

export const saveAccommodation = async (accommodationId: string) => {
  try {
    const response = await axiosInstance.post(
      `/api/accommodations/save/${accommodationId}`
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const useSaveAccommodation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (accommodationId: string) => saveAccommodation(accommodationId),
    onSuccess: async (data) => {
      toast.success(data.message);

      await queryClient.invalidateQueries({
        queryKey: ["saved-accommodations"]
      });

      await queryClient.refetchQueries({
        queryKey: ["saved-accommodations"]
      });
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  return mutation;
};
