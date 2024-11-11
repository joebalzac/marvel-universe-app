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
    }, 500); // Debounce delay

    return () => clearTimeout(delayDebounce);
  }, [inputValue, onSearch]);

  return (
    <form
      action=""
      onSubmit={(e) => {
        e.preventDefault();
        if (ref.current) {
          onSearch(ref.current.value);
        }
      }}
    >
      <div>
        {/* <IoIosSearch className="absolute top-2/4 left-3 translate-x-1/2 text-lg pointer-events-none z-10" /> */}
        <input
          className="bg-[<url('/img/hero-pattern.svg')>] border border-gray-400 p-2 h-11 w-full rounded-3xl
          focus:outline-none focus:ring focus:border-blue-300 text-gray-950"
          ref={ref}
          type="text"
          placeholder="Search for a character"
          onChange={(e) => setInputValue(e.target.value)}
          onSubmit={(e) => {
            e.preventDefault();
            if (ref.current) {
              onSearch(ref.current.value);
            }
          }}
        />
      </div>
    </form>
  );
};

export default SearchInput;
