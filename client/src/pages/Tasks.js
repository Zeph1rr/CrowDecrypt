import React, {useEffect, useState} from 'react';
import {getTasks} from "../http/userAPI";
import Task from "../components/Task";

const Tasks = () => {
    const [tasks, setTasks] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const tasksComponent = () => {
        return (
            <div className="card card_list">
                <ul className="list-group list-group-flush">
                    {tasks.reverse().map(task => <Task key={task.id} Task={task} />)}
                </ul>
            </div>
        )
    }
    useEffect(() => {
        async function fetchData() {
            try {
                setTasks(await getTasks())
                setIsLoading(false)
            } catch (e) {
                console.log(e)
            }
        }
        fetchData()
    }, [])
    return (
        <div className="container">
            {!isLoading && tasks.length > 0 && tasksComponent()}
            {!isLoading && !tasks.length && <h1 className="text text-center">Нет заданий</h1> }
            {isLoading && <h1 className="text">Загрузка...</h1>}
        </div>
    )
};

export default Tasks;
