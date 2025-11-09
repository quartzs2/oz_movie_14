import { cn } from "@utils/cn";

const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gray-300/20 dark:bg-gray-700/30",
        className,
      )}
      {...props}
    />
  );
};

export default Skeleton;
