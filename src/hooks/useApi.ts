import { useState, useCallback } from "react";
import { ApiResponse } from "@/lib/apiClient";

type ApiFunction<T> = (...args: any[]) => Promise<ApiResponse<T>>;

export function useApi<T>(apiFn: ApiFunction<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);

  const execute = useCallback(
    async (...args: any[]) => {
      setLoading(true);
      setError(null);

      try {
        const response = await apiFn(...args);
        setData(response.data ?? null);
        setStatus(response.status);
        setMessage(response.message);
        setSuccess(response.success);

        if (!response.success) {
          setError(response.message);
        }

        return response;
      } catch (err) {
        setError((err as Error).message || "Unexpected error");
        return {
          success: false,
          status: 500,
          message: (err as Error).message || "Unexpected error",
        } as ApiResponse<T>;
      } finally {
        setLoading(false);
      }
    },
    [apiFn]
  );

  return { data, loading, error, status, message, success, execute };
}
