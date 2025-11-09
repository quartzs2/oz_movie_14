import { ClipLoader } from "react-spinners";

const LoadingSpinner = ({
  color = "#3b82f6",
  fullscreen = true,
  size = 50,
}) => {
  if (fullscreen) {
    return (
      <div className="flex min-h-screen flex-1 items-center justify-center bg-neutral-50 dark:bg-gray-950">
        <ClipLoader color={color} loading={true} size={size} />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      <ClipLoader color={color} loading={true} size={size} />
    </div>
  );
};

export default LoadingSpinner;
