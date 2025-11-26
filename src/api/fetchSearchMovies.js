import tmdbClient from "@api/axios";
import { API_ROUTES } from "@constants";

export const fetchSearchMovies = async ({ page = 1, query, signal }) => {
  const response = await tmdbClient.get(API_ROUTES.SEARCH, {
    params: { page, query },
    signal,
  });

  const result = response.data;

  return {
    page: result.page,
    results: result.results.map((movie) => ({
      id: movie.id,
      posterPath: movie.poster_path,
      title: movie.title,
      voteAverage: movie.vote_average,
    })),
  };
};
