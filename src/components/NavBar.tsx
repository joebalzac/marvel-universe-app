import { useState } from "react";
import SearchInput from "./SearchInput";
import useCharacters from "../hooks/useCharacters";

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, error, isLoading, isFetchingMore } = useCharacters({
    query: searchQuery,
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mx-auto">
      <img
        src={"/assets/marvel-logo.svg"}
        alt="Marvel Logo"
        className="w-full"
      />
      <SearchInput onSearch={handleSearch} />
    </div>
  );
};

export default NavBar;
