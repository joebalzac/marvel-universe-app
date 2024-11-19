import { useState } from "react";
import { MarvelCharacter } from "../hooks/useCharacters";
import DetailsDrawer from "./DetailsDrawer";

interface Character {
  character: MarvelCharacter;
}

const CharacterCard = ({ character }: Character) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  return (
    <div
      onClick={toggleDrawer}
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
        {isDrawerOpen && (
          <DetailsDrawer
            character={character}
            isOpen={isDrawerOpen}
            onClose={toggleDrawer}
          />
        )}
      </div>
    </div>
  );
};

export default CharacterCard;
