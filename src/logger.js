const fs = require("fs")
const format = require("node.date-time");
const path = require('path');

let logPath = ''

if (process.platform === "win32") {
    logPath = path.join(__dirname,  "logs")
} else {
    logPath = "/var/log/crowdecrypt"
}

function logging (data) {
    const logData = {
        timestamp: new Date().format("y-M-d HH:mm:SS.ms"),
        ...data
    }
    console.log(logData)
    fs.appendFile(path.join(logPath, `log-${new Date().format("y-M-d")}.txt`), JSON.stringify(logData) + '\n', err => {
        if (err) throw err
    })
}

module.exports = logging