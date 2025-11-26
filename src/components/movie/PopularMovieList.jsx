import { popularMoviesInfiniteQueryOptions } from "@api";
import { MovieList } from "@components";
import { useIntersect } from "@hooks";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

export const PopularMovieList = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery(popularMoviesInfiniteQueryOptions());

  const ref = useIntersect({
    onIntersect: () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  const movies = data?.pages?.flatMap((page) => page.results) || [];
  const uniqueMovies = [
    ...new Map(movies.map((movie) => [movie.id, movie])).values(),
  ];

  return (
    <MovieList
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      lastElementRef={ref}
      movies={uniqueMovies}
    />
  );
};
