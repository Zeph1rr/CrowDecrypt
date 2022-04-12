const Router = require('express')
const router = new Router()
const controller = require('../controllers/taskController')
const authMiddleware = require('../middleware/auth.middleware')
const multer = require('multer')
const upload = multer({dest: 'uploads/'})
const loggingMiddleware = require('../middleware/logging.middleware')

router.get('/', authMiddleware, loggingMiddleware, controller.getAll)
router.get('/:id', authMiddleware, loggingMiddleware, controller.getOne)
router.get('/byowner/:id', authMiddleware, loggingMiddleware, controller.getAllByOwner)
router.post('/', upload.single('picture'), authMiddleware, loggingMiddleware, controller.addTask)
router.delete('/:id', authMiddleware, loggingMiddleware, controller.delete)

module.exports = router
