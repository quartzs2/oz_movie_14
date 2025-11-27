import { API_ROUTES } from "@constants";

import tmdbClient from "./axios";

export const movieApi = {
  getDetail: async ({ movieId, signal }) => {
    const response = await tmdbClient.get(
      API_ROUTES.MOVIE_DETAILS({ movieId }),
      {
        signal,
      },
    );

    const result = response.data;

    return {
      backdropPath: result.backdrop_path,
      genres: result.genres,
      overview: result.overview,
      title: result.title,
      voteAverage: result.vote_average,
    };
  },

  getNowPlaying: async ({ page = 1, signal }) => {
    const response = await tmdbClient.get(API_ROUTES.NOW_PLAYING, {
      params: { page },
      signal,
    });

    const result = response.data;

    return {
      dates: result.dates,
      page: result.page,
      results: result.results
        .filter((movie) => movie.adult === false)
        .map((movie) => ({
          id: movie.id,
          posterPath: movie.poster_path,
          title: movie.title,
          voteAverage: movie.vote_average,
        })),
    };
  },

  getPopular: async ({ page = 1, signal }) => {
    const response = await tmdbClient.get(API_ROUTES.POPULAR_MOVIES, {
      params: { page },
      signal,
    });

    const result = response.data;

    return {
      page: result.page,
      results: result.results
        .filter((movie) => movie.adult === false)
        .map((movie) => ({
          id: movie.id,
          posterPath: movie.poster_path,
          title: movie.title,
          voteAverage: movie.vote_average,
        })),
      totalPages: result.total_pages,
      totalResults: result.total_results,
    };
  },

  search: async ({ page = 1, query, signal }) => {
    const response = await tmdbClient.get(API_ROUTES.SEARCH, {
      params: { page, query },
      signal,
    });

    const result = response.data;

    return {
      page: result.page,
      results: result.results
        .filter((movie) => movie.adult === false)
        .map((movie) => ({
          id: movie.id,
          posterPath: movie.poster_path,
          title: movie.title,
          voteAverage: movie.vote_average,
        })),
      totalPages: result.total_pages,
      totalResults: result.total_results,
    };
  },
};
