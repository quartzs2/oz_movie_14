import {
  infiniteQueryOptions,
  queryOptions,
  skipToken,
} from "@tanstack/react-query";

import { movieApi } from "./movie";
import { movieKeys } from "./queryKeys";

export const nowPlayingQueryOptions = () =>
  queryOptions({
    queryFn: ({ signal }) => movieApi.getNowPlaying({ signal }),
    queryKey: movieKeys.nowPlaying(),
  });

export const movieDetailQueryOptions = (movieId) =>
  queryOptions({
    queryFn: ({ signal }) => movieApi.getDetail({ movieId, signal }),
    queryKey: movieKeys.detail(movieId),
  });

export const searchMoviesQueryOptions = (query) => {
  const trimmedQuery = query.trim();
  const hasQuery = trimmedQuery.length > 0;

  return queryOptions({
    queryFn: hasQuery
      ? ({ signal }) => movieApi.search({ query: trimmedQuery, signal })
      : skipToken,
    queryKey: movieKeys.search(trimmedQuery),
  });
};

export const searchMoviesInfiniteQueryOptions = (query) => {
  const trimmedQuery = query.trim();
  const hasQuery = trimmedQuery.length > 0;

  return infiniteQueryOptions({
    enabled: hasQuery,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
    queryFn: ({ pageParam, signal }) =>
      movieApi.search({ page: pageParam, query: trimmedQuery, signal }),
    queryKey: movieKeys.search(trimmedQuery),
  });
};

export const popularMoviesInfiniteQueryOptions = () =>
  infiniteQueryOptions({
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
    queryFn: ({ pageParam, signal }) =>
      movieApi.getPopular({ page: pageParam, signal }),
    queryKey: movieKeys.popular(),
  });
