const Router = require('express')
const router = new Router()
const SendController = require('../controllers/send_controller')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/', SendController.create)
router.get('/',SendController.getAll)
router.put('/',SendController.update)

module.exports = router