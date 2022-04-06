import React, {useEffect, useState} from 'react';
import {addTask, getTasks} from "../http/userAPI";
import Task from "../components/Task";

const Tasks = () => {
    const [tasks, setTasks] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [file, setFile] = useState(null)

    const fileUploadHandler = async (event) => {
        event.preventDefault()
        await addTask(file)
        await fetchData()
        setFile(null)
    }

    const tasksComponent = () => {
        return (
            <div className="card card_list">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item row justify-content-between d-flex">
                        <div className="col-md-4">
                            <input multiple={false} onChange={(event) => setFile([...event.target.files][0])} type="file" id="file" className="form-control"/>
                            <button onClick={event => fileUploadHandler(event)} className="btn btn-primary">Добавить задание</button>
                        </div>
                    </li>
                    {tasks.reverse().map(task => <Task key={task.id} Task={task} />)}
                </ul>
            </div>
        )
    }

    async function fetchData() {
        try {
            setIsLoading(true)
            setTasks(await getTasks())
            setIsLoading(false)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div className="container">
            {!isLoading }
            {!isLoading && tasks.length > 0 && tasksComponent()}
            {!isLoading && !tasks.length && <h1 className="text text-center">Нет заданий</h1> }
            {isLoading && <h1 className="text">Загрузка...</h1>}
        </div>
    )
};

export default Tasks;
