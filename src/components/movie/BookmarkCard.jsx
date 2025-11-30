import { Image } from "@components";
import { ROUTE_HANDLERS, TMDB_IMAGE_URL } from "@constants";
import { Star as StarIcon, Trash2 as Trash2Icon } from "lucide-react";
import { Link } from "react-router";

export const BookmarkCard = ({ bookmark, onRemove }) => {
  const voteAverage = Number(bookmark.voteAverage).toFixed(1);
  const handleRemoveClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onRemove(bookmark.movieId);
  };

  return (
    <Link
      className="group relative block overflow-hidden rounded-lg"
      key={bookmark.id}
      to={ROUTE_HANDLERS.DETAIL(bookmark.movieId)}
    >
      <Image
        alt={bookmark.title}
        className="aspect-2/3 w-full rounded-2xl object-cover"
        src={TMDB_IMAGE_URL + bookmark.posterPath}
      />
      <div className="absolute inset-0 flex flex-col justify-between bg-linear-to-t from-black/80 via-black/20 to-transparent p-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <button
          className="self-end rounded-full bg-red-500/80 p-2 transition-all hover:scale-110 hover:bg-red-600"
          onClick={handleRemoveClick}
          type="button"
        >
          <Trash2Icon className="h-4 w-4 text-white" />
        </button>
        <div>
          <h3 className="line-clamp-2 text-sm font-semibold text-white">
            {bookmark.title}
          </h3>
          <p className="mt-1 flex items-center gap-1 text-xs text-yellow-400">
            <StarIcon className="h-3 w-3 fill-current" />
            {voteAverage}
          </p>
        </div>
      </div>
    </Link>
  );
};
