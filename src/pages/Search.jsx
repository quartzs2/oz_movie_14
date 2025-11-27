import { searchMoviesInfiniteQueryOptions } from "@api";
import { MovieList } from "@components";
import { useIntersect } from "@hooks";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useSearchParams } from "react-router";

const SearchResultList = ({ query }) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery(searchMoviesInfiniteQueryOptions(query));

  const ref = useIntersect({
    onIntersect: () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  const uniqueMovies = useMemo(() => {
    const movies = data?.pages?.flatMap((page) => page.results) || [];
    return [...new Map(movies.map((movie) => [movie.id, movie])).values()];
  }, [data?.pages]);

  if (!uniqueMovies.length) {
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
        <MovieList
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          lastElementRef={ref}
          movies={uniqueMovies}
        />
      </section>
    </div>
  );
};

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  const hasQuery = query.trim().length > 0;

  if (!hasQuery) {
    return (
      <div className="flex flex-1 items-center justify-center bg-neutral-50 dark:bg-gray-950">
        <p className="text-gray-500 dark:text-gray-400">
          검색어를 입력해주세요.
        </p>
      </div>
    );
  }

  return <SearchResultList query={query} />;
};

export default Search;
