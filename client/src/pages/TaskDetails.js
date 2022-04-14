import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {getTask, sendAnswer} from "../http/userAPI";
import {useSelector} from "react-redux";

const TaskDetails = () => {
    const {id} = useParams()

    const {user} = useSelector(state => state)
    const [task, setTask] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [answer, setAnswer] = useState('')
    const [answersCount, setAnswersCount] = useState(0)
    const [isAnswered, setIsAnswered] = useState(false)
    const imageLink = `/images/${task.image}` || '/images/null'

    const check_answers = (answers) => {
        answers.forEach(item => {
            if (item.userId === user.id) {
                setIsAnswered(true)
                setAnswer(item.answer)
            }
        })
    }

    const fetchData = async () => {
        try {
            const {taskInfo, count, answers} = await getTask(id)
            setTask(taskInfo)
            setAnswersCount(count)
            check_answers(answers)
            setIsLoading(false)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const send = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        sendAnswer(answer, task.id)
        await fetchData()
        setIsLoading(false)
    }

    const taskDetailsComponent = () => {
        return (
            <div className="container justify-content-around align-content-center">
                <h1 className="text text-center">Задание №{id}</h1>
                <div className="row align-content-center justify-content-around">
                    <img className="w-25" src={imageLink} alt="Изображение"/>
                    <div className="w-25 d-flex justify-content-center align-content-center flex-column">
                        <p className="text task_info">Автор: {task.user.name}</p>
                        <p className="text task_info">Ответов: {answersCount}</p>
                        <a href={imageLink} className="btn btn-primary text task_info">Открыть картинку на весь экран</a>
                        <button disabled={isAnswered} onClick={async (e) => {await send(e)}} className="btn btn-primary text">{isAnswered ? 'Вы уже ответили на это задание' : 'Отправить ответ на задание'}</button>
                    </div>
                    <textarea className="w-25" disabled={isAnswered} value={answer} onChange={e => setAnswer(e.target.value)} />
                </div>
            </div>
        )
    }

    return (
        !isLoading && taskDetailsComponent()
    );
};

export default TaskDetails;
