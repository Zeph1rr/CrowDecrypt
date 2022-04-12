const path = require("path");
const loggingMiddleware = require('logging-middleware-express')


const logPath = (process.platform == "win32") ? path.join(__dirname,  "logs") : "/var/log/crowdecrypt"
const needConsoleLog = true
const debugLevel = "full"

module.exports = loggingMiddleware(logPath, debugLevel, needConsoleLog)
