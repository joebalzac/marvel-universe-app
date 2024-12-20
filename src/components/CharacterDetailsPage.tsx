import { MarvelCharacter } from "@/hooks/useCharacters";
import { useLocation, useParams } from "react-router-dom";
import useComics, { MarvelComic } from "@/hooks/useComics";
import LoadingSpinner from "./LoadingSpinner";


const CharacterDetailsPage = () => {
  const { characterId } = useParams<{ characterId: string }>(); // Get characterId from URL
  const location = useLocation();
  const character = location.state as MarvelCharacter;

  const {
    data: comics,
    error,
    isLoading,
  } = useComics({
    characterId: Number(characterId),
  });

  if (error) {
    return <div>{error}</div>;
  }

  console.log("Character ID:", characterId);
  console.log("Character State:", character);

  return (
    <div className="bg-slate-900 bg-opacity-50 z-50 mx-auto py-16">
      <div className="flex justify-between flex-col">
        <div className="flex gap-4 py-8">
          <img
            className="w-full h-full object-cover max-w-96 border-sky-100 border-2"
            src={`${character.thumbnail?.path}.${character.thumbnail.extension}`}
            alt={character.name}
          />
          <div className="relative bg-slate-900 p-6 border-sky-100 border-2">
            <div className="absolute inset-0 bg-[url('/assets/universe.jpg')] bg-cover bg-center bg-no-repeat opacity-20 pointer-events-none"></div>
            <div className="relative z-10 border-b-2 border-slate-800 pb-4">
              <h1 className="text-4xl">{character.name}</h1>
              {character.description && (
                <p className="text- py-4 max-w-4xl">
                  {character.description}
                </p>
              )}
            </div>
          </div>
        </div>
        <h2 className="text-3xl">Featured Comics</h2>
        {isLoading && <LoadingSpinner />}
        <ul className="space-y-2 grid grid-cols-3 gap-5 pt-8">
          {comics?.map((comic: MarvelComic) => {
            return (
              <li key={comic.id}>
                <a href={comic.urls[0].url} className="cursor-pointer">
                  <img
                    className="object-cover max-w-80"
                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                    alt={comic.title}
                  />
                  <h3 className="text-2xl py-4 text-wrap">{comic.title}</h3>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default CharacterDetailsPage;
