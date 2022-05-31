import React, {useEffect, useState} from 'react';
import {getTasks} from "../http/userAPI";
import TasksComponent from "../components/TasksComponent";

const Tasks = () => {
    const [tasks, setTasks] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            try {
                if (isLoading) {
                    setTasks(await getTasks())
                    setIsLoading(false)
                }
            } catch (e) {
                console.log(e)
            }
        }
        fetchData()
    }, [isLoading])
    return (
        <div className="container">
            {!isLoading }
            {!isLoading && <TasksComponent tasks={tasks} needAddTasks={true} setNeedLoading={setIsLoading}/>}
            {isLoading && <h1 className="text">Загрузка...</h1>}
        </div>
    )
};

export default Tasks;
