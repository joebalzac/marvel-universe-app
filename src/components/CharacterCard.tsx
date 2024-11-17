import { MarvelCharacter } from "../hooks/useCharacters";

interface Character {
  character: MarvelCharacter;
}

const onHover = (e: React.MouseEvent<HTMLDivElement>) => {
  const currentBlock = e.currentTarget.querySelector(".desc-block");
  currentBlock?.classList.toggle("hidden");
};

const CharacterCard = ({ character }: Character) => {
  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onHover}
      className="bg-slate-900 shadow-sm overflow-hidden radius flex flex-col justify-center cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg"
      key={character.id}
    >
      <div>
        <img
          className="w-full h-full object-cover"
          src={`${character.thumbnail?.path}.${character.thumbnail.extension}`}
          alt={character.name}
        />
        <div className="absolute top-2 right-2 bg-blue-900 text-white px-2 py-1 rounded text-sm font-bold">
          {character.comics.available} Comics
        </div>
      </div>
      <div className="p-8">
        <h2 className="text-2xl text-white font-semibold">{character.name}</h2>
        <div className="desc-block hidden">
          {character.description && (
            <p className="text-1xl py-4">{character.description}</p>
          )}
          <h3>
            Comics:
            {character.comics.items.map((comic) => (
              <h3>{comic.name}</h3>
            ))}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
