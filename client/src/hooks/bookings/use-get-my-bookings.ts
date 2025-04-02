import { useQuery } from "@tanstack/react-query";

import { axiosInstance, handleAxiosError } from "@/lib/axios";

import { Booking } from "@/types";

const getMyBookings = async () => {
  try {
    const response = await axiosInstance.get(`/api/bookings`);

    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const useGetMyBookings = () => {
  return useQuery<Booking[]>({
    queryKey: ["bookings"],
    queryFn: getMyBookings,
    staleTime: 1000 * 60 * 5,
    retry: 1
  });
};
