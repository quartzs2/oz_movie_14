import MainLayout from "@components/layout/MainLayout";
import { ROUTE_PATHS } from "@constants/urls";
import { ThemeProvider } from "@contexts";
import { Detail, Home, NotFound, Search } from "@pages";
import { Route, Routes } from "react-router";

function App() {
  const ROUTES = [
    {
      element: <Home />,
      path: ROUTE_PATHS.HOME,
    },
    {
      element: <Detail />,
      path: ROUTE_PATHS.DETAIL,
    },
    {
      element: <Search />,
      path: ROUTE_PATHS.SEARCH,
    },
    {
      element: <NotFound />,
      path: ROUTE_PATHS.NOT_FOUND,
    },
  ];

  return (
    <ThemeProvider>
      <Routes>
        <Route element={<MainLayout />}>
          {ROUTES.map((route) => (
            <Route element={route.element} key={route.path} path={route.path} />
          ))}
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
