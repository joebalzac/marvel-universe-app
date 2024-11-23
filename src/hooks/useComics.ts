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
  isLoading?: boolean;
}

const useComics = (
  params: {
    query?: string;
    limit?: number;
    offset?: number;
    sortOrder?: string;
    characterId?: number;
  } = {}
): UseMarvelComicResults => {
  const {
    query = "",
    limit = 50,
    offset = 0,
    sortOrder = "title",
    characterId,
  } = params;

  const queryString = [
    query && `titleStartsWith=${query}`,
    characterId && `characters=${characterId}`,
    `limit=${limit}`,
    `offset=${offset}`,
    `orderBy=${sortOrder}`,
  ]
    .filter(Boolean)
    .join("&");

  const customParams = {
    ...(query && { titleStartsWith: query }),
    ...(characterId && { characters: characterId }),
    limit,
    offset,
    orderBy: sortOrder,
  };

  const { data, error, isLoading } = useData<MarvelComic>(
    `/v1/public/comics?${queryString}`,
    [query, limit, offset, sortOrder, characterId],
    queryString,
    sortOrder,
    customParams
  );

  if (error) {
    (error.message = "Failed to fetch comics"), console.error(error);
  }

  return {
    data,
    error: error?.message || null,
    isLoading,
  };
};

export default useComics;
