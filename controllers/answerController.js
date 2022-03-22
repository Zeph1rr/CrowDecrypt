const ApiError = require('../error/ApiError')
const {Answers, Users} = require('../models/models')
const logging = require("../src/logger");

class AnswerController {
    async getAll(req, res) {
        const lines = await Answers.findAll({order: ['id']})
        const data = {
            method: req.method,
            url: req.originalUrl,
            user: req.user.id
        }
        logging({data})
        res.json({lines})
    }

    async getAllByTask(req, res) {
        const taskId = req.params.id
        const lines = await Answers.findAll({where: {taskId}, order: ['id']})
        const data = {
            method: req.method,
            url: req.originalUrl,
            user: req.user.id,
            task: taskId
        }
        logging({data})
        res.json({lines})
    }

    async getOne(req, res, next) {
        const {id} = req.params
        const answer = await Answers.findOne({where: {id}, attributes: ['id', 'answer', 'createdAt', 'userId']})
        if (!answer) {
            return next(ApiError.badRequest("Такого ответа не существует"))
        }
        const userName = await Users.findOne({where: {id: answer.userId}, attributes: ['name']})
        const result = {text: answer.answer, createdAt: answer.createdAt, userName: userName.name}
        const data = {
            method: req.method,
            url: req.originalUrl,
            user: req.user.id,
            answer: answer.id,
        }
        logging({data})
        res.json(result)
    }

    async add(req, res, next) {
        try {
            const {text, taskId} = req.body
            const user = await Users.findOne({where: {id: req.user.id}})
            user.answersCount += 1
            user.save()
            const answer = await Answers.create({answer: text, taskId, userId: user.id})
            const data = {
                method: req.method,
                url: req.originalUrl,
                user: req.user.id,
                answer: answer.id,
            }
            logging({data})
            res.json({answer})
        } catch (e) {
            logging({error: e})
            return next(ApiError.internal("Неизвестная ошибка"))
        }
    }

    async delete(req, res, next) {
        const {id} = req.params
        const answer = await Answers.findOne({where: {id}})
        if (answer.userId !== Number(req.user.id) && req.user.role !== 1) {
            return next(ApiError.badRequest("Недостаточно прав"))
        }
        const deleted = await Answers.destroy({where: {id}})
        const data = {
            method: req.method,
            url: req.originalUrl,
            user: req.user.id,
            targer: answer.id,
        }
        logging({data})
        res.json({deleted})
    }
}

module.exports = new AnswerController()