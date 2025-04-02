import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { axiosInstance, handleAxiosError } from "@/lib/axios";

const deleteMyAccommodation = async (accommodationId: string) => {
  try {
    const response = await axiosInstance.delete(
      `/api/my-accommodations/${accommodationId}`
    );

    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const useDeleteAccommodation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: deleteMyAccommodation,
    onSuccess: async (data) => {
      toast.success("Your accommodation has been deleted");

      await queryClient.invalidateQueries({ queryKey: ["my-accommodations"] });
      await queryClient.invalidateQueries({
        queryKey: ["my-accommodation", data?.id]
      });

      navigate(`/my-accommodations`);
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  return mutation;
};
