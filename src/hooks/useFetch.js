import { isEqual } from "es-toolkit";
import { useEffect, useRef, useState } from "react";

const ABORT_ERROR_NAME = "AbortError";

function useFetch({ options = {}, queryFn, queryKey = [] }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const queryFnRef = useRef(queryFn);
  useEffect(() => {
    queryFnRef.current = queryFn;
  }, [queryFn]);

  const [memoizedOptions, setMemoizedOptions] = useState(options);
  const [memoizedQueryKey, setMemoizedQueryKey] = useState(queryKey);

  useEffect(() => {
    if (!isEqual(memoizedOptions, options)) {
      setMemoizedOptions(options);
    }
  }, [options, memoizedOptions]);

  useEffect(() => {
    if (!isEqual(memoizedQueryKey, queryKey)) {
      setMemoizedQueryKey(queryKey);
    }
  }, [queryKey, memoizedQueryKey]);

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
        if (err.name !== ABORT_ERROR_NAME) {
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
