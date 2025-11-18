import { MainLayout, PublicRoute } from "@components";
import { ROUTE_PATHS } from "@constants";
import { AuthProvider, ThemeProvider } from "@contexts";
import { Detail, Home, Login, NotFound, Search, SignUp } from "@pages";
import { Route, Routes } from "react-router";

function App() {
  const AUTH_ROUTES = [
    {
      element: <Login />,
      path: ROUTE_PATHS.LOGIN,
    },
    {
      element: <SignUp />,
      path: ROUTE_PATHS.SIGNUP,
    },
  ];

  const PUBLIC_ROUTES = [
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
      <AuthProvider>
        <Routes>
          <Route element={<MainLayout />}>
            {AUTH_ROUTES.map((route) => (
              <Route
                element={<PublicRoute>{route.element}</PublicRoute>}
                key={route.path}
                path={route.path}
              />
            ))}
            {PUBLIC_ROUTES.map((route) => (
              <Route
                element={route.element}
                key={route.path}
                path={route.path}
              />
            ))}
          </Route>
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
