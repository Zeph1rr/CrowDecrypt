const Router = require('express')
const router = new Router()
const controller = require('../controllers/answerController')
const authMiddleware = require('../middleware/auth.middleware')

router.get('/bytask/:id', authMiddleware, controller.getAllByTask)
router.get('/', authMiddleware, controller.getAll)
router.get('/:id', authMiddleware, controller.getOne)
router.post('/', authMiddleware, controller.add)
router.delete('/:id', authMiddleware, controller.delete)

module.exports = router