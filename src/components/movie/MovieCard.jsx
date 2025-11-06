import { ROUTE_HANDLERS, TMDB_IMAGE_URL } from "@constants/urls";
import { cn } from "@utils/cn";
import { Link } from "react-router";

const MovieCard = ({ movie }) => {
  return (
    <article className="w-full">
      <Link
        className="group relative block"
        to={ROUTE_HANDLERS.DETAIL(movie.id)}
      >
        <img
          alt={movie.title}
          className="aspect-2/3 w-full rounded-2xl object-cover"
          src={TMDB_IMAGE_URL + movie.posterPath}
        />
        <div
          className={cn(
            "absolute inset-0 flex flex-col justify-end",
            "bg-linear-to-t from-black/80 via-black/40 to-transparent",
            "rounded-2xl p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100",
          )}
        >
          <h2 className="line-clamp-2 text-sm font-semibold text-white">
            {movie.title}
          </h2>
          <p className="mt-1 text-xs text-yellow-400">
            ⭐ {movie.voteAverage.toFixed(1)}
          </p>
        </div>
      </Link>
    </article>
  );
};
export default MovieCard;
