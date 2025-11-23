import { MovieCard, MovieCardSkeleton } from "@components";

export const MovieList = ({
  hasNextPage,
  isFetchingNextPage,
  isLoading,
  lastElementRef,
  movies,
}) => {
  if (isLoading) {
    return (
      <>
        {Array.from({ length: 12 }).map((_, index) => (
          <MovieCardSkeleton key={`skeleton-${index}`} />
        ))}
      </>
    );
  }

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
