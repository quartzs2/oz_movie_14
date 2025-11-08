import { fetchNowPlayingMovies } from "@api/fetchNowPlayingMovies";
import { Carousel, MovieCard } from "@components/index";
import { useFetch } from "@hooks";
import { SwiperSlide } from "swiper/react";

const NowPlayingCarousel = () => {
  const { data, error, isLoading } = useFetch({
    queryFn: fetchNowPlayingMovies,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <section className="w-full px-4">
      <h1 className="mt-4 text-xl text-gray-700">NOW PLAYING</h1>
      <p className="text-sm text-gray-500">
        {data.dates.minimum} - {data.dates.maximum}
      </p>
      <Carousel
        autoplay={true}
        className="mt-1"
        loop={true}
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
export default NowPlayingCarousel;
