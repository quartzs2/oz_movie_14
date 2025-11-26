import { ErrorMessage, Header, LoadingSpinner } from "@components";
import { ErrorBoundary, Suspense } from "@suspensive/react";
import { Outlet } from "react-router";

function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-950">
      <Header />
      <main className="flex-1">
        <ErrorBoundary
          fallback={({ error, reset }) => (
            <ErrorMessage error={error} reset={reset} />
          )}
        >
          <Suspense fallback={<LoadingSpinner />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>
    </div>
  );
}

export default MainLayout;
