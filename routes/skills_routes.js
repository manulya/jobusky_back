const Router = require('express')
const router = new Router()
const SkillsController = require('../controllers/skills_controller')

router.post('/', SkillsController.create)
router.get('/', SkillsController.get)

module.exports = router