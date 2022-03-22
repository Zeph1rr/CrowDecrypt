import Login from "./pages/Login";
import Main from "./pages/Main";
import {LOGIN_ROUTE, MAIN_ROUTE} from "./utils/constants";


export const authRoutes = [
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: <Login/>,
    },
    {
        path: MAIN_ROUTE,
        Component: <Main/>
    }
]