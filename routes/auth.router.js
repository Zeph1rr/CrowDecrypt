const Router = require('express')
const router = new Router()
const controller = require('../controllers/authController')
const {check} = require("express-validator");
const authMiddleware = require('../middleware/auth.middleware')

router.post('/registration', [
    check('email', 'Имя пользователя не задано').notEmpty(),
    check('password', 'Пароль должен содержать минимум 6 символов').isLength({min: 6})
], controller.registration)
router.post('/login', [
    check('email').notEmpty(),
    check('password').notEmpty()
], controller.login)
router.get('/', authMiddleware, controller.getAll)
router.delete('/:id', authMiddleware, controller.delete)
router.put('/:id', authMiddleware, controller.update)

module.exports = router