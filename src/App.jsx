import MainLayout from "@components/layout/MainLayout";
import { ROUTE_PATHS } from "@constants/urls";
import { Home, NotFound } from "@pages";
import { Route, Routes } from "react-router";

function App() {
  const ROUTES = [
    {
      element: <Home />,
      path: ROUTE_PATHS.HOME,
    },
    {
      element: <NotFound />,
      path: ROUTE_PATHS.NOT_FOUND,
    },
  ];

  return (
    <Routes>
      <Route element={<MainLayout />}>
        {ROUTES.map((route) => (
          <Route element={route.element} key={route.path} path={route.path} />
        ))}
      </Route>
    </Routes>
  );
}

export default App;
