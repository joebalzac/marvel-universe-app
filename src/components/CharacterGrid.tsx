import { useRef, useState } from "react";
import useCharacters from "../hooks/useCharacters";
import CharacterCard from "./CharacterCard";
import CharacterCardContainer from "./CharacterCardContainer";
import CharacterCardSkeleton from "./CharacterCardSkeleton";
import SearchInput from "./SearchInput";

const CharacterGrid = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, error, isLoading } = useCharacters({ query: searchQuery });
  const skeletons = [...Array(10).keys()];

  // Create a ref for the loader element
  const loaderRef = useRef<HTMLDivElement | null>(null);

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
      {/* Loader element for infinite scrolling */}
      <div ref={loaderRef} style={{ height: "20px", marginTop: "10px" }}>
        {isLoading && <div>Loading more characters...</div>}
      </div>
    </>
  );
};

export default CharacterGrid;
