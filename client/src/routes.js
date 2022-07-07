import Login from "../../../CrowDecrypt/client/src/pages/Login";
import {LOGIN_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE, TASK_ROUTE, TASKS_ROUTE} from "../../../CrowDecrypt/client/src/utils/constants";
import Registration from "../../../CrowDecrypt/client/src/pages/Registration";
import Tasks from "../../../CrowDecrypt/client/src/pages/Tasks";
import TaskDetails from "../../../CrowDecrypt/client/src/pages/TaskDetails";
import Profile from "../../../CrowDecrypt/client/src/pages/Profile";



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
