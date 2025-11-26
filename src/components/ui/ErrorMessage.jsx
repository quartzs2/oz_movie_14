const ErrorMessage = ({ error, message, reset }) => {
  const displayMessage =
    message || error?.message || "알 수 없는 오류가 발생했습니다.";

  return (
    <div className="flex h-[80vh] flex-1 items-center justify-center bg-neutral-50 p-8 dark:bg-gray-950">
      <div className="flex h-full max-h-[200px] w-full max-w-[300px] flex-col items-center justify-center rounded-lg border border-red-200 bg-red-50 px-6 py-4 text-center shadow-sm dark:border-red-800 dark:bg-red-950">
        <p className="text-sm font-semibold text-red-800 dark:text-red-300">
          오류 발생
        </p>
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
          {displayMessage}
        </p>
        {reset && (
          <button
            className="mt-4 cursor-pointer rounded bg-red-100 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800"
            onClick={reset}
          >
            다시 시도
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
