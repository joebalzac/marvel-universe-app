import { MarvelCharacter } from "@/hooks/useCharacters";
import { CloseButton } from "./ui/close-button";

interface DetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  character: MarvelCharacter;
}

const DetailsDrawer = ({ isOpen, onClose, character }: DetailsDrawerProps) => {
  if (!isOpen) return null;

  return (
    <div className="bg-slate-900 bg-opacity-50 z-50" onClick={onClose}>
      <div className="flex justify-between flex-col">
        <CloseButton onClick={onClose} />
        {character.description && (
          <p className="text-1xl py-4">{character.description}</p>
        )}
        <ul className="space-y-2">
          <h3>Comics:</h3>
          {character.comics.items.map((comic) => (
            <li
              key={comic.resourceURI}
              className="text-sm hover:text-blue-400 transition-colors duration-200 ease-in-out"
            >
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={comic.resourceURI}
              >
                {comic.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DetailsDrawer;
