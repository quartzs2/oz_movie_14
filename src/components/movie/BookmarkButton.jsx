import { useAuth, useBookmarkCheck, useBookmarkToggle } from "@hooks";
import { cn } from "@utils";
import { Bookmark } from "lucide-react";
import { toast } from "sonner";

export const BookmarkButton = ({ movie, movieId }) => {
  const { user } = useAuth();
  const { data: isBookmarked, isLoading: isCheckingBookmark } =
    useBookmarkCheck({ movieId });
  const {
    addBookmark,
    isLoading: isTogglingBookmark,
    removeBookmark,
  } = useBookmarkToggle();

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error("로그인이 필요합니다.");
      return;
    }

    if (isBookmarked) {
      removeBookmark(movieId);
    } else {
      addBookmark(movie);
    }
  };

  const isProcessing = isCheckingBookmark || isTogglingBookmark;

  if (!user) {
    return null;
  }

  return (
    <button
      className={cn(
        "absolute top-2 right-2 z-10 cursor-pointer rounded-full bg-black/60 p-2",
        "transition-all duration-200 hover:scale-110 hover:bg-black/80",
        "backdrop-blur-sm",
      )}
      disabled={isProcessing}
      onClick={handleClick}
      type="button"
    >
      <Bookmark
        className={cn(
          "h-5 w-5 transition-colors",
          isBookmarked ? "fill-yellow-400 text-yellow-400" : "text-white",
        )}
      />
    </button>
  );
};
