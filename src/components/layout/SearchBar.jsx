import { useSearchQuery } from "@hooks";

const DEBOUNCE_DELAY_MS = 500;

const SearchBar = () => {
  const { handleInputChange, searchQuery } = useSearchQuery({
    debounceDelay: DEBOUNCE_DELAY_MS,
  });

  return (
    <div className="flex w-full items-center justify-center">
      <input
        className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-600 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:placeholder:text-gray-400"
        onChange={handleInputChange}
        placeholder="검색어를 입력해주세요"
        type="text"
        value={searchQuery}
      />
    </div>
  );
};

export default SearchBar;
