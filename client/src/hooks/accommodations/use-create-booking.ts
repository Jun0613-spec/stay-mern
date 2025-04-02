import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { axiosInstance, handleAxiosError } from "@/lib/axios";

import { BookingFormData } from "@/types";

const createBooking = async (formData: BookingFormData) => {
  try {
    const response = await axiosInstance.post(
      `/api/accommodations/${formData.accommodationId}/bookings`,
      {
        paymentIntentId: formData.paymentIntentId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        adultCount: formData.adultCount,
        childCount: formData.childCount,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        totalCost: formData.totalCost
      }
    );
    return response.data;
  } catch (error) {
    throw handleAxiosError(error) as Error;
  }
};

export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBooking,
    onSuccess: async (data, { accommodationId }) => {
      toast.success(data.message);

      await queryClient.invalidateQueries({
        queryKey: ["bookings", accommodationId]
      });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create booking");
    }
  });
};
