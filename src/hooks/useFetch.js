import { isRequestCanceled } from "@api/axios";
import { isEqual } from "es-toolkit";
import { useEffect, useRef, useState } from "react";

/**
 * 비동기 데이터를 가져오기 위한 커스텀 훅입니다.
 * React Query의 인터페이스와 유사하게 설계되었습니다.
 *
 * @template TData - 반환될 데이터의 타입
 * @template TParams - 쿼리 함수에 전달될 파라미터 객체의 타입
 *
 * @param {Object} params
 * @param {Function} params.queryFn - 데이터를 가져오는 비동기 함수. ({ signal, ...options }) => Promise<TData> 형태여야 합니다.
 * @param {Array} [params.queryKey=[]] - 쿼리를 다시 실행할 의존성 배열 (이 배열의 값이 변경되면 재요청)
 * @param {TParams} [params.options={}] - queryFn에 전달할 추가 옵션 객체
 *
 * @returns {Object} 결과 객체
 * @returns {TData|null} result.data - 성공적으로 가져온 데이터 (초기값: null)
 * @returns {Error|null} result.error - 발생한 에러 객체 (초기값: null)
 * @returns {boolean} result.isLoading - 로딩 상태 여부 (초기값: true)
 */
function useFetch({ options = {}, queryFn, queryKey = [] }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const queryFnRef = useRef(queryFn);
  useEffect(() => {
    queryFnRef.current = queryFn;
  }, [queryFn]);

  const memoizedOptionsRef = useRef(options);
  if (!isEqual(memoizedOptionsRef.current, options)) {
    memoizedOptionsRef.current = options;
  }
  const memoizedOptions = memoizedOptionsRef.current;

  const memoizedQueryKeyRef = useRef(queryKey);
  if (!isEqual(memoizedQueryKeyRef.current, queryKey)) {
    memoizedQueryKeyRef.current = queryKey;
  }
  const memoizedQueryKey = memoizedQueryKeyRef.current;

  useEffect(() => {
    if (!queryFnRef.current) {
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      setData(null);

      try {
        const result = await queryFnRef.current({
          ...memoizedOptions,
          signal: controller.signal,
        });

        if (!controller.signal.aborted) {
          setData(result);
        }
      } catch (err) {
        if (!isRequestCanceled(err)) {
          setError(err);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [memoizedQueryKey, memoizedOptions]);

  return { data, error, isLoading };
}

export default useFetch;
