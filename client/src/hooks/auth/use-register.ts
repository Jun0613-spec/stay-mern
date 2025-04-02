import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { axiosInstance, handleAxiosError } from "@/lib/axios";

import { RegisterFormData } from "@/types";

const register = async (formData: RegisterFormData) => {
  try {
    const response = await axiosInstance.post("/api/auth/register", formData, {
      withCredentials: true
    });

    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: async (data) => {
      toast.success("Successfully registered");

      if (data?.token) {
        await queryClient.invalidateQueries({
          queryKey: ["currentUser"]
        });

        navigate("/");
      } else {
        toast.error("Soething went wrong.");
      }
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  return mutation;
};
