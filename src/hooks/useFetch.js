import { useEffect, useState } from "react";

function useFetch({ options = {}, query }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const serializedOptions = JSON.stringify(options);

  useEffect(() => {
    if (!query) {
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

        const result = await query({
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
  }, [query, serializedOptions]);

  return { data, error, isLoading };
}

export default useFetch;
