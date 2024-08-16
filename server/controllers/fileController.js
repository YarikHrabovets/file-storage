const path = require('path')
const { Sequelize } = require('sequelize')
const { File, Employee, Notification } = require('../models/models')
const ApiError = require('../errors/ApiError')
const { makeDir, uploadFile, saveFile, removeFile, moveFile } = require('../services/fileService')

const Op = Sequelize.Op

class fileController {
    async createDir(req, res, next) {
        try {
            const {name, type, parent} = req.body
            const parentFile = await File.findOne({where: {id: parent, employeeId: req.employee.id}})
            const filepath = parentFile ? path.join(parentFile.path, name) : name
            await makeDir(req.employee.id, filepath)
            const file = await File.create({
                name, 
                type, 
                path: filepath, 
                parentId: parent, 
                employeeId: req.employee.id
            })
            return res.json(file)
        } catch (error) {
            return next(ApiError.internal(error.message))
        }
    }

    async fetchFiles(req, res, next) {
        try {
            const { sort, parent } = req.query
            const order = []
            switch (sort) {
                case 'name':
                    order.push(['name', 'ASC'])
                    break
                case 'type':
                    order.push(['type', 'ASC'])
                    break
                case 'date':
                    order.push(['createdAt', 'DESC'])
                    break
            }
            const files = await File.findAll({where: {
                employeeId: req.employee.id, 
                type: {[Op.not]: null},
                parentId: parent || null
            }, order: order})
            return res.json(files)
        } catch (error) {
            return next(ApiError.internal('Помилка при отриманні файлів'))
        }
    }

    async uploadFile(req, res, next) {
        try {
            const { file } = req.files
            const parentFile = await File.findOne({where: {id: req.body.parent || null, employeeId: req.employee.id}})
            const employee = await Employee.findByPk(req.employee.id)
            const filepath = parentFile ? path.join(parentFile.path, file.name) : file.name

            if (employee.spaceUsed + file.size > employee.diskSpace) {
                return next(ApiError.forbidden('На диску немає вільного місця'))
            }

            employee.spaceUsed = employee.spaceUsed + file.size
            await uploadFile(employee.id, file, filepath)
            const type = file.name.split('.').pop()
            const dbFile = await File.create({
                name: file.name, 
                type,
                size: file.size, 
                path: filepath,
                parentId: parentFile?.id,
                employeeId: employee.id
            })
            await employee.save()
            return res.json(dbFile)
        } catch (error) {
            return next(ApiError.internal(error.message))
        }
    }

    async downloadFile(req, res, next) {
        try {
            const file = await File.findOne({where: {id: req.query.id, employeeId: req.employee.id}})
            await saveFile(req.employee.id, file, res)
        } catch (error) {
            return next(ApiError.internal('Помилка при вивантаженні файла'))
        }
    }

    async deleteFile(req, res, next) {
        try {
            const file = await File.findOne({where: {id: req.query.id, employeeId: req.employee.id}})
            await removeFile(req.employee.id, file)
            await file.destroy()
            return res.json({message: 'Успішно видалено'})
        } catch (error) {
            return next(ApiError.internal('Папка не пуста, неможливо видалити'))
        }
    }

    async searchFile(req, res, next) {
        try {
            const { search } = req.query
            let files = await File.findAll({where: {employeeId: req.employee.id}})
            files = files.filter((file) => file.name.includes(search))
            return res.json(files)
        } catch (error) {
            return next(ApiError.internal(error.message))
        }
    }

    async shareFile(req, res, next) {
        try {
            const { file } = req.files
            const type = file.name.split('.').pop()
            const recipient = await Employee.findByPk(req.body.recipient)
            const isFileExist = await File.findOne({where: {employeeId: req.body.recipient, path: file.name, type}})
            if (isFileExist) {
                return next(ApiError.forbidden('Такий файл вже існує'))
            }
            if (recipient.spaceUsed + file.size > recipient.diskSpace) {
                return next(ApiError.forbidden('На диску немає вільного місця'))
            }
            recipient.spaceUsed = recipient.spaceUsed + file.size
            await uploadFile(recipient.id, file, file.name)
            await File.create({
                name: file.name, 
                type,
                size: file.size, 
                path: file.name,
                employeeId: recipient.id
            })
            await Notification.create({
                message: `У Вас новий файл: ${file.name}`,
                sender: req.employee.username,
                recipientId: recipient.id
            })
            await recipient.save()
            return res.json({message: 'Успішно відправленно'})
        } catch (error) {
            return next(ApiError.internal('Помилка при поширенні файлу'))
        }
    }

    async fetchDirs(req, res, next) {
        try {
            const dirs = await File.findAll({where: {employeeId: req.employee.id, type: {[Op.or] : ['dir', null]}}})
            return res.json(dirs)
        } catch (error) {
            return next(ApiError.internal('Помилка при отримані папок'))
        }
    }

    async moveFile(req, res, next) {
        try {
            const { fileId, dir } = req.body
            const file = await File.findOne({where: {employeeId: req.employee.id, id: fileId}})
            const newPath = path.join(dir.path, file.name)
            await moveFile(req.employee.id, file.path, newPath)
            file.path = newPath
            file.parentId = dir.type === 'dir' ? dir.id : null
            await file.save()
            return res.json({message: `Успішно перенесено до папки ${dir.name}`})
        } catch (error) {
            return next(ApiError.internal('Помилка при перенесені файлу'))
        }
    }
}

module.exports = new fileController()