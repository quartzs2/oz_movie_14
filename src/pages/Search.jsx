import { fetchSearchMovies, movieKeys } from "@api";
import { MovieCard } from "@components";
import { skipToken, useSuspenseQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("query") ?? "").trim();
  const hasQuery = query.length > 0;

  const { data } = useSuspenseQuery({
    queryFn: hasQuery
      ? ({ signal }) => fetchSearchMovies({ query, signal })
      : skipToken,
    queryKey: movieKeys.search(query),
  });

  if (!hasQuery) {
    return (
      <div className="flex flex-1 items-center justify-center bg-neutral-50 dark:bg-gray-950">
        <p className="text-gray-500 dark:text-gray-400">
          검색어를 입력해주세요.
        </p>
      </div>
    );
  }

  if (!data?.results?.length) {
    return (
      <div className="flex flex-1 items-center justify-center bg-neutral-50 dark:bg-gray-950">
        <p className="text-gray-500 dark:text-gray-400">
          검색 결과가 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center bg-neutral-50 dark:bg-gray-950">
      <section className="mx-auto grid grid-cols-2 gap-4 px-4 pt-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {data.results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </section>
    </div>
  );
};

export default Search;
