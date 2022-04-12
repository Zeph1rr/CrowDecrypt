const Router = require('express')
const router = new Router()
const controller = require('../controllers/authController')
const {check} = require("express-validator");
const authMiddleware = require('../middleware/auth.middleware')
const loggingMiddleware = require('../middleware/logging.middleware')

router.post('/registration', [
    check('email', 'email не задан').notEmpty(),
    check('email', 'некорректный email').isEmail(),
    check('name', 'имя не задано').notEmpty(),
    check('password', 'Пароль должен содержать минимум 6 символов').isLength({min: 6})
], loggingMiddleware, controller.registration)
router.post('/login', loggingMiddleware, controller.login)
router.get('/:id', loggingMiddleware, authMiddleware, controller.getOne)
router.get('/username/:id', loggingMiddleware, authMiddleware, controller.getUsernameById)
router.get('/', loggingMiddleware, authMiddleware, controller.getAll)
router.delete('/:id', loggingMiddleware, authMiddleware, controller.delete)
router.put('/:id', loggingMiddleware, authMiddleware, controller.update)

module.exports = router
