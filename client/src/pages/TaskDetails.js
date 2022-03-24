import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {getTask, sendAnswer} from "../http/userAPI";

const TaskDetails = () => {
    const {id} = useParams()

    const [task, setTask] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [answer, setAnswer] = useState('')
    const [owner, setOwner] = useState('')
    const [answersCount, setAnswersCount] = useState(0)
    const imageLink = `/images/${task.image}`

    const fetchData = async () => {
        try {
            const {taskInfo, username, count} = await getTask(id)
            setTask(taskInfo)
            setOwner(username)
            setAnswersCount(count)
            setIsLoading(false)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const send = async (e) => {
        setIsLoading(true)
        const response = await sendAnswer(answer, task.id)
        await fetchData()
        setIsLoading(false)
        console.log(response)
    }

    const taskDetailsComponent = () => {
        return (
            <div className="container justify-content-around align-content-center">
                <h1 className="text text-center">Задание №{id}</h1>
                <div className="row align-content-center justify-content-around">
                    <img className="w-25" src={imageLink} alt="Изображение"/>
                    <div className="w-25 d-flex justify-content-center align-content-center flex-column">
                        <p className="text task_info">Автор: {owner}</p>
                        <p className="text task_info">Ответов: {answersCount}</p>
                        <a href={imageLink} className="nav-link text task_info">Открыть картинку на весь экран</a>
                        <button onClick={async (e) => {await send(e)}} className="btn btn-primary text">Отправить ответ на задание</button>
                    </div>
                    <textarea className="w-25" value={answer} onChange={e => setAnswer(e.target.value)} />
                </div>
            </div>
        )
    }

    return (
        !isLoading && taskDetailsComponent()
    );
};

export default TaskDetails;