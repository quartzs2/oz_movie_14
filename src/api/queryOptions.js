import { fetchMovieDetails } from "@api/fetchMovieDetails";
import { fetchNowPlayingMovies } from "@api/fetchNowPlayingMovies";
import { fetchPopularMovieList } from "@api/fetchPopularMovieList";
import { fetchSearchMovies } from "@api/fetchSearchMovies";
import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

import { movieKeys } from "./queryKeys";

export const nowPlayingQueryOptions = () =>
  queryOptions({
    queryFn: ({ signal }) => fetchNowPlayingMovies({ signal }),
    queryKey: movieKeys.nowPlaying(),
  });

export const movieDetailQueryOptions = (movieId) =>
  queryOptions({
    queryFn: ({ signal }) => fetchMovieDetails({ movieId, signal }),
    queryKey: movieKeys.detail(movieId),
  });

export const searchMoviesQueryOptions = (query) =>
  queryOptions({
    queryFn: ({ signal }) => fetchSearchMovies({ query, signal }),
    queryKey: movieKeys.search(query),
  });

export const popularMoviesInfiniteQueryOptions = () =>
  infiniteQueryOptions({
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
    queryFn: ({ pageParam, signal }) =>
      fetchPopularMovieList({ page: pageParam, signal }),
    queryKey: movieKeys.popular(),
  });
