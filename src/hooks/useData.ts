import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import md5 from "md5";
import { CanceledError } from "axios";

const publicKey = "26715120c25a3d3ee06ceeb986a5aba7";
const privateKey = "7f138beb153b52efeb32bbc71d7a8e8ee95e7b1d";

interface MarvelData<T> {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: T[];
}

interface FetchResponse<T> {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  etag: string;
  data: MarvelData<T>;
}

const useData = <T>(endpoint: string, deps: any[]) => {
  const [data, setData] = useState<T[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const ts = new Date().getTime().toString();
    const hash = md5(ts + privateKey + publicKey);

    apiClient
      .get<FetchResponse<T>>(endpoint, {
        signal: controller.signal,
        params: {
          ts,
          apikey: publicKey,
          hash,
          offset: 0,
          limit: 20,
        },
      })
      .then((res) => {
        console.log("Full API response:", res.data);
        setData(res.data.data.results || []);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        console.error("Fetch error:", err.message);
        setError(err);
        setIsLoading(false);
      });

    return () => controller.abort();
  }, deps);

  return { data, isLoading, error };
};

export default useData;
