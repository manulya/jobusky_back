const Router = require('express')
const router = new Router()
const user_routes=require('./user_routes')
const category_routes=require('./category_routes')
const company_routes=require('./company_routes')
const job_routes=require('./job_routes')
const request_routes=require('./request_routes')

router.use('/user', user_routes)
router.use('/company', company_routes)
router.use('/job', job_routes)
router.use('/request', request_routes)
router.use('/category', category_routes)

module.exports=router