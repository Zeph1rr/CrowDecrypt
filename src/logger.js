const fs = require("fs")
const format = require("node.date-time");

function logging (data) {
    const logData = {
        timestamp: new Date().format("y-M-d HH:mm:SS.ms"),
        ...data
    }
    console.log(logData)
    fs.appendFile('log.txt', JSON.stringify(logData) + '\n', err => {
        if (err) throw err
    })
}

module.exports = logging