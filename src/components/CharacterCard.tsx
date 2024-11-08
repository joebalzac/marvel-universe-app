import { MarvelCharacter } from "../hooks/useCharacters";

interface Character {
  character: MarvelCharacter;
}

const CharacterCard = ({ character }: Character) => {
  return (
    <div>
      <div key={character.id}>
        <h2>{character.name}</h2>
        <p>{character.description || "No description available"}</p>
        <img
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt={character.name}
          style={{ width: "150px", height: "150px" }}
        />
      </div>
    </div>
  );
};

export default CharacterCard;
