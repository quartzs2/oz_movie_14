export const TMDB_API_URL = "https://api.themoviedb.org/3/";
export const TMDB_IMAGE_URL = "https://image.tmdb.org/t/p/w500/";

export const API_ROUTES = {
  MOVIE_DETAILS: ({ movieId }) => `movie/${movieId}`,
  NOW_PLAYING: "movie/now_playing",
  POPULAR_MOVIES: "movie/popular",
  SEARCH: "search/movie",
};

export const ROUTE_PATHS = {
  DETAIL: "/detail/:movieId",
  HOME: "/",
  LOGIN: "/login",
  MYPAGE: "/mypage",
  NOT_FOUND: "*",
  SEARCH: "/search",
  SIGNUP: "/signup",
};

export const ROUTE_HANDLERS = {
  DETAIL: (movieId) => `/detail/${movieId}`,
};
