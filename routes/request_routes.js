const Router = require('express')
const router = new Router()
const RequestController = require("../controllers/request_controller")
const checkRole=require("../middleware/checkRoleMiddleware")

router.post('/', checkRole('USER'),RequestController.create)
router.get('/:userId',RequestController.getAllRequests)
router.delete('/:id',RequestController.delete)


module.exports = router