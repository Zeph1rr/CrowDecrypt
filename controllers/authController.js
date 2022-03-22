const ApiError = require('../error/ApiError')
const {Users} = require('../models/models')
const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const logging = require("../src/logger")

const generateJWT = (payload) => {
    return jwt.sign(payload,
        process.env.JWT_SECRET,
        {expiresIn: '24h'}
    )
}

class AuthController {
    async getAll(req, res, next) {
        if (req.user.role !== 1) {
            return next(ApiError.badRequest("Недостаточно прав"))
        }
        const lines = await Users.findAll({order: ['id']})
        res.json({lines})
    }

    async getOne(req, res, next) {
        const {id} = req.params
        const user = await Users.findOne({where: {id}})
        if (!user) {
            return next(ApiError.badRequest("Такого пользователя не существует"))
        }
        return res.json({user})
    }

    async registration(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest(errors))
            }
            const {email, password, name} = req.body
            const candidate = await Users.findOne({where: {email}})
            if (candidate) {
                return next(ApiError.badRequest('Такой пользователь уже существует'))
            }
            const hashedPassword = bcrypt.hashSync(password, 8)
            const user = await Users.create({email, password: hashedPassword, name})
            const token = generateJWT({id: user.id, role: user.role})
            logging({message: `registred new user with email ${user.email}`})
            res.status(201).json(token)
        } catch (e) {
           return next(ApiError.internal("Неизвестная ошибка"))
        }
    }

    async login(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest("Неккоректное имя пользователя или пароль"))
            }
            const {email, password} = req.body
            const candidate = await Users.findOne({where: {email}})
            if (!candidate) {
                return next(ApiError.badRequest("Неккоректное имя пользователя или пароль"))
            }
            const isPair = bcrypt.compareSync(password, candidate.password)
            if (!isPair) {
                return next(ApiError.badRequest("Неккоректное имя пользователя или пароль"))
            }
            const token = generateJWT({id: candidate.id, role: candidate.role})
            res.json({token})
        } catch (e) {
            console.log(e)
            return next(ApiError.internal("Неизвестная ошибка, попробуйте снова"))
        }
    }

    async delete(req, res, next) {
        const {id} = req.params
        if (req.user.role !== 1 && req.user.id !== Number(id)) {
            return next(ApiError.badRequest("Недостаточно прав"))
        }
        const user = await Users.findOne({where: {id}})
        if (!user) {
            return next(ApiError.badRequest("Такого пользователя не существует"))
        }
        const deleted = await Users.destroy({where: {id}})
        logging({message: `deleted user with email ${user.email}`})
        res.json({deleted})
    }

    async update(req, res, next) {
        try {
            const {id} = req.params
            if (Number(id) !== req.user.id && req.user.role !== 1) {
                return next(ApiError.badRequest("Недостаточно прав"))
            }
            const data = req.body
            if ("password" in data) {
                const user = await Users.findByPk(id)
                if (await bcrypt.compareSync(data.password, user.password)) {
                    return res.status(400).json({message: "Невозможно сменить пароль на текущий"})
                }
                data.password = await bcrypt.hashSync(data.password, 8)
            }
            const updated = await Users.update({...data}, {where: {id}})
            if (updated) {
                res.json({message: "Данные успешно обновлены"})
            } else {
                next(ApiError.internal("Неизвестная ошибка"))
            }
        } catch (e) {
            next(ApiError.internal("Неизвестная ошибка"))
        }
    }
}

module.exports = new AuthController()