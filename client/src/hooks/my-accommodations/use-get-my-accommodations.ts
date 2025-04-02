import { useQuery } from "@tanstack/react-query";
import { Accommodation } from "@/types";

import { axiosInstance, handleAxiosError } from "@/lib/axios";

const getMyAccommodations = async () => {
  try {
    const response = await axiosInstance.get("/api/my-accommodations");

    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const useGetMyAccommodations = () => {
  return useQuery<Accommodation[]>({
    queryKey: ["my-accommodations"],
    queryFn: getMyAccommodations,
    staleTime: 1000 * 60 * 5,
    retry: 1
  });
};
