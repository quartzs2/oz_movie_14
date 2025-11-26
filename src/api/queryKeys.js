export const movieKeys = {
  all: ["movies"],
  detail: (movieId) => [...movieKeys.details(), movieId],
  details: () => [...movieKeys.all, "detail"],
  nowPlaying: () => [...movieKeys.all, "nowPlaying"],
  popular: () => [...movieKeys.all, "popular"],
  search: (query) => [...movieKeys.searches(), query],
  searches: () => [...movieKeys.all, "search"],
};
