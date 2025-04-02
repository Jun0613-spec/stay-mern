import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { axiosInstance } from "@/lib/axios";

const googleLogin = async (credential: string) => {
  const response = await axiosInstance.post("/api/auth/google", { credential });

  return response.data;
};

export const useGoogleLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: googleLogin,
    onSuccess: async (data) => {
      toast.success("Welcome");

      await queryClient.invalidateQueries({
        queryKey: ["currentUser"]
      });

      document.cookie = `auth_token=${data.token}; path=/`;

      navigate("/");
    },
    onError: (error) => {
      console.error(error);

      toast.error("Failed to log in with Google.");
    }
  });

  return mutation;
};
