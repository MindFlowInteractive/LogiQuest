// routes/AppRoutes.jsx  
import { createBrowserRouter, Outlet } from "react-router-dom"
import Layout from "../layout/Layout"
// import ProtectedRoutes from "./ProtectedRoutes"
// import Account from "../pages/Account"
import NotFound from "../pages/NotFound"
import UnauthorizedResource from "../pages/UnauthorizedResource"
import SignIn from "../pages/SignIn";
import Home from '../pages/Home'
import GameModes from "../pages/GameModes";
import GameActivity from "../pages/GameActivity"
import Dashboard from "../pages/Dashboard"

const router = createBrowserRouter([
    {
        path: '/*',
        element: <NotFound />
    },
    {
        path: '/unauthorized',
        element: <UnauthorizedResource />
    },
    {
        path: "/sign-in",
        element: <SignIn />,
    },
    {
        path: "/",
        element: <Home />,
    },
    {
        path: '/app',
        element: <Layout><Outlet /></Layout>,
        children: [
            {
                index: true,
                element: <Home />   //default mode
            },
            {
                path: "get-started",
                element: <GameModes />,
            },
            {
                path: "game-activity",
                element: <GameActivity />,
            },
            // FOR TESTING PURPOSES ONLY, THESE ARE PRIVATES/PROTECTED ROUTES
            {
                path: 'dashboard',
                element: <Dashboard />
            },
            // FOR TESTING PURPOSES ONLY, THESE ARE PRIVATES/PROTECTED ROUTES

            // {
            //     element: <PrivateRoutes />,
            //     children: [
            //         {
            //             path: 'account',
            //             element: <Account />
            //         },
            //         {
            //             element: <ProtectedRoutes requiredRole={''} />,
            //             children: [
            //                 // {
            //                 //     path: 'home',
            //                 //     element: <Home />
            //                 // }
            //             ]
            //         }
            //     ]
            // },
        ]
    },

])

export default router;