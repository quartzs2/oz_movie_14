import { useEffect, useRef, useState } from "react";

function useFetch({ options = {}, queryFn, queryKey = [] }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const queryFnRef = useRef(queryFn);
  queryFnRef.current = queryFn;

  const serializedOptions = JSON.stringify(options);
  const serializedQueryKey = JSON.stringify(queryKey);

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
        const parsedOptions = JSON.parse(serializedOptions);

        const result = await queryFnRef.current({
          ...parsedOptions,
          signal: controller.signal,
        });

        if (!controller.signal.aborted) {
          setData(result);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err);
        }
      } finally {
        // abort되었을 때는 로딩 상태를 false로 변경하지 않음
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [serializedQueryKey, serializedOptions]);

  return { data, error, isLoading };
}

export default useFetch;
