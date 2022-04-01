import React, {useState} from 'react';
import {MAIN_ROUTE, REGISTRATION_ROUTE} from "../utils/constants";
import {login} from "../http/userAPI";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {ErrorHandler} from "../utils/errorHandler";

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    const signIn = async (e) => {
        e.preventDefault()
        try{
            const data = await login(email.toLowerCase(), password)
            dispatch({type: "LOGIN", payload: data})
            navigate(MAIN_ROUTE)
        } catch (err) {
            setError(ErrorHandler(err))
        }
    }

    return (
        <main className="container-xxl form-signing my-5 col-xxl-4 col-md-6 col-sm-8 login_text">
            <form>
                <h1 className="h3 mb-3 text-center text">Авторизация</h1>
                {error && <div className="alert alert-danger text" role="alert">
                    {error}
                </div>}
                <div className="form-floating my-1">
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                        <label htmlFor="email" className="text">E-mail</label>
                </div>
                <div className="form-floating my-1">
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        autoComplete="on"
                        required
                    />
                        <label htmlFor="password" className="text">Пароль</label>
                </div>
                <div className="checkbox my-4 mb-3 text-center"/>
                <button onClick={signIn} className="w-100 btn btn-primary text" type="submit">Войти</button>
                <button onClick={e => {e.preventDefault(); document.location=REGISTRATION_ROUTE}} className="w-100 btn btn-primary my-1 text"
                        type="button">Зарегестрироваться
                </button>
            </form>
        </main>
    );
};

export default Login;
