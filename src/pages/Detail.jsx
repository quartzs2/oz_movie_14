import { fetchMovieDetails, movieKeys } from "@api";
import { ErrorMessage, LoadingSpinner } from "@components";
import { TMDB_IMAGE_URL } from "@constants";
import { useQuery } from "@tanstack/react-query";
import { StarIcon } from "lucide-react";
import { useParams } from "react-router";

const Detail = () => {
  const { movieId } = useParams();

  const { data, error, isLoading } = useQuery({
    queryFn: ({ signal }) => fetchMovieDetails({ movieId, signal }),
    queryKey: movieKeys.detail(movieId),
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  const { backdropPath, genres, overview, title, voteAverage } = data;

  return (
    <main className="bg-neutral-50 pt-8 pb-8 text-neutral-900 dark:bg-gray-950 dark:text-gray-100">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 lg:flex-row lg:items-start">
        <div className="flex w-full items-center justify-center lg:max-w-sm">
          <img
            alt={title}
            className="aspect-video w-full rounded-3xl object-cover shadow-2xl lg:aspect-2/3"
            src={TMDB_IMAGE_URL + backdropPath}
          />
        </div>

        <article className="flex w-full flex-1 flex-col gap-8">
          <header className="space-y-4">
            <div>
              <p className="text-sm tracking-widest text-neutral-500 uppercase dark:text-gray-400">
                Movie Detail
              </p>
              <h1 className="mt-1 text-3xl leading-tight font-bold text-neutral-900 lg:text-4xl dark:text-gray-100">
                {title}
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-2 rounded-full border border-yellow-500 px-3 py-1 text-sm text-yellow-600 dark:border-yellow-400 dark:text-yellow-400">
                <StarIcon className="h-3 w-3 fill-current" />
                {voteAverage.toFixed(1)}
              </span>
              <ul className="flex flex-wrap gap-2 text-sm text-neutral-700 dark:text-gray-300">
                {genres.map((genre) => (
                  <li
                    className="rounded-full bg-neutral-200 px-3 py-1 dark:bg-gray-700"
                    key={genre.id ?? genre.name}
                  >
                    {genre.name}
                  </li>
                ))}
              </ul>
            </div>
          </header>

          <section className="rounded-3xl bg-white p-6 shadow-sm dark:bg-gray-800">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-gray-100">
              줄거리
            </h2>
            <p className="mt-3 leading-relaxed text-neutral-700 dark:text-gray-300">
              {overview}
            </p>
          </section>
        </article>
      </div>
    </main>
  );
};

export default Detail;
