import { useQuery } from "@tanstack/react-query";

import { axiosInstance, handleAxiosError } from "@/lib/axios";

import { Accommodation } from "@/types";

const getMyAccommodationById = async (accommodationId: string) => {
  try {
    const response = await axiosInstance.get(
      `/api/my-accommodations/${accommodationId}`
    );

    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const useGetMyAccommodationById = (accommodationId: string) => {
  return useQuery<Accommodation>({
    queryKey: ["my-accommodation", accommodationId],
    queryFn: () => getMyAccommodationById(accommodationId),
    enabled: !!accommodationId,
    staleTime: 1000 * 60 * 5,
    retry: 1
  });
};
