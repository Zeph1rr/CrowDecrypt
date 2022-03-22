const Router = require('express')
const router = new Router()
const controller = require('../controllers/answerController')
const authMiddleware = require('../middleware/auth.middleware')
const loggingMiddleware = require("../middleware/logging.middleware")

router.get('/bytask/:id', authMiddleware, loggingMiddleware, controller.getAllByTask)
router.get('/', authMiddleware, loggingMiddleware, controller.getAll)
router.get('/:id', authMiddleware, loggingMiddleware, controller.getOne)
router.post('/', authMiddleware, loggingMiddleware, controller.add)
router.delete('/:id', authMiddleware, loggingMiddleware, controller.delete)

module.exports = router