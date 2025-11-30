import { supabase } from "./supabase";

const TABLE = "bookmarks";
const FIELDS = {
  CREATED_AT: "created_at",
  MOVIE_ID: "movie_id",
  POSTER_PATH: "poster_path",
  TITLE: "title",
  USER_ID: "user_id",
  VOTE_AVERAGE: "vote_average",
};

export const bookmarkApi = {
  async addBookmark({ movie, userId }) {
    const { data, error } = await supabase
      .from(TABLE)
      .insert({
        [FIELDS.MOVIE_ID]: movie.id,
        [FIELDS.POSTER_PATH]: movie.posterPath,
        [FIELDS.TITLE]: movie.title,
        [FIELDS.USER_ID]: userId,
        [FIELDS.VOTE_AVERAGE]: movie.voteAverage,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  },

  async checkBookmark({ movieId, userId }) {
    const { data, error } = await supabase
      .from(TABLE)
      .select("id")
      .eq(FIELDS.USER_ID, userId)
      .eq(FIELDS.MOVIE_ID, movieId)
      .maybeSingle();

    if (error) {
      throw error;
    }
    return Boolean(data);
  },

  async getBookmarks({ userId }) {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .eq(FIELDS.USER_ID, userId)
      .order(FIELDS.CREATED_AT, { ascending: false });

    if (error) {
      throw error;
    }

    return data.map((bookmark) => ({
      createdAt: bookmark[FIELDS.CREATED_AT],
      id: bookmark.id,
      movieId: bookmark[FIELDS.MOVIE_ID],
      posterPath: bookmark[FIELDS.POSTER_PATH],
      title: bookmark[FIELDS.TITLE],
      userId: bookmark[FIELDS.USER_ID],
      voteAverage: bookmark[FIELDS.VOTE_AVERAGE],
    }));
  },

  async removeBookmark({ movieId, userId }) {
    const { error } = await supabase
      .from(TABLE)
      .delete()
      .eq(FIELDS.USER_ID, userId)
      .eq(FIELDS.MOVIE_ID, movieId);

    if (error) {
      throw error;
    }
  },
};
