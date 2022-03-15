const Router = require('express')
const router = new Router()
const controller = require('../controllers/taskController')
const authMiddleware = require('../middleware/auth.middleware')
const multer = require('multer')
const upload = multer({dest: 'uploads/'})

router.get('/', controller.getAll)
router.get('/:id', controller.getOne)
router.get('/byowner/:owner', controller.getAllByOwner)
router.post('/', upload.single('picture'), authMiddleware, controller.addTask)
router.delete('/:id', authMiddleware, controller.delete)

module.exports = router