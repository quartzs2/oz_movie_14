import { ROUTE_PATHS } from "@constants";
import { useAuth } from "@hooks";
import { Link } from "react-router";
import { ClipLoader } from "react-spinners";

function PrivateRoute({ children }) {
  const { isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <ClipLoader color="#3b82f6" size={50} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4">
        <div className="rounded-lg bg-white p-8 text-center shadow-lg dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
            로그인이 필요합니다
          </h2>
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            이 페이지를 이용하시려면 로그인이 필요합니다.
          </p>
          <Link
            className="inline-block cursor-pointer rounded-lg bg-gray-950 px-4 py-2 text-white transition-colors hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
            to={ROUTE_PATHS.LOGIN}
          >
            로그인 하러 가기
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export default PrivateRoute;
