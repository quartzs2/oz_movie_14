import tmdbClient from "@api/axios";
import { API_ROUTES } from "@constants";

export const fetchPopularMovieList = async ({ page = 1, signal }) => {
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
};
