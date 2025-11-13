import { ROUTE_PATHS } from "@constants/urls";
import { useAuth } from "@hooks";
import { Navigate } from "react-router";
import { ClipLoader } from "react-spinners";

export function PublicRoute({ children }) {
  const { isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <ClipLoader color="#3b82f6" size={50} />
      </div>
    );
  }

  if (user) {
    return <Navigate replace to={ROUTE_PATHS.HOME} />;
  }

  return <>{children}</>;
}
