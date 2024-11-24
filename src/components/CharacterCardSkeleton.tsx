const CharacterCardSkeleton = () => {
  return (
    <div
      role="status"
      className="max-w-md border border-gray-200 rounded shadow animate-pulse dark:border-gray-700"
    >
      <div className="flex items-center justify-center h-64 mb-4 bg-gray-300 rounded dark:bg-gray-700"></div>
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-64 mb-4"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default CharacterCardSkeleton;
