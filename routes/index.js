const Router = require('express')
const router = new Router()
const authRouter = require('./auth.router')
const tasksRouter = require('./tasks.router')
const answerRouter = require('./answers.router')
const express = require("express");


router.use('/users', authRouter)
router.use('/tasks', tasksRouter)
router.use('/answers', answerRouter)
router.use('/images', express.static('uploads'))

module.exports = router