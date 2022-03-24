import React, {useState} from 'react';
import {LOGIN_ROUTE} from "../utils/constants";
import {useNavigate} from "react-router-dom";
import {registration} from "../http/userAPI";
import {ErrorHandler} from "../utils/errorHandler";

const Login = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [error, setError] = useState(null)

    const signIn = async (e) => {
        e.preventDefault()
        try{
            await registration(email.toLowerCase(), password, name)
            navigate(LOGIN_ROUTE)
        } catch (err) {
            setError(ErrorHandler(err))
        }
    }

    return (
        <main className="container-xxl form-signing my-5 col-xxl-4 col-md-6 col-sm-8 login_text">
            <form>
                <h1 className="h3 mb-3 text-center text">Регистрация</h1>
                {error && <div className="alert alert-danger text" role="alert">
                    {error}
                </div>}
                <div className="form-floating my-1">
                    <input type="email" className="form-control text" id="email"
                           value={email} onChange={e => setEmail(e.target.value)} required
                    />
                    <label htmlFor="email" className="text">E-mail</label>
                </div>
                <div className="form-floating my-1">
                    <input type="text" className="form-control text" id="name"
                           value={name} onChange={e => setName(e.target.value)} required
                    />
                    <label htmlFor="name" className="text">Имя пользователя</label>
                </div>
                <div className="form-floating my-1">
                    <input type="password" className="form-control text" id="password"
                           value={password} onChange={e => setPassword(e.target.value)}
                           autoComplete="on" required
                    />
                    <label htmlFor="password" className="text">Пароль</label>
                </div>
                <div className="checkbox my-4 mb-3 text-center"/>
                <button onClick={signIn} className="w-100 btn btn-primary text" type="submit">Зарегестрироваться</button>
            </form>
        </main>
    );
};

export default Login;