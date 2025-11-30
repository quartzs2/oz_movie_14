import { useBookmarkToggle } from "@hooks";
import { Bookmark as BookmarkIcon } from "lucide-react";

import { BookmarkCard } from "./BookmarkCard";

export const BookmarkList = ({ bookmarks }) => {
  const { removeBookmark } = useBookmarkToggle();

  if (!bookmarks || bookmarks.length === 0) {
    return (
      <div className="py-12 text-center text-gray-500 dark:text-gray-400">
        <BookmarkIcon className="mx-auto mb-3 h-12 w-12 opacity-50" />
        <p>아직 북마크한 영화가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {bookmarks.map((bookmark) => (
        <BookmarkCard
          bookmark={bookmark}
          key={bookmark.id}
          onRemove={removeBookmark}
        />
      ))}
    </div>
  );
};
