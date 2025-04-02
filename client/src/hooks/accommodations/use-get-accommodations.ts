import { useQuery } from "@tanstack/react-query";

import { axiosInstance, handleAxiosError } from "@/lib/axios";

import { Accommodation } from "@/types";

const getAccommodations = async () => {
  try {
    const response = await axiosInstance.get(`/api/accommodations`);

    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const useGetAccommodations = () => {
  return useQuery<Accommodation[]>({
    queryKey: ["accommodations"],
    queryFn: getAccommodations,
    staleTime: 1000 * 60 * 5,
    retry: 1
  });
};
