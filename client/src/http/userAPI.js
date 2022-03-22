import {$authHost, $host} from "./index";
import jwtDecode from "jwt-decode";

export const login = async (email, password) => {
    const {data} = await $host.post('/api/users/login', {email, password})
    localStorage.setItem('Token', data.token)
    return jwtDecode(data.token)
}

export const check = async () => {
    const response = await $authHost.get('/api/users')
    return response
}