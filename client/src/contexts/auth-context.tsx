import { createContext, useContext } from "react";

import { useGetCurrentUser } from "@/hooks/users/use-get-current-user";

import { User } from "@/types";

type AuthContextType = {
  isLoggedIn: boolean;
  currentUser: User | null;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  currentUser: null,
  isLoading: true
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn, data: currentUser, isLoading } = useGetCurrentUser();

  return (
    <AuthContext.Provider value={{ isLoggedIn, currentUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useSearch must be used within a SearchContextProvider");
  }

  return context;
};
