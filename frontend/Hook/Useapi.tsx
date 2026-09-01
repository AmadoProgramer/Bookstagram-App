import { useState,
         useCallback } from 'react';

type ApiFunction<T, P extends any[]> = (...args: P) => Promise<T>;

export function useApi<T, P extends any[] = []>(
  apiFunction: ApiFunction<T, P>,
  options?: {
    onSuccess?: (data: T) => void;
    onError?: (error: any) => void;
    initialData?: T;
  }
) {
  const[data, setData] = useState<T | undefined>(options?.initialData);
  const[loading, setLoading] = useState(false);
  const[error, setError] = useState<any>(null);

const execute = useCallback(async (...args: P) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiFunction(...args);
      setData(result);
      options?.onSuccess?.(result);
      return result;
    } catch (err) {
      setError(err);
      options?.onError?.(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunction, options]);

  return {
    data,
    loading,
    error,
    execute,
    setData, // Para realizar actualizaciones manuales
  };
}