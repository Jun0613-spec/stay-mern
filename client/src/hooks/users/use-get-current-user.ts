import { useQuery } from "@tanstack/react-query";

import { axiosInstance, handleAxiosError } from "@/lib/axios";

const getCurrentUser = async () => {
  try {
    const response = await axiosInstance.get("/api/users/current-user", {
      withCredentials: true
    });

    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const useGetCurrentUser = () => {
  const {
    data: currentUser,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
    refetchOnWindowFocus: false
  });

  const isLoggedIn = !!currentUser && !isError;

  return {
    isLoggedIn,
    data: currentUser,
    isLoading,
    isError,
    error
  };
};
