import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {changePassword, getTasksByOwner, getUser} from "../http/userAPI";
import UserInfo from "../components/UserInfo";
import TasksComponent from "../components/TasksComponent";
const Profile = () => {
    const {user} = useSelector(state => state)
    const [userInfo, setUserInfo] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [info, setInfo] = useState(null)
    const [newPassword, setNewPassword] = useState('')
    const [tasks, setTasks] = useState(null)
    const [mode, setMode] = useState(0)

    const changePass = async (event) => {
        event.preventDefault()
        try {
            const response = await changePassword(user.id, newPassword)
            alert(response.data.message)
        } catch (e) {
            alert(e.response.data.message)
        }
        setNewPassword('')
    }

    const generateUserInfo = (userData) => {
        return [
            {
                name: "Почта",
                value: userData.email
            },
            {
                name: "Роль",
                value: userData.role ? "Администратор" : "Пользователь"
            },
            {
                name: "Всего ответов",
                value: userData.answersCount
            }
        ]
    }

    useEffect( () => {
        async function fetchData(id) {
            setIsLoading(true)
            const data = await getUser(id)
            setUserInfo(data.data.user)
            setTasks(await getTasksByOwner(id))
            setIsLoading(false)
        }
        fetchData(user.id)
    }, [user, mode])


    if (userInfo && !info) {
        setInfo(generateUserInfo(userInfo))
    }

    if (isLoading) {
        return (
            <div className="container text-center">
                <h1 className="text text-center">Загрузка...</h1>
            </div>
        )
    }
    if (mode === 0) {
        return (
            <div className="container text-center">
                <button onClick={() => setMode(1)} className="btn btn-primary w-50 mb-5">Мои задания</button>
                <h1 className="text-center text mb-4">Профиль пользователя {userInfo.name}</h1>
                <div className="card card_list">
                    <ul className="list-group list-group-flush">
                        {info && info.map(item => <UserInfo key={item.name} name={item.name} value={item.value}/>)}
                    </ul>
                </div>
                <div>
                    <form className="row flex-nowrap justify-content-between align-items-center mb-5">
                        <input className="form-control w-50 h-25" type="password" value={newPassword}
                               onChange={e => setNewPassword(e.target.value)} autoComplete="off"/>
                        <button onClick={e => changePass(e)} className="btn btn-primary mx-5 w-50">Сменить пароль</button>
                    </form>
                </div>
            </div>
        );
    }
    return(
        <div className="container text-center">
            <button onClick={() => setMode(0)} className="btn btn-primary w-50 mb-5">Мой профиль</button>
            <h1 className="text-center text mb-4">Мои задания</h1>
            {<TasksComponent tasks={tasks} needAddTasks={false}/>}
        </div>
    )
};

export default Profile;
