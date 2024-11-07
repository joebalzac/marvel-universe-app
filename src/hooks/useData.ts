import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import md5 from "md5";

const publicKey = "26715120c25a3d3ee06ceeb986a5aba7";
const privateKey = "7f138beb153b52efeb32bbc71d7a8e8ee95e7b1d";

interface FetchResponse<T> {
  status: string;
  matches?: number;
  sets: T[];
  message?: string;
  results: T[];
}

const useData = <T>(endpoint: string, deps?: any[]) => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const ts = new Date().getTime().toString();
    const hash = md5(ts + privateKey + publicKey);

    apiClient
      .get<FetchResponse<T>>(endpoint, {
        signal: controller.signal,
        params: {
          ts,
          apiKey: publicKey,
          hash,
        },
      })
      .then((res) => {
        setData(res.data.results || []);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
    return () => controller.abort();
  }, deps || []);

  return { data, isLoading, error };
};

export default useData;
