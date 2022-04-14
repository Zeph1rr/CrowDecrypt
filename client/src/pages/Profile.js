import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {changePassword, getUser} from "../http/userAPI";
import UserInfo from "../components/UserInfo";

const Profile = () => {
    const {user} = useSelector(state => state)
    const [userInfo, setUserInfo] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [info, setInfo] = useState(null)
    const [newPassword, setNewPassword] = useState('')

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
            setIsLoading(false)
        }
        fetchData(user.id)
    }, [user])


    if (userInfo && !info) {
        setInfo(generateUserInfo(userInfo))
    }

    if (isLoading) {
        return (
            <div className="container text-center">
                <h1 className="text text-center">Loading...</h1>
            </div>
        )
    }
    return (
        <div className="container text-center">
            <h1 className="text-center text mb-4">Профиль пользователя {userInfo.name}</h1>
            <div className="card card_list">
                <ul className="list-group list-group-flush">
                    {info && info.map(item => <UserInfo name={item.name} value={item.value}/>)}
                </ul>
            </div>
            <div className="row flex-nowrap justify-content-between align-content-center">
                <input className="form-control col-4" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                <button onClick={e => changePass(e)} className="btn btn-primary col-4">Сменить пароль</button>
            </div>
        </div>
    );
};

export default Profile;
