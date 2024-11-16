import { MarvelCharacter } from "../hooks/useCharacters";

interface Character {
  character: MarvelCharacter;
}

const onHover = (e: React.MouseEvent<HTMLDivElement>) => {
  const currentBlock = e.currentTarget.querySelector(".desc-block");
  currentBlock?.classList.toggle("hidden");
};

const onExit = (e: React.MouseEvent<HTMLDivElement>) => {
  const currentBlock = e.currentTarget.querySelector(".desc-block");
  currentBlock?.classList.add("hidden");
};

const CharacterCard = ({ character }: Character) => {
  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onExit}
      className="bg-slate-900 shadow-sm overflow-hidden radius flex flex-col justify-center cursor-pointer"
      key={character.id}
    >
      <div className="max-h-96">
        <img
          className="w-full h-full object-cover"
          src={`${character.thumbnail?.path}.${character.thumbnail.extension}`}
          alt={character.name}
        />
      </div>
      <h2 className="text-2xl text-white font-semibold">{character.name}</h2>
      <div className="desc-block hidden">
        {character.description && (
          <p className="text-1xl text-center">{character.description}</p>
        )}
        <h3>
          Comics:
          {character.comics.items.map((comic) => (
            <h3>{comic.name}</h3>
          ))}
        </h3>
      </div>
    </div>
  );
};

export default CharacterCard;
