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
  orderBy: string;
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

interface Identifiable {
  id: number;
}

interface UseDataParams {
  endpoint: string;
  filters?: Record<string, string | number | boolean>;
  deps?: any[];
  limit?: number;
  sortOrder?: string;
}

const useData = <T extends Identifiable>({
  endpoint,
  filters = {},
  sortOrder = "",
  deps = [],
  limit = 50,
}: UseDataParams) => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchData = (isInitialLoad: boolean = false) => {
    if (!hasMore && !isInitialLoad) return;

    const controller = new AbortController();
    const ts = new Date().getTime().toString();
    const hash = md5(ts + privateKey + publicKey);

    if (isInitialLoad) {
      setIsLoading(true);
      setData([]);
      setOffset(0);
    } else {
      setIsFetchingMore(true);
    }

    apiClient
      .get<FetchResponse<T>>(endpoint, {
        signal: controller.signal,
        params: {
          ts,
          apikey: publicKey,
          hash,
          offset,
          limit,
          orderBy: sortOrder,
          ...filters,
        },
      })
      .then((res) => {
        console.log("Full API response:", res.data);
        const newResults = res.data.data.results;

        setData((prevData) => [
          ...prevData,
          ...newResults.filter(
            (newItem) => !prevData.some((item) => item.id === newItem.id)
          ),
        ]);
        setOffset((prevOffset) => prevOffset + res.data.data.count);
        setHasMore(
          res.data.data.offset + res.data.data.count < res.data.data.total
        );
        setIsLoading(false);
        setIsFetchingMore(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        console.error("Fetch error:", (err as Error).message);
        setError(err as Error);
        setIsLoading(false);
        setIsFetchingMore(false);
      });

    return () => controller.abort();
  };

  useEffect(() => {
    fetchData(true);
  }, [endpoint, sortOrder, ...deps]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 500 &&
        !isFetchingMore &&
        hasMore
      ) {
        fetchData();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetchingMore, hasMore, offset]);

  return { data, isLoading, error, isFetchingMore };
};

export default useData;
