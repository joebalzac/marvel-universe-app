import useCharacters from "../hooks/useCharacters";
import CharacterCard from "./CharacterCard";
import CharacterCardContainer from "./CharacterCardContainer";
import CharacterCardSkeleton from "./CharacterCardSkeleton";
import LoadingSpinner from "./LoadingSpinner";

interface CharacterGridProps {
  searchQuery: string;
  sortOrder: string;
}

const CharacterGrid = ({ searchQuery, sortOrder }: CharacterGridProps) => {
  const { data, error, isLoading, isFetchingMore } = useCharacters({
    query: searchQuery,
    sort: sortOrder,
  });
  const skeletons = [...Array(10).keys()];

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      {error && <div className="text-red-500">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-5">
        {isLoading
          ? skeletons.map((skeleton) => (
              <CharacterCardContainer key={skeleton}>
                <CharacterCardSkeleton />
              </CharacterCardContainer>
            ))
          : data
              ?.filter(
                (character) =>
                  !character.thumbnail.path.includes("image_not_available")
              )
              .map((character) => (
                <CharacterCardContainer  key={character.id}>
                  <CharacterCard character={character} />
                </CharacterCardContainer>
              ))}
      </div>
      {isFetchingMore && <LoadingSpinner />}
    </>
  );
};

export default CharacterGrid;
