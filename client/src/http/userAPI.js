import {$authHost, $host} from "./index";
import jwtDecode from "jwt-decode";

export const login = async (email, password) => {
    const {data} = await $host.post('/api/users/login', {email, password})
    localStorage.setItem('Token', data.token)
    return jwtDecode(data.token)
}

export const registration = async (email, password, name) => {
    return await $host.post('/api/users/registration', {email, password, name})
}

export const getTasks = async () => {
    const {data} = await $authHost.get('/api/tasks')
    return data.lines
}

export const getUsername = async (id) => {
    const {data} = await $authHost.get(`/api/users/username/${id}`)
    return data.name
}

export const getTask = async (id) => {
    const task = await $authHost.get(`/api/tasks/${id}`)
    const username = await getUsername(task.data.task.userId)
    const answersCount = await $authHost.get(`/api/answers/count/${id}`)
    return {
        taskInfo: task.data.task,
        username,
        count: answersCount.data.count
    }
}

export const sendAnswer = async (text, taskId) => {
    const response = await $authHost.post('/api/answers/', {text, taskId})
    return response
}
