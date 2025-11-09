import { fetchSearchMovies } from "@api/fetchSearchMovies";
import { ErrorMessage, LoadingSpinner, MovieCard } from "@components";
import { useFetch } from "@hooks";
import { useSearchParams } from "react-router";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("query") ?? "").trim();
  const hasQuery = query.length > 0;

  const { data, error, isLoading } = useFetch({
    queryFn: hasQuery
      ? (options) => fetchSearchMovies({ query, ...options })
      : undefined,
    queryKey: hasQuery ? ["search", query] : ["search"],
  });

  if (!hasQuery) {
    return (
      <div className="flex flex-1 items-center justify-center bg-neutral-50">
        <p className="text-gray-500">검색어를 입력해주세요.</p>
      </div>
    );
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (!data?.results?.length) {
    return (
      <div className="flex flex-1 items-center justify-center bg-neutral-50">
        <p className="text-gray-500">검색 결과가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center bg-neutral-50">
      <section className="mx-auto grid grid-cols-2 gap-4 px-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {data.results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </section>
    </div>
  );
};

export default Search;
