import { useState } from "react";
import useCharacters from "../hooks/useCharacters";
import CharacterCard from "./CharacterCard";
import CharacterCardContainer from "./CharacterCardContainer";
import CharacterCardSkeleton from "./CharacterCardSkeleton";
import SearchInput from "./SearchInput";

const CharacterGrid = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, error, isLoading } = useCharacters({ query: searchQuery });
  const skeletons = [...Array(10).keys()];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <SearchInput onSearch={handleSearch} />
      {error && <div className="text-red-500">{error}</div>}
      <div className="grid grid-cols-4 gap-4">
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
                <CharacterCardContainer key={character.id}>
                  <CharacterCard character={character} />
                </CharacterCardContainer>
              ))}
      </div>
    </>
  );
};

export default CharacterGrid;
