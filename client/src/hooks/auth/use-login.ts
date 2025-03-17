import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import { login } from "@/lib/api-client";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: async () => {
      toast.success("Welcoe to Stay");

      await queryClient.invalidateQueries({ queryKey: ["validateToken"] });

      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message || "Registration failed. Please try again.");
    }
  });

  return mutation;
};
