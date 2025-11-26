import {
  ErrorMessage,
  MovieListSkeleton,
  NowPlayingCarousel,
  PopularMovieList,
} from "@components";
import { ErrorBoundary, Suspense } from "@suspensive/react";

const Home = () => {
  return (
    <div className="flex flex-col gap-4 bg-neutral-50 dark:bg-gray-950">
      <NowPlayingCarousel />
      <section>
        <h1 className="px-6 text-xl text-gray-700 dark:text-gray-200">
          POPULAR MOVIES
        </h1>
        <div className="mx-auto mt-1 grid grid-cols-2 gap-4 px-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          <ErrorBoundary
            fallback={({ error, reset }) => (
              <ErrorMessage error={error} reset={reset} />
            )}
          >
            <Suspense fallback={<MovieListSkeleton />}>
              <PopularMovieList />
            </Suspense>
          </ErrorBoundary>
        </div>
      </section>
    </div>
  );
};

export default Home;
