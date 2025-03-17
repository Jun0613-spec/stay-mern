import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { googleLogin } from "@/lib/api-client";

export const useGoogleLogin = () => {
  const mutation = useMutation({
    mutationFn: googleLogin,
    onSuccess: (data) => {
      toast.success("Redirecting to Google login");

      window.location.href = data.redirectUrl;
    },
    onError: (error) => {
      toast.error(error.message || "Google login failed. Please try again.");
    }
  });

  return mutation;
};
