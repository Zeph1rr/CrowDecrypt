import jwtDecode from "jwt-decode";

let defaultState = {}

if (localStorage.hasOwnProperty('Token')){
    const token = localStorage.getItem('Token')
    const userData = jwtDecode(token)
    defaultState = {
        user: userData,
        isAuth: true
    }
} else {
    defaultState = {
        user: null,
        isAuth: false
    }
}

export const RootReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "LOGIN":
            return {...state, isAuth: true, user: action.payload}
        case "LOGOUT":
            return {...state, isAuth: false, user: null}
        default:
            return state
    }
}
