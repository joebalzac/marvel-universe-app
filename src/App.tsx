import "./input.css";
import CharacterGrid from "./components/CharacterGrid";
import NavBar from "./components/NavBar";
import { useState } from "react";
import CharacterHeading from "./components/CharacterHeading";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CharacterDetailsPage from "./components/CharacterDetailsPage";

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
    <Router>
      <div className="flex flex-col">
        <NavBar onSearch={handleSearch} onSelectOrder={handleSortOrderChange} />

        <Routes>
          <Route
            path="/"
            element={
              <>
                {" "}
                <CharacterHeading />
                <CharacterGrid
                  searchQuery={searchQuery}
                  sortOrder={sortOrder}
                />
              </>
            }
          />

          <Route
            path="/characters/:characterId"
            element={<CharacterDetailsPage />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
