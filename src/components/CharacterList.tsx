import useCharacters from "../hooks/useCharacters";

const CharacterList = () => {
  const { data, error, isLoading } = useCharacters();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  {
    data?.map((character) => {
      return (
        <div key={character.id}>
          <h2>{character.name}</h2>
          <p>{character.description}</p>
          <img src={character.thumbnail} alt={character.name} />
        </div>
      );
    });
  }

  return <div>CharacterList</div>;
};

export default CharacterList;
