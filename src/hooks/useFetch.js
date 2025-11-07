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

        setData(result);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err);
        }
      } finally {
        setIsLoading(false);
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
