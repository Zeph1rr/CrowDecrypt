import React, {useState} from 'react';
import Task from "./Task";
import {addTask} from "../http/userAPI";

const TasksComponent = ({tasks, needAddTasks}) => {
    const [file, setFile] = useState(null)

    const fileUploadHandler = async () => {
        await addTask(file)
        setFile(null)
    }

    const add = () => {
        return(
            <li className="list-group-item row justify-content-between d-flex">
                <div className="col-md-4">
                    <input multiple={false} onChange={(event) => setFile([...event.target.files][0])} type="file" id="file" className="form-control"/>
                    <button onClick={() => fileUploadHandler()} className="btn btn-primary">Добавить задание</button>
                </div>
            </li>
        )
    }

    return (
        <div className="card card_list">
            <ul className="list-group list-group-flush">
                {needAddTasks && add()}
                {tasks.reverse().map(task => <Task key={task.id} Task={task} />)}
            </ul>
        </div>
    );
};

export default TasksComponent;
