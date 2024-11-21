import { MarvelCharacter } from "../hooks/useCharacters";

interface Character {
  character: MarvelCharacter;
  onClick: (character: MarvelCharacter) => void;
}

const CharacterCard = ({ character, onClick }: Character) => {
  return (
    <div
      className="bg-slate-900 shadow-sm overflow-hidden radius flex flex-col justify-center cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg"
      key={character.id}
      // onClick goes to CharacterDetailsPage
      onClick={() => onClick(character)}
    >
      <div>
        <img
          className="w-full h-full object-cover"
          src={`${character.thumbnail?.path}.${character.thumbnail.extension}`}
          alt={character.name}
        />
        <h3 className="text-2xl font-medium py-4">{character.name}</h3>
        <div className="absolute top-2 right-2 bg-blue-900 text-white px-2 py-1 rounded text-sm font-bold">
          {character.comics.available} Comics
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
