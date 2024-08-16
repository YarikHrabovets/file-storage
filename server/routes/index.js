const Router = require('express')
const router = new Router()
const employeeRouter = require('./employeeRouter')
const fileRouter = require('./fileRouter')

router.use('/employee', employeeRouter)
router.use('/files', fileRouter)

module.exports = router