import Login from "./pages/Login";
import {LOGIN_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE, TASK_ROUTE, TASKS_ROUTE} from "./utils/constants";
import Registration from "./pages/Registration";
import Tasks from "./pages/Tasks";
import TaskDetails from "./pages/TaskDetails";
import Profile from "./pages/Profile";



export const authRoutes = [
    {
        path: TASKS_ROUTE,
        Component: <Tasks />
    },
    {
        path: TASK_ROUTE,
        Component: <TaskDetails />
    },
    {
        path: PROFILE_ROUTE,
        Component: <Profile />
    }
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: <Login/>
    },
    {
        path: REGISTRATION_ROUTE,
        Component: <Registration/>
    }
]

export const publicNavbar = [
    {
        link: REGISTRATION_ROUTE,
        name: 'Регистрация'
    },
    {
        link: LOGIN_ROUTE,
        name: 'Вход'
    }
]

export const authNavbar = [
    {
        link: TASKS_ROUTE,
        name: 'Задания'
    },
    {
        link: PROFILE_ROUTE,
        name: 'Личный кабинет'
    }
]
