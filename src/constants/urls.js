export const TMDB_API_URL = "https://api.themoviedb.org/3/";

export const API_ROUTES = {
  MOVIE_DETAILS: ({ movieId }) => `movie/${movieId}`,
  POPULAR_MOVIES: "movie/popular",
};

export const ROUTE_PATHS = {
  HOME: "/",
  NOT_FOUND: "*",
};
