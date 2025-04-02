import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { axiosInstance, handleAxiosError } from "@/lib/axios";

export const createAccommodation = async (formData: FormData) => {
  try {
    const response = await axiosInstance.post(
      "/api/my-accommodations",
      formData
    );

    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const useCreateAccommodation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: createAccommodation,
    onSuccess: async () => {
      toast.success("Your accommodation has been added.");

      await queryClient.invalidateQueries({ queryKey: ["my-accommodations"] });

      navigate(`/my-accommodations`);
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  return mutation;
};
