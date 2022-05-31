const ApiError = require('../error/ApiError')
const {Tasks, Users} = require('../models/models')
const {v4: uuidv4} = require('uuid');
const fs = require('fs');
const path = require('path');

class TaskController {
    async getAll(req, res) {
        const lines = await Tasks.findAll({
            order: ['id'],
            include: [{
                model: Users,
                attributes: ["name"]
            }],
            attributes: ["id", "createdAt"]
        })
        res.json({lines})
    }

    async getAllByOwner(req, res) {
        const {id} = req.params
        const lines = await Tasks.findAll({
            where: {userId: id},
            order: ['id'],
            include: [{
                model: Users,
                attributes: ["name"]
            }],
            attributes: ["id", "createdAt"]
        })
        res.json({lines})
    }

    async getOne(req, res) {
        const {id} = req.params
        const task = await Tasks.findOne({
            where: {id},
            include: [{
                model: Users,
                attributes: ["name"]
            }]
        })
        res.json({task})
    }

    async addTask(req, res, next) {
        try {
            if (!req.file) {
                return next(ApiError.badRequest('Файл должен быть указан'))
            }
            const filename = `${uuidv4()}.${req.file.originalname.split('.').pop()}`
            if (req.file.mimetype.indexOf('image') === -1) {
                return next(ApiError.badRequest('Файл должен быть картинкой!'))
            }
            fs.rename(req.file.path, path.join('uploads', filename), async function (err) {
                if (err) throw err;
                const task = await Tasks.create({userId: Number(req.user.id), image: filename})
                return res.json({task})
            })
        } catch (e) {
            return next(ApiError.internal("Неизвестная ошибка: " + e.message))
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
