import React from 'react';

const Dashboard = ({answers}) => {
    let answersInfo = {}
    let sum = 0

    answers.forEach(item => {
        if (answersInfo.hasOwnProperty(item.answer)) {
            answersInfo[item.answer].count += 1
        } else {
            answersInfo[item.answer] = {count: 1}
        }
        sum += 1
    })

    Object.keys(answersInfo).forEach(item => {
        answersInfo[item].percent = Math.round(answersInfo[item].count * 100 / sum)
    })

    const answerComponent = (item) => {
        return(
            <li className="list-group-item row justify-content-between d-flex">
                <p className="text"><b>{item}</b>: <b>{answersInfo[item].count} ({answersInfo[item].percent}%)</b></p>
            </li>
        )
    }


    return (
        <div className="w-25">
            <h2 className="text text-center">Информация об ответах</h2>
            <div className="card card_list">
                <ul className="list-group list-group-flush">
                     {Object.keys(answersInfo).map(item => answerComponent(item))}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
