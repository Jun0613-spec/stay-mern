import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { axiosInstance, handleAxiosError } from "@/lib/axios";

const deleteUser = async () => {
  try {
    const response = await axiosInstance.delete("/api/users");

    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: deleteUser,

    onSuccess: async () => {
      toast.success("User has been deleted");

      await queryClient.invalidateQueries({
        queryKey: ["currentUser"]
      });
      await queryClient.removeQueries();
      await queryClient.clear();

      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries();
    }
  });

  return mutation;
};
