import { useQuery } from "@tanstack/react-query";

import { validateToken, getCurrentUser } from "@/lib/api-client";

export const useGetAuthUser = () => {
  const {
    data: tokenData,
    error,
    isLoading
  } = useQuery({
    queryKey: ["validateToken"],
    queryFn: validateToken,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 300000,
    gcTime: 900000
  });

  const {
    data: currentUser,
    isLoading: userLoading,
    error: userError
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    enabled: !!tokenData,
    retry: false
  });

  const isLoggedIn =
    !isLoading && !error && !!tokenData && !userLoading && !!currentUser;

  return { isLoggedIn, data: currentUser, error: userError };
};
