import axios from "axios";

/**
 * 에러가 요청 취소(Canceled/Aborted)에 의한 것인지 확인하는 유틸리티 함수
 *
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
