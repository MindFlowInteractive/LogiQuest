// routes/AppRoutes.jsx  
import { createBrowserRouter, Outlet } from "react-router-dom"
import Layout from "../layout/Layout"
// import PrivateRoutes from './PrivateRoutes'
// import ProtectedRoutes from "./ProtectedRoutes"
import NotFound from "../pages/NotFound"
import UnauthorizedResource from "../pages/UnauthorizedResource"
import Home from '../pages/Home'
import Login from "../pages/Login"
// import Account from "../pages/Account"

const router = createBrowserRouter([
    // /post/new -> add new post (protected, admin layout)
    {
        path: '/*',
        element: <NotFound />
    },
    {
        path: '/unauthorized',
        element: <UnauthorizedResource />
    },
    {
        path: '/sign-in',
        element: <Login />
    },
    {
        path: '/',
        element: <Layout><Outlet /></Layout>,
        children: [
            {
                index: true,
                element: <Home />
            },
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
]);

export default router;