const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Sequelize } = require('sequelize')
const { validationResult } = require('express-validator')
const config = require('config')
const { Employee, File, Notification } = require('../models/models')
const { makeDir, removeAvatar, moveAvatar } = require('../services/fileService')
const ApiError = require('../errors/ApiError')
const uuid = require('uuid')

const Op = Sequelize.Op

const generateJwt = (id, username, role, avatar) => {
    return jwt.sign(
        {id, username, role, avatar},
        config.get('SECRET_KEY'),
        {expiresIn: '24h'}
    )
}

class EmployeeControler {
    async register(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.forbidden(errors))
            }

            const { username, password, role } = req.body

            const candidate = await Employee.findOne({where: {username}})
            if (candidate) {
                return next(ApiError.badRequest('Такий робітник вже зареєстрований'))
            }
            
            const hashPassword = await bcrypt.hash(password, 10)
            const employee = await Employee.create({username, role, id: uuid.v4(), password: hashPassword})
            const file = await File.create({name: employee.id, employeeId: employee.id})
            await makeDir(employee.id, file.path)
            return res.json({username: employee.username, password, role: employee.role})
        } catch (error) {
            return next(ApiError.internal(error.message))
        }
    }
    async login(req, res, next) {
        const { username, password } = req.body

        const employee = await Employee.findOne({where: {username}})
        if (!employee) {
            return next(ApiError.badRequest('Неправильний логін'))
        }

        const isPasswordValid = bcrypt.compareSync(password, employee.password)
        if (!isPasswordValid) {
            return next(ApiError.forbidden('Неправильний пароль'))
        }

        const token = generateJwt(employee.id, employee.username, employee.role, employee.avatar)
        return res.json({token})
    }

    async authentication(req, res, next) {
        const token = generateJwt(req.employee.id, req.employee.username, req.employee.role, req.employee.avatar)
        return res.json({token})
    }

    async updatePassword(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.forbidden(errors))
            }
            const { currentPassword, newPassword } = req.body
            const employee = await Employee.findByPk(req.employee.id)
            const isPasswordValid = bcrypt.compareSync(currentPassword, employee.password)
            if (!isPasswordValid) {
                return next(ApiError.forbidden('Неправильний дійсний пароль'))
            }
            const hashPassword = await bcrypt.hash(newPassword, 10)
            employee.password = hashPassword
            await employee.save()
            return res.json({message: 'Пароль успішно оновлено'})
        } catch (error) {
            return next(ApiError.internal('Помилка при оновленні'))
        }
    }

    async updateLogin(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.forbidden(errors))
            }
            const { newLogin } = req.body
            const employee = await Employee.findByPk(req.employee.id)
            employee.username = newLogin
            await employee.save()
            const token = generateJwt(employee.id, employee.username, employee.role, employee.avatar)
            return res.json({token})
        } catch (error) {
            return next(ApiError.internal('Помилка при оновленні'))
        }
    }

    async uploadAvatar(req, res, next) {
        try {
            const { file } = req.files
            const employee = await Employee.findByPk(req.employee.id)
            const fileName = await moveAvatar(file.data, 300, 300)
            if (employee.avatar) removeAvatar(employee.avatar)
            employee.avatar = fileName
            await employee.save()
            const token = generateJwt(employee.id, employee.username, employee.role, employee.avatar)
            res.json({token})
        } catch (error) {
            return next(ApiError.internal('Помилка при оновленні'))
        }
    }

    async deleteAvatar(req, res, next) {
        try {
            const employee = await Employee.findByPk(req.employee.id)
            removeAvatar(employee.avatar)
            employee.avatar = null
            await employee.save()
            const token = generateJwt(employee.id, employee.username, employee.role, employee.avatar)
            res.json({token})
        } catch (error) {
            return next(ApiError.internal(error.message))
        }
    }

    async fetchColleagues(req, res, next) {
        try {
            const colleagues = await Employee.findAll({
                where: {id: {[Op.not]: req.employee.id}},
                attributes: ['id', 'username', 'avatar']
            })
            return res.json(colleagues)
        } catch (error) {
            return next(ApiError.internal('Помилка при запиті'))
        }
    }

    async fetchDiskSpace(req, res, next) {
        try {
            const diskSpace = await Employee.findByPk(req.employee.id, {attributes: ['diskSpace', 'spaceUsed']})
            return res.json(diskSpace)
        } catch (error) {
            return next(ApiError.internal('Помилка при запиті'))
        }
    }

    async fetchNotification(req, res, next) {
        try {
            const notifications = await Notification.findAll({where: {recipientId: req.employee.id}})
            return res.json(notifications)
        } catch (error) {
            return next(ApiError.internal('Помилка при запиті'))
        }
    }

    async deleteNotification(req, res, next) {
        try {
            const { id } = req.query
            const notification = await Notification.findOne({where: {id, recipientId: req.employee.id}})
            await notification.destroy()
            return res.json({message: 'Успішно видалено'})
        } catch (error) {
            return next(ApiError.internal('Помилка при видалені повідомлення'))
        }
    }
}

module.exports = new EmployeeControler()