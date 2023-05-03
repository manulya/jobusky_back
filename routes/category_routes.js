const Router = require('express')
const router = new Router()
const CategoryController = require('../controllers/category_controller')

router.post('/', CategoryController.create)
router.get('/', CategoryController.getAll)
router.get('/:id', CategoryController.getOne)
router.delete('/:id', CategoryController.delete)

module.exports = router