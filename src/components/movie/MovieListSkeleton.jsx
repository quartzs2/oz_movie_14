import { MovieCardSkeleton } from "@components";

export const MovieListSkeleton = () => {
  return (
    <>
      {Array.from({ length: 12 }).map((_, index) => (
        <MovieCardSkeleton key={`skeleton-${index}`} />
      ))}
    </>
  );
};
