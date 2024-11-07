import useCharacters from "../hooks/useCharacters";

const CharacterList = () => {
  const { data, error, isLoading } = useCharacters();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  console.log("Fetched data:", data);

  return (
    <div>
      {data?.map((character) => (
        <div key={character.id}>
          <h2>{character.name}</h2>
          <p>{character.description || "No description available"}</p>
          <img
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            alt={character.name}
            style={{ width: "150px", height: "150px" }} // adjust size as needed
          />
        </div>
      ))}
    </div>
  );
};

export default CharacterList;
