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

export const getTask = async (id) => {
    const task = await $authHost.get(`/api/tasks/${id}`)
    const answers = await $authHost.get(`/api/answers/bytask/${id}`)
    const answersCount = answers.data.lines.length
    return {
        taskInfo: task.data.task,
        answers: answers.data.lines,
        count: answersCount
    }
}

export const sendAnswer = async (text, taskId) => {
    const response = await $authHost.post('/api/answers/', {text, taskId})
    return response
}

export const addTask = async (file) => {
    const formData = new FormData()
    formData.append('picture', file)
    return await $authHost.post('/api/tasks/', formData)
}
