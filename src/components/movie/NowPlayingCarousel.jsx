import { fetchNowPlayingMovies } from "@api/fetchNowPlayingMovies";
import {
  Carousel,
  ErrorMessage,
  MovieCard,
  MovieCardSkeleton,
} from "@components/index";
import { useFetch } from "@hooks";
import { SwiperSlide } from "swiper/react";

const NowPlayingCarousel = () => {
  const { data, error, isLoading } = useFetch({
    queryFn: fetchNowPlayingMovies,
  });

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <section className="w-full px-4">
      <h1 className="mt-4 text-xl text-gray-700 dark:text-gray-200">
        NOW PLAYING
      </h1>
      {isLoading ? (
        <p className="invisible text-sm text-gray-500">Loading...</p>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {data.dates.minimum} - {data.dates.maximum}
        </p>
      )}
      <Carousel
        autoplay={!isLoading}
        className="mt-1"
        loop={!isLoading}
        slidesPerView={4}
        spaceBetween={16}
      >
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <SwiperSlide key={index}>
                <MovieCardSkeleton />
              </SwiperSlide>
            ))
          : data.results.map((movie) => (
              <SwiperSlide key={movie.id}>
                <MovieCard movie={movie} />
              </SwiperSlide>
            ))}
      </Carousel>
    </section>
  );
};
export default NowPlayingCarousel;
