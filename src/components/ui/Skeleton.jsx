import { cn } from "@utils/cn";

const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gray-300/20",
        className
      )}
      {...props}
    />
  );
};

export default Skeleton;
