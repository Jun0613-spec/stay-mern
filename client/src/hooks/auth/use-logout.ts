import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { axiosInstance } from "@/lib/axios";

const logout = async () => {
  const response = await axiosInstance.post("/api/auth/logout", {
    withCredentials: true
  });

  return response.data;
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["currentUser"]
      });

      await queryClient.clear();

      toast.success("Logged out successfully");
      navigate("/");
    },
    onSettled: () => {
      queryClient.invalidateQueries();
    }
  });

  return mutation;
};
