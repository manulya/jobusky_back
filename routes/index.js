const Router = require('express')
const router = new Router()
const user_routes=require('./user_routes')
const send_routes=require('./send_routes ')
const skills_routes=require('./skills_routes')
const company_routes=require('./company_routes')
const job_routes=require('./job_routes')
const request_routes=require('./request_routes')

router.use('/user', user_routes)
router.use('/company', company_routes)
router.use('/job', job_routes)
router.use('/request', request_routes)
router.use('/skills', skills_routes)
router.use('/send', send_routes)

module.exports=router