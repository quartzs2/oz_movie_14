import { popularMoviesInfiniteQueryOptions } from "@api";
import { MovieList } from "@components";
import { useIntersect } from "@hooks";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";

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

  const uniqueMovies = useMemo(() => {
    const movies = data.pages.flatMap((page) => page.results);
    return [...new Map(movies.map((movie) => [movie.id, movie])).values()];
  }, [data.pages]);

  return (
    <MovieList
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      lastElementRef={ref}
      movies={uniqueMovies}
    />
  );
};
