import { useQuery } from "@tanstack/react-query";
import { Accommodation } from "@/types";

import { axiosInstance, handleAxiosError } from "@/lib/axios";

const getSavedAccommodations = async () => {
  try {
    const response = await axiosInstance.get("/api/users/saved-list");

    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const useGetSavedAccommodations = () => {
  return useQuery<Accommodation[]>({
    queryKey: ["saved-accommodations"],
    queryFn: getSavedAccommodations,
    staleTime: 1000 * 60 * 5,
    retry: 1
  });
};
