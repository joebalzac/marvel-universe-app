import { useEffect, useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";

interface SearchInputProps {
  onSearch: (searchText: string) => void;
}

const SearchInput = ({ onSearch }: SearchInputProps) => {
  const ref = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      onSearch(inputValue);
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [inputValue, onSearch]);

  return (
    <form
      className="w-full"
      action=""
      onSubmit={(e) => {
        e.preventDefault();
        if (ref.current) {
          onSearch(ref.current.value);
        }
      }}
    >
      <div className="relative">
        <div>
          <input
            className="bg-[<url('/img/hero-pattern.svg')>] border border-gray-400 p-2 h-11 w-full rounded-3xl
          focus:outline-none focus:ring focus:border-blue-300 text-gray-950 pr-8 pl-11 text-xl"
            ref={ref}
            type="text"
            placeholder="Search for a character"
            onChange={(e) => {
              setInputValue(e.target.value);
              onSearch(e.target.value);
              console.log(e.target.value);
            }}
          />
        </div>
        <button className="absolute top-3 left-3 z-10">
          <IoIosSearch className="text-gray-950 text-2xl" />
        </button>
      </div>
    </form>
  );
};

export default SearchInput;
