import React, {useEffect, useState} from 'react';
import {getUsername} from "../http/userAPI";
import {Link} from "react-router-dom";
import { format } from "date-fns";

const Task = (props) => {
    const task = props.Task
    const link = '/task/' + task.id
    const date = format(new Date(task.createdAt), "d.MM.yyyy H:mm")

    return (
        <li className="list-group-item row justify-content-between d-flex">
            <Link to={link} className="nav-link text"> {task.id}. Задание от {task.user.name}</Link>
            <p className="text">{date}</p>
        </li>
    );
};

export default Task;
