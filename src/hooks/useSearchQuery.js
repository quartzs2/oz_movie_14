import { ROUTE_PATHS } from "@constants";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";

import useDebounce from "./useDebounce";

/**
 * 검색어 상태와 URL 동기화를 관리하는 커스텀 훅
 * @param {Object} options
 * @param {number} options.debounceDelay - 디바운스 지연 시간 (ms)
 * @returns {{ searchQuery: string, handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void }}
 */
const useSearchQuery = ({ debounceDelay = 500 } = {}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce({
    delay: debounceDelay,
    value: searchQuery,
  });

  /**
   * useEffect가 실행되어야 하는지 여부
   * - true: 사용자가 방금 타이핑했으니, 디바운싱이 끝나면 useEffect가 URL을 변경해야 함
   * - false: 사용자가 방금 타이핑하지 않았으니, useEffect가 URL을 변경하지 않아도 됨
   */
  const shouldSyncQueryRef = useRef(false);

  /**
   * 검색 페이지가 아닐 경우 검색어 초기화
   * - useLayoutEffect는 렌더링 직전에 실행되므로, 렌더링 후에 실행되는 useEffect와 달리 렌더링 후에 실행되지 않음
   * - 렌더링 직전에 실행: DOM 변경이 완료된 후, 브라우저가 화면을 그리기(paint) 전에 동기적으로 실행
   *
   * - 현재 경로가 search 페이지가 아닐 경우 검색어 초기화
   * - 현재 경로가 search 페이지일 경우 searchParams의 query를 searchQuery로 설정
   */
  useLayoutEffect(() => {
    if (location.pathname !== ROUTE_PATHS.SEARCH) {
      shouldSyncQueryRef.current = false;
      setSearchQuery("");
      return;
    }

    const currentQueryParam =
      new URLSearchParams(location.search).get("query") ?? "";

    shouldSyncQueryRef.current = false;
    setSearchQuery((prev) =>
      prev === currentQueryParam ? prev : currentQueryParam,
    );
  }, [location.pathname, location.search]);

  /**
   * URL 변경을 처리하는 useEffect
   */
  useEffect(() => {
    if (!shouldSyncQueryRef.current) {
      return;
    }

    const trimmedQuery = debouncedSearchQuery.trim();

    /**
     * 검색어가 비어있을 경우 쿼리 파라미터를 제거한 URL로 변경
     *
     * - http://localhost:5173/search?query= 일 경우 http://localhost:5173/search 로 변경
     */
    if (!trimmedQuery) {
      if (location.pathname === ROUTE_PATHS.SEARCH && location.search !== "") {
        navigate(ROUTE_PATHS.SEARCH, { replace: true });
      }
      shouldSyncQueryRef.current = false;
      return;
    }

    /**
     * 검색어가 존재할 경우 처리
     *
     * - 검색어를 인코딩해서 이동할 url을 생성(http://localhost:5173/search?query=검색어)
     * - 이미 해당 url에 있는 경우 처리하지 않음
     * - 1) location.pathname이 현재 경로와 같은지 확인
     * - 2) location.search가 현재 검색어와 같은지 확인
     */
    const encodedQuery = encodeURIComponent(trimmedQuery);
    const targetSearch = `${ROUTE_PATHS.SEARCH}?query=${encodedQuery}`;
    const isAlreadyOnTarget =
      location.pathname === ROUTE_PATHS.SEARCH &&
      location.search === `?query=${encodedQuery}`;

    if (isAlreadyOnTarget) {
      shouldSyncQueryRef.current = false;
      return;
    }

    /**
     * 이동할 url이 현재 url과 다를 경우 이동
     */
    navigate(targetSearch, {
      replace: location.pathname === ROUTE_PATHS.SEARCH,
    });
    shouldSyncQueryRef.current = false;
  }, [debouncedSearchQuery, location.pathname, location.search, navigate]);

  const handleInputChange = (e) => {
    /**
     * 검색어 입력시 shouldSyncQueryRef를 true로 설정
     */
    shouldSyncQueryRef.current = true;
    setSearchQuery(e.target.value);
  };

  return {
    handleInputChange,
    searchQuery,
  };
};

export default useSearchQuery;
