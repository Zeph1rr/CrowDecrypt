const Router = require('express')
const router = new Router()
const authRouter = require('./auth.router')
const tasksRouter = require('./tasks.router')


router.use('/users', authRouter)
router.use('/tasks', tasksRouter)

module.exports = router