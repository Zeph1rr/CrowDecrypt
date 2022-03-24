import axios from "axios";

const $host = axios.create({
    baseURL: process.env.APP_URL
})

const $authHost = axios.create({
    baseURL: process.env.APP_URL
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('Token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}