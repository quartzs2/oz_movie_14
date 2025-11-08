export const TMDB_API_URL = "https://api.themoviedb.org/3/";
export const TMDB_IMAGE_URL = "https://image.tmdb.org/t/p/w500/";

export const API_ROUTES = {
  MOVIE_DETAILS: ({ movieId }) => `movie/${movieId}`,
  POPULAR_MOVIES: "movie/popular",
  SEARCH: "search/movie",
};

export const ROUTE_PATHS = {
  DETAIL: "/detail/:movieId",
  HOME: "/",
  NOT_FOUND: "*",
  SEARCH: "/search",
};

export const ROUTE_HANDLERS = {
  DETAIL: (movieId) => `/detail/${movieId}`,
};
