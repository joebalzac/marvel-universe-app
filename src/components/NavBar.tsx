import SearchInput from "./SearchInput";
import SortSelector from "./SortSelector";

interface NavBarProps {
  onSearch: (searchText: string) => void;
  onSelectOrder: (order: string) => void;
}

const NavBar = ({ onSearch, onSelectOrder }: NavBarProps) => {
  return (
    <div className="flex justify-between items-center p-5">
      <div>
        <a href="/">
          <img
            src={"/assets/marvel-logo.svg"}
            alt="Marvel Logo"
            className="w-full"
          />
        </a>
      </div>
      <div className="pl-20 w-full max-w-3xl">
        <SearchInput onSearch={onSearch} />
      </div>
      <div>
        <SortSelector onSelectOrder={onSelectOrder} />
      </div>
    </div>
  );
};

export default NavBar;
