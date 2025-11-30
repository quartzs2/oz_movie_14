import { GuestOnlyRoute, MainLayout, PrivateRoute } from "@components";
import { ROUTE_PATHS } from "@constants";
import { AuthProvider, ThemeProvider } from "@contexts";
import { Detail, Home, Login, MyPage, NotFound, Search, SignUp } from "@pages";
import { Route, Routes } from "react-router";

function App() {
  const GUEST_ONLY_ROUTES = [
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

  const PRIVATE_ROUTES = [
    {
      element: <MyPage />,
      path: ROUTE_PATHS.MYPAGE,
    },
  ];

  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          <Route element={<MainLayout />}>
            {GUEST_ONLY_ROUTES.map((route) => (
              <Route
                element={<GuestOnlyRoute>{route.element}</GuestOnlyRoute>}
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
            {PRIVATE_ROUTES.map((route) => (
              <Route
                element={<PrivateRoute>{route.element}</PrivateRoute>}
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
