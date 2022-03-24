const ApiError = require('../error/ApiError')
const {Tasks} = require('../models/models')
const {v4: uuidv4} = require('uuid');
const fs = require('fs');
const path = require('path');

class TaskController {
    async getAll(req, res) {
        const lines = await Tasks.findAll({order: ['id']})
        res.json({lines})
    }

    async getAllByOwner(req, res) {
        const {id} = req.params
        const lines = await Tasks.findAll({where: {userId: id}, order: ['id']})
        res.json({lines})
    }

    async getOne(req, res) {
        const {id} = req.params
        const task = await Tasks.findOne({where: {id}})
        res.json({task})
    }

    async addTask(req, res, next) {
        try {
            const filename = `${uuidv4()}.${req.file.originalname.split('.')[1]}`
            fs.rename(req.file.path, path.join('uploads', filename), async function (err) {
                if (err) throw err;
                const task = await Tasks.create({userId: Number(req.user.id), image: filename})
                return res.json({task})
            })
        } catch (e) {
            return next(ApiError.internal("Неизвестная ошибка"))
        }
    }

    async delete(req, res, next) {
        const {id} = req.params
        const task = await Tasks.findOne({where: {id}})
        if (!task) {
            return next(ApiError.badRequest("Такого таска не существует"))
        }
        if (task.userId !== Number(req.user.id) && req.user.role !== 1) {
            return next(ApiError.badRequest("Недостаточно прав"))
        }
        fs.rm(path.join('uploads', task.image), async function (err) {
            if (err) throw err;
            const deleted = await Tasks.destroy({where: {id}})
            res.json({deleted})
        })
    }
}

module.exports = new TaskController()
