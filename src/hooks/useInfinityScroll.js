import { isRequestCanceled } from "@api/axios";
import { useIntersect } from "@hooks";
import { isEqual } from "es-toolkit";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * 무한 스크롤과 요청 취소(AbortController)를 관리하는 훅
 * * @param {Object} params
 * @param {Function} params.getNextPageParam (lastPage, allPages) => nextParam
 * @param {any} [params.initialPageParam=1]
 * @param {Function} params.queryFn ({ pageParam, signal }) => Promise
 * @returns {Object} { data, error, hasNextPage, isFetchingNextPage, isLoading, ref }
 */
const useInfinityScroll = ({
  getNextPageParam,
  initialPageParam = 1,
  queryFn,
}) => {
  const [data, setData] = useState({
    nextPageParam: initialPageParam,
    pageParams: [],
    pages: [],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
  const [error, setError] = useState(null);

  const hasNextPage =
    data.nextPageParam !== null && data.nextPageParam !== undefined;

  const isMountedRef = useRef(true);
  const abortControllerRef = useRef(null);
  const fnsRef = useRef({ getNextPageParam, queryFn });

  // 함수 참조를 최신 상태로 유지
  useEffect(() => {
    fnsRef.current = { getNextPageParam, queryFn };
  });

  const fetchPage = useCallback(async (pageParam, isInitial = false) => {
    // 이전 요청이 진행 중이면 취소하여 Race Condition 방지
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    if (isInitial) {
      setIsLoading(true);
    } else {
      setIsFetchingNextPage(true);
    }
    setError(null);

    try {
      const { getNextPageParam: currentGetNext, queryFn: currentQueryFn } =
        fnsRef.current;

      const result = await currentQueryFn({
        pageParam,
        signal: controller.signal,
      });

      if (!isMountedRef.current) {
        return;
      }

      setData((prev) => {
        const newPages = isInitial ? [result] : [...prev.pages, result];
        const newPageParams = isInitial
          ? [pageParam]
          : [...prev.pageParams, pageParam];

        const nextParam = currentGetNext(result, newPages);
        const normalizedNextParam = nextParam === undefined ? null : nextParam;

        const newState = {
          nextPageParam: normalizedNextParam,
          pageParams: newPageParams,
          pages: newPages,
        };

        // 불필요한 리렌더링 방지
        return isEqual(prev, newState) ? prev : newState;
      });
    } catch (err) {
      if (isRequestCanceled(err)) {
        return;
      }
      if (isMountedRef.current) {
        setError(err);
      }
    } finally {
      // 컴포넌트가 마운트 상태이고, 해당 요청이 취소되지 않았을 때만 로딩 해제
      if (isMountedRef.current && !controller.signal.aborted) {
        isInitial ? setIsLoading(false) : setIsFetchingNextPage(false);
      }
    }
  }, []);

  useEffect(() => {
    isMountedRef.current = true;

    setData({
      nextPageParam: initialPageParam,
      pageParams: [],
      pages: [],
    });
    fetchPage(initialPageParam, true);

    return () => {
      // 언마운트 시 진행 중인 요청 취소
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      isMountedRef.current = false;
    };
  }, [fetchPage, initialPageParam]);

  const ref = useIntersect({
    onIntersect: async () => {
      if (hasNextPage && !isLoading && !isFetchingNextPage) {
        await fetchPage(data.nextPageParam, false);
      }
    },
  });

  return { data, error, hasNextPage, isFetchingNextPage, isLoading, ref };
};

export default useInfinityScroll;
