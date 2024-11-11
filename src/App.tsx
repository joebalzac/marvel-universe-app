import "./input.css";
import CharacterGrid from "./components/CharacterGrid";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <div className="flex flex-col">
        <NavBar />
        <CharacterGrid />
      </div>
    </>
  );
}

export default App;
