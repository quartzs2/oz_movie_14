const ErrorMessage = ({ error, message }) => {
  const displayMessage =
    message || error?.message || "알 수 없는 오류가 발생했습니다.";

  return (
    <div className="flex h-[80vh] flex-1 items-center justify-center bg-neutral-50 p-8">
      <div className="flex h-full max-h-[200px] w-full max-w-[300px] flex-col items-center justify-center rounded-lg border border-red-200 bg-red-50 px-6 py-4 text-center shadow-sm">
        <p className="text-sm font-semibold text-red-800">오류 발생</p>
        <p className="mt-1 text-sm text-red-600">{displayMessage}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;
