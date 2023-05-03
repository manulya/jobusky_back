const Router = require('express')
const router = new Router()
const CompanyController = require('../controllers/company_controller')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/', checkRoleMiddleware('ADMIN'), CompanyController.create)
router.get('/',CompanyController.getAll)
router.get('/:id',CompanyController.getOne)
router.put('/',CompanyController.update)
router.delete('/:id', CompanyController.delete)

module.exports = router