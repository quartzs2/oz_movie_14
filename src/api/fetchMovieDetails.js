import tmdbClient from "@api/axios";
import { API_ROUTES } from "@constants";

export const fetchMovieDetails = async ({ movieId, signal }) => {
  const response = await tmdbClient.get(API_ROUTES.MOVIE_DETAILS({ movieId }), {
    signal,
  });

  const result = response.data;

  return {
    backdropPath: result.backdrop_path,
    genres: result.genres,
    overview: result.overview,
    title: result.title,
    voteAverage: result.vote_average,
  };
};
