import { API_ROUTES, TMDB_API_URL } from "@constants";

const defaultOptions = {
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_ACCESS_TOKEN}`,
  },
};

export const fetchSearchMovies = async ({ page = 1, query, signal }) => {
  const apiUrl = new URL(API_ROUTES.SEARCH, TMDB_API_URL);
  apiUrl.searchParams.set("page", page);
  apiUrl.searchParams.set("language", "ko-KR");
  apiUrl.searchParams.set("query", query);

  const response = await fetch(apiUrl, {
    ...defaultOptions,
    signal,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();

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
