import "./input.css";
import CharacterGrid from "./components/CharacterGrid";
import NavBar from "./components/NavBar";
import { useState } from "react";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <>
      <div className="flex flex-col">
        <NavBar onSearch={handleSearch} />
        <CharacterGrid searchQuery={searchQuery} />
      </div>
    </>
  );
}

export default App;
