import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import { register } from "@/lib/api-client";

export const useRegister = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: async (data) => {
      toast.success("Successfully registered");

      if (data?.token) {
        await queryClient.invalidateQueries({ queryKey: ["validateToken"] });

        navigate("/");
      } else {
        toast.error("Soething went wrong.");
      }
    },
    onError: (error) => {
      toast.error(error.message || "Registration failed. Please try again.");
    }
  });

  return mutation;
};
