import useData from "./useData";

export interface MarvelCharacter {
  name: string;
  id: number;
  description: string;
  urls: { [key: string]: string }[];
  thumbnail: string;
  stories: string;
}

interface UseMarvelResults {
  data: MarvelCharacter[] | undefined;
  error: string | null;
  isLoading?: boolean;
}

const useCharacters = (
  params: {
    query?: string;
    theme?: string;
  } = {}
): UseMarvelResults => {
  const { query = "", theme = "" } = params;

  const apiParams = JSON.stringify({
    query: query || undefined,
    theme: theme || undefined,
  });

  const { data, error, isLoading } = useData<MarvelCharacter>(
    "/v1/public/characters",
    [apiParams]
  );

  return {
    data: Array.isArray(data) ? data : data ? [data] : undefined,
    error: error ? (error as Error).message : null,
    isLoading,
  };
};
//this is working now
export default useCharacters;
