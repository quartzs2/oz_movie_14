import { cn } from "@utils";
import { useEffect, useState } from "react";

const Image = ({
  alt,
  className,
  loading = "lazy",
  onError,
  src,
  ...props
}) => {
  const [isError, setIsError] = useState(false);
  const imageSrc =
    isError || !src ? "https://placehold.co/400x400?text=No+Image" : src;

  useEffect(() => {
    setIsError(false);
  }, [src]);

  const handleError = (e) => {
    if (isError) {
      return;
    }

    setIsError(true);

    if (onError) {
      onError(e);
    }
  };

  return (
    <img
      alt={alt}
      className={cn(className)}
      loading={loading}
      onError={handleError}
      src={imageSrc}
      {...props}
    />
  );
};

export default Image;
