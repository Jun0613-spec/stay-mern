import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import { logout } from "@/lib/api-client";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      toast.success("See you soon!");

      await queryClient.invalidateQueries({ queryKey: ["validateToken"] });

      navigate("/");
    }
  });

  return mutation;
};
