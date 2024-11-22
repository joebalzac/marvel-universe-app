import useData from "./useData";

export interface MarvelComic {
  id: number;
  title: string;
  issueNumber: number;
  description: string;
  pageCount: number;
  thumbnail: string;
  resourceURI: string;
  images: string[];
  image: {
    path: string;
    extension: string;
  };
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

  const { data, error, isLoading } = useData<MarvelComic>(
    "/v1/public/comics",
    [query, limit, offset, sortOrder, characterId],
    query ? `titleStartsWith=${query}` : "",
    sortOrder
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
