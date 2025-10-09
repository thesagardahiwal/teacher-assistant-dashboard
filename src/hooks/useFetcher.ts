import { useState, useEffect, useCallback, useRef } from 'react';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
type RequestBody = BodyInit | Record<string, any> | null;
type RequestHeaders = Record<string, string>;

interface FetchOptions<T> {
  method?: HttpMethod;
  body?: RequestBody;
  headers?: RequestHeaders;
  immediate?: boolean;
  cacheKey?: string;
  cacheTime?: number;
  retry?: number;
  retryDelay?: number;
  timeout?: number;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

interface FetchState<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  isFetching: boolean;
  status: 'idle' | 'loading' | 'success' | 'error';
}

interface UseFetcherReturn<T> extends FetchState<T> {
  fetch: (url: string, options?: Omit<FetchOptions<T>, 'immediate'>) => Promise<T>;
  cancel: () => void;
  mutate: (data: T) => void;
  refetch: () => Promise<T>;
  clearCache: (key?: string) => void;
}

// Cache storage
const cache = new Map<string, { data: any; timestamp: number }>();

// Request deduplication
const pendingRequests = new Map<string, Promise<any>>();

export function useFetcher<T = any>(
  initialUrl?: string,
  initialOptions?: FetchOptions<T>
): UseFetcherReturn<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    error: null,
    isLoading: false,
    isFetching: false,
    status: 'idle',
  });

  const abortControllerRef = useRef<AbortController | null>(null);
  const retryCountRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearCache = useCallback((key?: string) => {
    if (key) {
      cache.delete(key);
    } else {
      cache.clear();
    }
  }, []);



  const fetchData = useCallback(
    async (
      url: string,
      options: FetchOptions<T> = {}
    ): Promise<T> => {
      const {
        method = 'GET',
        body,
        headers = {},
        cacheKey,
        cacheTime = 60000, // 1 minute default cache
        retry = 0,
        retryDelay = 1000,
        timeout = 30000, // 30 seconds default timeout
      } = options;
      const processResponse = async (response: Response): Promise<T> => {
        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(
            errorData?.message || `Request failed with status ${response.status}`
          );
        }

        const contentType = response.headers.get('content-type');
        if (contentType?.includes('application/json')) {
          return response.json() as Promise<T>;
        }
        return response.text() as unknown as Promise<T>;
      };
      // Check cache first
      if (cacheKey && method === 'GET' && cache.has(cacheKey)) {
        const cached = cache.get(cacheKey);
        if (cached && Date.now() - cached.timestamp < cacheTime) {
          return cached.data as T;
        }
        cache.delete(cacheKey);
      }

      // Deduplicate requests
      const requestKey = `${method}:${url}:${JSON.stringify(options)}`;
      if (pendingRequests.has(requestKey)) {
        return pendingRequests.get(requestKey) as Promise<T>;
      }

      // Setup abort controller
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();

      // Setup timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      const timeoutPromise = new Promise<never>((_, reject) => {
        timeoutRef.current = setTimeout(() => {
          abortControllerRef.current?.abort();
          reject(new Error('Request timeout'));
        }, timeout);
      });

      try {
        setState((prev) => ({
          ...prev,
          isLoading: true,
          isFetching: true,
          status: 'loading',
        }));

        const requestPromise = (async () => {
          const requestOptions: RequestInit = {
            method,
            headers: {
              'Content-Type': 'application/json',
              ...headers,
            },
            signal: abortControllerRef.current?.signal,
          };

          if (body) {
            requestOptions.body =
              typeof body === 'string' ? body : JSON.stringify(body);
          }

          const response = await Promise.race([
            fetch(url, requestOptions),
            timeoutPromise,
          ]);

          const data = await processResponse(response);

          // Update cache
          if (cacheKey && method === 'GET') {
            cache.set(cacheKey, { data, timestamp: Date.now() });
          }

          setState({
            data,
            error: null,
            isLoading: false,
            isFetching: false,
            status: 'success',
          });

          options.onSuccess?.(data);
          return data;
        })();

        pendingRequests.set(requestKey, requestPromise);
        return await requestPromise;
      } catch (error) {
        if (retryCountRef.current < retry && !(error instanceof DOMException)) {
          retryCountRef.current += 1;
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
          return fetchData(url, options);
        }

        const err = error instanceof Error ? error : new Error(String(error));
        setState({
          data: null,
          error: err,
          isLoading: false,
          isFetching: false,
          status: 'error',
        });

        options.onError?.(err);
        throw err;
      } finally {
        pendingRequests.delete(requestKey);
        retryCountRef.current = 0;
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      }
    },
    []
  );

  const cancel = useCallback(() => {
    abortControllerRef.current?.abort();
    setState((prev) => ({
      ...prev,
      isLoading: false,
      isFetching: false,
      status: 'idle',
    }));
  }, []);

  const mutate = useCallback((data: T) => {
    setState((prev) => ({
      ...prev,
      data,
    }));
  }, []);

  const refetch = useCallback(async () => {
    if (!initialUrl) {
      throw new Error('No URL provided for refetch');
    }
    return fetchData(initialUrl, initialOptions);
  }, [initialUrl, initialOptions, fetchData]);

  useEffect(() => {
    if (initialUrl && initialOptions?.immediate !== false) {
      fetchData(initialUrl, initialOptions);
    }

    return () => {
      cancel();
    };
  }, [initialUrl, initialOptions, fetchData, cancel]);

  return {
    ...state,
    fetch: fetchData,
    cancel,
    mutate,
    refetch,
    clearCache,
  };
}