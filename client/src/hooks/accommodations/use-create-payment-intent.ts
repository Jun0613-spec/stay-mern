import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { axiosInstance, handleAxiosError } from "@/lib/axios";

const createPaymentIntent = async ({
  accommodationId,
  numberOfNights
}: {
  accommodationId: string;
  numberOfNights: string;
}) => {
  try {
    const response = await axiosInstance.post(
      `/api/accommodations/${accommodationId}/bookings/payment-intent`,
      { numberOfNights: Number(numberOfNights) }
    );
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const useCreatePaymentIntent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPaymentIntent,
    onSuccess: async ({ accommodationId }) => {
      await queryClient.invalidateQueries({
        queryKey: ["payment-intent", accommodationId]
      });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create payment intent");
    }
  });
};
