const Router = require('express')
const { check } = require('express-validator')
const router = new Router()
const employeeController = require('../controllers/employeeController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/registration', [
        check('username', 'Логін повинен бути в діапазоні від 7 до 20 символів').isLength({min: 7, max: 20}),
        check('password', 'Пароль повинен бути в діапазоні від 4 до 12 символів').isLength({min: 4, max: 12})
    ], checkRoleMiddleware('CHIEF'), employeeController.register)
router.post('/login', employeeController.login)
router.post('/upload', authMiddleware, employeeController.uploadAvatar)
router.post('/update-login', [
    check('newLogin', 'Логін повинен бути в діапазоні від 7 до 20 символів').isLength({min: 7, max: 20})
    ], authMiddleware, employeeController.updateLogin)
router.post('/update-password', [
    check('currentPassword', 'Пароль повинен бути в діапазоні від 4 до 12 символів').isLength({min: 4, max: 12}),
    check('newPassword', 'Пароль повинен бути в діапазоні від 4 до 12 символів').isLength({min: 4, max: 12}),
],authMiddleware, employeeController.updatePassword)
router.get('/authentication', authMiddleware, employeeController.authentication)
router.get('/colleagues', authMiddleware, employeeController.fetchColleagues)
router.get('/disk-space', authMiddleware, employeeController.fetchDiskSpace)
router.get('/notifications', authMiddleware, employeeController.fetchNotification)
router.delete('/delete', authMiddleware, employeeController.deleteAvatar)
router.delete('/notification-delete', authMiddleware, employeeController.deleteNotification)

module.exports = router