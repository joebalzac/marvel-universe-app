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
  isLoading?: boolean;
  loadMore: () => void;
  isFetchingMore: boolean;
  searchQuery?: string;
  sortOrder?: string;
}

const useCharacters = (
  params: {
    query?: string;
    sort?: string;
    theme?: string;
  } = {}
): UseMarvelResults => {
  const { query = "", sort = "" } = params;
  const [page, setPage] = useState(0);

  const limit = 50;
  const offset = page * limit;

  const customParams = query ? { nameStartsWith: query } : {};

  const { data, error, isLoading, isFetchingMore } = useData<MarvelCharacter>(
    "/v1/public/characters",
    [query, sort, offset],
    query,
    sort,
    customParams
  );

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
