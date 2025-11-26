import { MovieCard, MovieCardSkeleton } from "@components";

export const MovieList = ({
  hasNextPage,
  isFetchingNextPage,
  lastElementRef,
  movies,
}) => {
  return (
    <>
      {movies.map((movie) => (
        <MovieCard key={`${movie.id}-${movie.title}`} movie={movie} />
      ))}

      {isFetchingNextPage &&
        Array.from({ length: 6 }).map((_, index) => (
          <MovieCardSkeleton key={`next-skeleton-${index}`} />
        ))}

      {hasNextPage && !isFetchingNextPage && (
        <div className="h-1 w-full" ref={lastElementRef} />
      )}
    </>
  );
};
