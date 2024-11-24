import useData from "./useData";

export interface MarvelComic {
  id: number;
  title: string;
  issueNumber: number;
  description?: string;
  pageCount: number;
  thumbnail: { path: string; extension: string };
  resourceURI: string;
  images?: { path: string; extension: string }[];
}

interface UseMarvelComicResults {
  data: MarvelComic[] | undefined;
  error: string | null;
  isLoading: boolean;
}

const useComics = ({
  query = "",
  limit = 20,
  offset = 0,
  sortOrder = "title",
  characterId,
}: {
  query?: string;
  limit?: number;
  offset?: number;
  sortOrder?: string;
  characterId?: number;
} = {}): UseMarvelComicResults => {
  const filters = {
    ...(query && { titleStartsWith: query }),
    ...(characterId && { characters: characterId }),
    limit,
    offset,
    orderBy: sortOrder,
  };

  const { data, error, isLoading } = useData<MarvelComic>({
    endpoint: "/v1/public/comics",
    filters,
    deps: [query, limit, offset, sortOrder, characterId],
  });

  return {
    data,
    error: error?.message || null,
    isLoading,
  };
};

export default useComics;
