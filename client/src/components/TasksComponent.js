import React, {useState} from 'react';
import Task from "./Task";
import {addTask} from "../http/userAPI";
import Swal from "sweetalert2";

const TasksComponent = ({tasks, needAddTasks, setNeedLoading}) => {
    const [file, setFile] = useState(null)
    const [isFile, setIsFile] = useState(false)

    const fileHandler = (event) => {
        setFile([...event.target.files][0])
        setIsFile(true)
    }

    const fileUploadHandler = async () => {
        const response = await addTask(file)
        setFile(null)
        setIsFile(false)
        if (response.status === 200) {
            await Swal.fire('Успех!', 'Задание успешно дабавлено!', "success");
            setNeedLoading(true)
        } else {
            await Swal.fire('Ошибка!', response.message, "error");
        }

    }

    const add = () => {
        return(
            <li className="list-group-item row justify-content-between d-flex">
                <div className="col-md-4">
                    <input multiple={false} onChange={(event) => fileHandler(event)} type="file" id="file" className="form-control"/>
                    <button onClick={() => fileUploadHandler()} className="btn btn-primary" disabled={!isFile}>Добавить задание</button>
                </div>
            </li>
        )
    }

    return (
        <div className="card card_list">
            <ul className="list-group list-group-flush">
                {needAddTasks && add()}
                {tasks.reverse().map(task => <Task key={task.id} Task={task} />)}
                {!tasks.length && <h2 className="text text-center">Нет заданий</h2>}
            </ul>
        </div>
    );
};

export default TasksComponent;
