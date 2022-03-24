import Login from "./pages/Login";
import {LK_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, TASK_ROUTE, TASKS_ROUTE} from "./utils/constants";
import Registration from "./pages/Registration";
import Tasks from "./pages/Tasks";
import TaskDetails from "./pages/TaskDetails";



export const authRoutes = [
    {
        path: TASKS_ROUTE,
        Component: <Tasks />
    },
    {
        path: TASK_ROUTE,
        Component: <TaskDetails />
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
        link: LK_ROUTE,
        name: 'Личный кабинет'
    }
]
