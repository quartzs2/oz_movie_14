import { Header } from "@components";
import { Outlet } from "react-router";

function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-950">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
