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

/**
 * 에러가 요청 취소(Canceled/Aborted)에 의한 것인지 확인하는 유틸리티 함수
 * @param {Error} error
 * @returns {boolean}
 */
export const isRequestCanceled = (error) => {
  return (
    axios.isCancel(error) ||
    error.name === "AbortError" ||
    error.name === "CanceledError" ||
    error.code === "ERR_CANCELED"
  );
};

export default tmdbClient;
