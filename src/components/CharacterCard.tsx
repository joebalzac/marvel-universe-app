import { MarvelCharacter } from "../hooks/useCharacters";

interface Character {
  character: MarvelCharacter;
}

const CharacterCard = ({ character }: Character) => {
  return (
    <div
      className="bg-slate-900 shadow-sm overflow-hidden radius flex flex-col justify-center"
      key={character.id}
    >
      <img
        className="w-full h-full object-cover"
        src={`${character.thumbnail?.path}.${character.thumbnail.extension}`}
        alt={character.name}
        style={{ width: "150px", height: "150px" }}
      />
      <h2 className="text-2xl text-white font-semibold">{character.name}</h2>
      <p className="text-1xl text-center">
        {character.description || "No description available"}
      </p>
    </div>
  );
};

export default CharacterCard;
