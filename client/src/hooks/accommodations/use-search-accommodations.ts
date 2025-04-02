import { useQuery } from "@tanstack/react-query";

import { axiosInstance, handleAxiosError } from "@/lib/axios";

import { AccommodationSearchResponse } from "@/types";

interface SearchParams {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
  facilities?: string[];
  types?: string[];
  maxPrice?: string;
  sortOption?: string;
}

const searchAccommodations = async (searchParams: SearchParams) => {
  const queryParams = new URLSearchParams();

  if (searchParams.destination)
    queryParams.append("destination", searchParams.destination);
  if (searchParams.checkIn) queryParams.append("checkIn", searchParams.checkIn);
  if (searchParams.checkOut)
    queryParams.append("checkOut", searchParams.checkOut);
  if (searchParams.adultCount)
    queryParams.append("adultCount", searchParams.adultCount);
  if (searchParams.childCount)
    queryParams.append("childCount", searchParams.childCount);
  if (searchParams.page) queryParams.append("page", searchParams.page);
  if (searchParams.maxPrice)
    queryParams.append("maxPrice", searchParams.maxPrice);
  if (searchParams.sortOption)
    queryParams.append("sortOption", searchParams.sortOption);

  searchParams.facilities?.forEach((facility) =>
    queryParams.append("facilities", facility)
  );
  searchParams.types?.forEach((type) => queryParams.append("types", type));

  try {
    const response = await axiosInstance.get(
      `/api/accommodations/search?${queryParams}`
    );

    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const useSearchAccommodations = (searchParams: SearchParams) => {
  return useQuery<AccommodationSearchResponse>({
    queryKey: ["searchAccommodations", searchParams],
    queryFn: () => searchAccommodations(searchParams),
    staleTime: 1000 * 60 * 5,
    retry: 1
  });
};
