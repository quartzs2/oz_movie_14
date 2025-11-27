import { TMDB_API_URL } from "@constants";
import axios from "axios";

const tmdbClient = axios.create({
  baseURL: TMDB_API_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_ACCESS_TOKEN}`,
    "Content-Type": "application/json",
  },
  params: {
    language: "ko-KR",
  },
});

export default tmdbClient;
