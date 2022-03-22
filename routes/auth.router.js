const Router = require('express')
const router = new Router()
const controller = require('../controllers/authController')
const {check} = require("express-validator");
const authMiddleware = require('../middleware/auth.middleware')
const loggingMiddleware = require("../middleware/logging.middleware")

router.post('/registration', [
    check('email', 'email не задан').notEmpty(),
    check('email', 'некорректный email').isEmail(),
    check('name', 'имя не задано').notEmpty(),
    check('password', 'Пароль должен содержать минимум 6 символов').isLength({min: 6})
], loggingMiddleware, controller.registration)
router.post('/login', [
    check('email').notEmpty(),
    check('email', 'некорректный email').isEmail(),
    check('password').notEmpty()
], loggingMiddleware, controller.login)
router.get('/:id', authMiddleware, loggingMiddleware, controller.getOne)
router.get('/', authMiddleware, loggingMiddleware, controller.getAll)
router.delete('/:id', authMiddleware, loggingMiddleware, controller.delete)
router.put('/:id', authMiddleware, loggingMiddleware, controller.update)

module.exports = router