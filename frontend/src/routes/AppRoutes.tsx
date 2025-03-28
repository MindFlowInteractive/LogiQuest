import { createBrowserRouter, Outlet } from "react-router-dom";
import Layout from "../layout/Layout";
import NotFound from "../pages/NotFound";
import UnauthorizedResource from "../pages/UnauthorizedResource";
import Home from "../pages/Home";
import GameModesPage from "../pages/GameModesPage";
import Login from "../pages/Login";

const router = createBrowserRouter([
  {
    path: "/*",
    element: <NotFound />,
  },
  {
    path: "/unauthorized",
    element: <UnauthorizedResource />,
  },
  {
    path: "/sign-in",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "game-modes",
        element: <GameModesPage />,
      },
    ],
  },
]);

export default router;
