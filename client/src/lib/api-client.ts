import axios from "axios";

import { LoginFormData, RegisterFormData } from "./schemas";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

console.log(API_BASE_URL);

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
});

const handleAxiosError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred";
    throw new Error(errorMessage);
  }

  throw new Error("An unexpected error occurred");
};
export const register = async (formData: RegisterFormData) => {
  try {
    const response = await apiClient.post("/api/auth/register", formData);

    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const login = async (formData: LoginFormData) => {
  try {
    const response = await apiClient.post("/api/auth/login", formData);

    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const logout = async () => {
  const response = await apiClient.post("/api/auth/logout");

  return response.data;
};

export const googleLogin = async () => {
  const response = await apiClient.post("/api/auth/google");

  return response.data;
};

export const validateToken = async () => {
  try {
    const response = await apiClient.get("/api/auth/validate-token");

    if (!response.data) {
      throw new Error("Token invalid");
    }

    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await apiClient.get("/api/users/current-user");

    if (!response.data) {
      throw new Error("Error fetching user");
    }

    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};
