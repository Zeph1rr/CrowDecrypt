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
    const today = new Date().format("yyyy-MM-dd HH:mm:SS.ms")
    const data = {
        timestamp: today,
        from: req.ip,
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
