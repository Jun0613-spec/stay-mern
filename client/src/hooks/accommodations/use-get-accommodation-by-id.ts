import { useQuery } from "@tanstack/react-query";

import { axiosInstance, handleAxiosError } from "@/lib/axios";

import { Accommodation } from "@/types";

const getAccommodationById = async (accommodationId: string) => {
  try {
    const response = await axiosInstance.get(
      `/api/accommodations/${accommodationId}`
    );

    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const useGetAccommodationById = (accommodationId: string) => {
  return useQuery<Accommodation>({
    queryKey: ["accommodation", accommodationId],
    queryFn: () => getAccommodationById(accommodationId),
    enabled: !!accommodationId,
    staleTime: 1000 * 60 * 5,
    retry: 1
  });
};
