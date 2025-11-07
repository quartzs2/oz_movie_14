import { API_ROUTES, TMDB_API_URL } from "@constants";

const defaultOptions = {
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_ACCESS_TOKEN}`,
  },
};

export const fetchMovieDetails = async ({ movieId, signal }) => {
  const apiUrl = new URL(API_ROUTES.MOVIE_DETAILS({ movieId }), TMDB_API_URL);
  apiUrl.searchParams.set("language", "ko-KR");

  const response = await fetch(apiUrl, {
    ...defaultOptions,
    signal,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();

  return {
    backdropPath: result.backdrop_path,
    genres: result.genres,
    overview: result.overview,
    title: result.title,
    voteAverage: result.vote_average,
  };
};
