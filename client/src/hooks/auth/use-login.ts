import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { LoginFormData } from "@/types";

import { axiosInstance, handleAxiosError } from "@/lib/axios";

const login = async (formData: LoginFormData) => {
  try {
    const response = await axiosInstance.post("/api/auth/login", formData, {
      withCredentials: true
    });

    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: async () => {
      toast.success("Welcome to Stay");

      await queryClient.invalidateQueries({
        queryKey: ["currentUser"]
      });

      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  return mutation;
};
