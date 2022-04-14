import React from 'react';

const UserInfo = (props) => {
    return (
        <li className="list-group-item row justify-content-between flex-nowrap">
            <h3 className="h3 text">{props.name}</h3>
            <p className="text">{props.value}</p>
        </li>
    );
};

export default UserInfo;
