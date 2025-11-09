const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 dark:bg-gray-950">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100">
          404
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          페이지를 찾을 수 없습니다.
        </p>
      </div>
    </div>
  );
};
export default NotFound;
