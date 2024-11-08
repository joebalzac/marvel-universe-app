import useCharacters from "../hooks/useCharacters";
import CharacterCard from "./CharacterCard";
import CharacterCardContainer from "./CharacterCardContainer";
import CharacterCardSkeleton from "./CharacterCardSkeleton";

const CharacterGrid = () => {
  const { data, error, isLoading } = useCharacters();
  const skeletons = [...Array(10).keys()];

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {isLoading
          ? skeletons.map((skeleton) => (
              <CharacterCardContainer key={skeleton}>
                <CharacterCardSkeleton />
              </CharacterCardContainer>
            ))
          : data?.map((character) => (
              <CharacterCardContainer key={character.id}>
                <CharacterCard character={character} />
              </CharacterCardContainer>
            ))}
      </div>
    </>
  );
};

export default CharacterGrid;
