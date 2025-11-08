import { fetchPopularMovieList } from "@api/fetchPopularMovieList";
import { MovieCard } from "@components";
import { NowPlayingCarousel } from "@components/index";
import { useFetch } from "@hooks";

const Home = () => {
  const { data, error, isLoading } = useFetch({
    queryFn: fetchPopularMovieList,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col items-center gap-4 bg-neutral-50">
      <NowPlayingCarousel />
      <section>
        <h1 className="px-6 text-xl text-gray-700">POPULAR MOVIES</h1>
        <div className="mx-auto mt-1 grid grid-cols-2 gap-4 px-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {data?.results?.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
