// lib/apiClient.ts
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

// Define base API URL (adjust for prod/dev)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Include cookies if needed
});

// Attach token before request (if exists)
api.interceptors.request.use(
  (config: import("axios").InternalAxiosRequestConfig) => {
    return config;
  },
  (error) => Promise.reject(error)
);

// Define response structure
export interface ApiResponse<T> {
  success: boolean;
  status: number;
  message: string;
  data?: T;
}

// Unified fetch handler
async function request<T>(fn: () => Promise<AxiosResponse<any>>): Promise<ApiResponse<T>> {
  try {
    const res = await fn();
    const { msg, err, data, ...rest } = res.data;

    return {
      success: !err,
      status: res.status,
      message: msg || err || "Request successful",
      data: data ?? (Object.keys(rest).length > 0 ? rest : null),
    };
  } catch (err) {
    const error = err as AxiosError<{ msg?: string; err?: string }>;

    const status = error.response?.status || 500;
    const errorData = error.response?.data;

    const message = errorData?.err || errorData?.msg || error.message || "Unexpected error";

    console.error("❌ API Error Response:", error);

    return {
      success: false,
      status,
      message,
    };
  }
}


// Handle responses globally
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Auto logout or redirect if needed
      console.warn("Unauthorized, redirecting to login...");
    }
    return Promise.reject(error);
  }
);



// Centralized fetch handler
export const fetchHandler = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    request<T>(() => api.get<T>(url, config)),

  post: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    request<T>(() => api.post<T>(url, data, config)),

  put: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    request<T>(() => api.put<T>(url, data, config)),

  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    request<T>(() => api.delete<T>(url, config)),
};