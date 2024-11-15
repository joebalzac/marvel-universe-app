import "./input.css";
import CharacterGrid from "./components/CharacterGrid";
import NavBar from "./components/NavBar";
import { useState } from "react";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<string>("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSortOrderChange = (order: string) => {
    setSortOrder(order);
  };

  return (
    <>
      <div className="flex flex-col">
        <NavBar onSearch={handleSearch} onSelectOrder={handleSortOrderChange} />
        <CharacterGrid searchQuery={searchQuery} sortOrder={sortOrder} />
      </div>
    </>
  );
}

export default App;
