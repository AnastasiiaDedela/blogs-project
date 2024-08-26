import axios from 'axios';
import { useEffect, useState } from 'react';

export const useFetch = <T>(url: string, dependencies: Array<number | string | string[]> = []) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(url)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, dependencies);

  return { data: data, isLoading: isLoading, error: error };
};
