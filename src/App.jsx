import { Routes, Route } from "react-router";
import MainLayout from "./components/layout/MainLayout";
import { Home, NotFound } from "./pages";
import { ROUTE_PATHS } from "./constants/urls";

function App() {
  const ROUTES = [
    {
      path: ROUTE_PATHS.HOME,
      element: <Home />,
    },
    {
      path: ROUTE_PATHS.NOT_FOUND,
      element: <NotFound />,
    },
  ];

  return (
    <Routes>
      <Route element={<MainLayout />}>
        {ROUTES.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  );
}

export default App;
