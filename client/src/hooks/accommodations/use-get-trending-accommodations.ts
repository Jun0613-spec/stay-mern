import { useQuery } from "@tanstack/react-query";

import { axiosInstance, handleAxiosError } from "@/lib/axios";

import { Accommodation } from "@/types";

const getTrendingAccommodations = async () => {
  try {
    const response = await axiosInstance.get(`/api/accommodations/trending`);

    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const useGetTrendingAccommodations = () => {
  return useQuery<Accommodation[]>({
    queryKey: ["accommodations"],
    queryFn: getTrendingAccommodations,
    staleTime: 1000 * 60 * 5,
    retry: 1
  });
};
