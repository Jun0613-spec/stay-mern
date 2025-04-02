import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { axiosInstance, handleAxiosError } from "@/lib/axios";

const updateUser = async (formData: FormData) => {
  try {
    const response = await axiosInstance.put("/api/users", formData);

    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: async () => {
      toast.success("User profile has been updated");

      await queryClient.invalidateQueries({
        queryKey: ["currentUser"]
      });

      navigate("/my-account");
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  return mutation;
};
