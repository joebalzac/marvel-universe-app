import SearchInput from "./SearchInput";

interface NavBarProps {
  onSearch: (searchText: string) => void;
}

const NavBar = ({ onSearch }: NavBarProps) => {
  return (
    <div className="flex justify-start items-center p-5">
      <div>
        <img
          src={"/assets/marvel-logo.svg"}
          alt="Marvel Logo"
          className="w-full"
        />
      </div>
      <div className="pl-20 w-full max-w-3xl">
        <SearchInput onSearch={onSearch} />
      </div>
    </div>
  );
};

export default NavBar;
