import Skeleton from "@components/ui/Skeleton";

const MovieCardSkeleton = () => {
  return (
    <article className="w-full">
      <div className="relative block">
        <Skeleton className="aspect-2/3 w-full rounded-2xl" />
      </div>
    </article>
  );
};

export default MovieCardSkeleton;
