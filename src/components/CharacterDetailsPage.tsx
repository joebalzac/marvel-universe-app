import { MarvelCharacter } from "@/hooks/useCharacters";
import { useLocation, useParams } from "react-router-dom";
import useComics, { MarvelComic } from "@/hooks/useComics";

const CharacterDetailsPage = () => {
  const { characterId } = useParams<{ characterId: string }>(); // Get characterId from URL
  const location = useLocation();
  const character = location.state as MarvelCharacter;

  const { data: comics, error } = useComics({
    characterId: Number(characterId),
  });

  if (error) {
    return <div>{error}</div>;
  }

  console.log;

  return (
    <div className="bg-slate-900 bg-opacity-50 z-50">
      <div className="flex justify-between flex-col">
        <img
          className="w-full h-full object-cover"
          src={`${character.thumbnail?.path}.${character.thumbnail.extension}`}
          alt={character.name}
        />
        {character.description && (
          <p className="text-1xl py-4">{character.description}</p>
        )}
        <h2>Comics</h2>
        <ul className="space-y-2">
          {comics?.map((comic: MarvelComic) => (
            <li key={comic.id} className="flex space">
              <img
                src={`${comic.image.path}.${comic.image.extension}`}
                alt={comic.title}
                className="w-20 h-auto object-cover"
              />
              <div>
                <h3>{comic.title}</h3>
                <p>{comic.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CharacterDetailsPage;
