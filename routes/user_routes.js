const Router = require('express')
const router = new Router()
const UserController = require('../controllers/user_controller')
const authMiddleware = require('../middleware/authMiddleware.js')

router.post('/registration',UserController.registration)
router.post('/login', UserController.login)
router.get('/auth',authMiddleware,UserController.check)

module.exports = router