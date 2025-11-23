import { fetchPopularMovieList } from "@api";
import { ErrorMessage, MovieList, NowPlayingCarousel } from "@components";
import { useInfinityScroll } from "@hooks";

const Home = () => {
  const { data, error, hasNextPage, isFetchingNextPage, isLoading, ref } =
    useInfinityScroll({
      getNextPageParam: (lastPage) => {
        return lastPage.page < lastPage.totalPages
          ? lastPage.page + 1
          : undefined;
      },
      initialPageParam: 1,
      queryFn: ({ pageParam, signal }) =>
        fetchPopularMovieList({ page: pageParam, signal }),
    });

  if (error) {
    return <ErrorMessage error={error} />;
  }

  const movies = data?.pages?.flatMap((page) => page.results) || [];
  const uniqueMovies = [
    ...new Map(movies.map((movie) => [movie.id, movie])).values(),
  ];

  return (
    <div className="flex flex-col gap-4 bg-neutral-50 dark:bg-gray-950">
      <NowPlayingCarousel />
      <section>
        <h1 className="px-6 text-xl text-gray-700 dark:text-gray-200">
          POPULAR MOVIES
        </h1>
        <div className="mx-auto mt-1 grid grid-cols-2 gap-4 px-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          <MovieList
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            isLoading={isLoading}
            lastElementRef={ref}
            movies={uniqueMovies}
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
