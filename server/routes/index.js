const Router = require('express')
const router = new Router()
const authRouter = require('./auth.router')
const tasksRouter = require('./tasks.router')
const answerRouter = require('./answers.router')


router.use('/users', authRouter)
router.use('/tasks', tasksRouter)
router.use('/answers', answerRouter)

module.exports = router
