import { fetchNowPlayingMovies, movieKeys } from "@api";
import {
  Carousel,
  ErrorMessage,
  MovieCard,
  MovieCardSkeleton,
} from "@components";
import { ErrorBoundary, Suspense } from "@suspensive/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { SwiperSlide } from "swiper/react";

const NowPlayingCarouselSkeleton = () => {
  return (
    <section className="w-full px-4">
      <h1 className="mt-4 text-xl text-gray-700 dark:text-gray-200">
        NOW PLAYING
      </h1>
      <p className="invisible text-sm text-gray-500">Loading...</p>
      <Carousel className="mt-1" slidesPerView={4} spaceBetween={16}>
        {Array.from({ length: 8 }).map((_, index) => (
          <SwiperSlide key={index}>
            <MovieCardSkeleton />
          </SwiperSlide>
        ))}
      </Carousel>
    </section>
  );
};

const NowPlayingCarouselContent = () => {
  const { data } = useSuspenseQuery({
    queryFn: ({ signal }) => fetchNowPlayingMovies({ signal }),
    queryKey: movieKeys.nowPlaying(),
  });

  return (
    <section className="w-full px-4">
      <h1 className="mt-4 text-xl text-gray-700 dark:text-gray-200">
        NOW PLAYING
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {data.dates.minimum} - {data.dates.maximum}
      </p>
      <Carousel
        autoplay
        className="mt-1"
        loop
        slidesPerView={4}
        spaceBetween={16}
      >
        {data.results.map((movie) => (
          <SwiperSlide key={movie.id}>
            <MovieCard movie={movie} />
          </SwiperSlide>
        ))}
      </Carousel>
    </section>
  );
};

const NowPlayingCarousel = () => {
  return (
    <ErrorBoundary
      fallback={({ error, reset }) => (
        <ErrorMessage error={error} reset={reset} />
      )}
    >
      <Suspense fallback={<NowPlayingCarouselSkeleton />}>
        <NowPlayingCarouselContent />
      </Suspense>
    </ErrorBoundary>
  );
};

export default NowPlayingCarousel;
