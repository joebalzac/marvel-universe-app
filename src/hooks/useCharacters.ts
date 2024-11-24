import { useState } from "react";
import useData from "./useData";

export interface MarvelCharacter {
  name: string;
  id: number;
  description: string;
  urls: { [key: string]: string }[];
  thumbnail: {
    path: string;
    extension: string;
  };
  resourceURI: string;
  comics: {
    available: number;
    collectionURI: string;
    items: { name: string; resourceURI: string }[];
    message?: string;
  };
  series: {
    available: number;
    collectionURI: string;
    items: { name: string; resourceURI: string }[];
  };
  stories: {
    available: number;
    collectionURI: string;
    items: { name: string; resourceURI: string }[];
  };
}

interface UseMarvelResults {
  data: MarvelCharacter[] | undefined;
  error: string | null;
  isLoading: boolean;
  loadMore: () => void;
  isFetchingMore: boolean;
}

const useCharacters = ({
  query = "",
  sort = "",
  limit = 50,
}: {
  query?: string;
  sort?: string;
  limit?: number;
} = {}): UseMarvelResults => {
  const [page, setPage] = useState(0);

  const offset = page * limit;

  // Dynamic filters for API
  const filters = {
    ...(query && { nameStartsWith: query }),
    ...(sort && { orderBy: sort }),
    limit,
    offset,
  };

  const { data, error, isLoading, isFetchingMore } = useData<MarvelCharacter>({
    endpoint: "/v1/public/characters",
    filters,
    deps: [query, sort, offset],
  });

  const loadMore = () => setPage((prevPage) => prevPage + 1);

  return {
    data: Array.isArray(data) ? data : undefined,
    error: error ? (error as Error).message : null,
    isLoading,
    loadMore,
    isFetchingMore,
  };
};

export default useCharacters;
