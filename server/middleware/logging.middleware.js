const fs = require("fs")
const format = require("node.date-time");
const path = require('path');

const loggingMiddleware = (req, res, next) => {
    let logPath = ''
    if (process.platform === "win32") {
        logPath = path.join(__dirname,  "logs")
    } else {
        logPath = "/var/log/crowdecrypt"
    }

    const remoteIP = req.ip.split(":").pop()
    console.log(typeof(remoteIP))

    const today = new Date().format("yyyy-MM-dd")
    const now = new Date().format("yyyy-MM-dd HH:mm:SS.ms")
    const data = {
        timestamp: now,
        remoteIP,
        method: req.method,
        url: req.originalUrl,
        user: req.user ? req.user.id : "Not authenticated",
        target: req.params.id ? req.params.id : "Not params"
    }
    console.log(data)
    fs.appendFile(path.join(logPath, `log-${today}.txt`), JSON.stringify(data) + '\n', err => {
        if (err) throw err
    })
    next()
}

module.exports = loggingMiddleware
