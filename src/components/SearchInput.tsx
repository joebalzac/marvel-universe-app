import { useEffect, useRef, useState } from "react";

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
        <input
          className="border border-gray-400 p-2 w-full rounded
          focus:outline-none focus:ring focus:border-blue-300 text-gray-950"
          ref={ref}
          type="text"
          placeholder="Search for a character"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onSubmit={(e) => {
            e.preventDefault();
            if (ref.current) {
              onSearch(ref.current.value);
            }
          }}
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchInput;
