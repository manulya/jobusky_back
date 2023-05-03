const Router = require('express')
const router = new Router()
const JobController = require('../controllers/job_controller')
const checkRole=require("../middleware/checkRoleMiddleware")

router.post('/', checkRole('ADMIN'),JobController.create)
router.get('/',JobController.getAllJobs)
router.get('/:id',JobController.getOneJob)
router.delete('/:id',JobController.delete)


module.exports = router