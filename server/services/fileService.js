const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
const uuid = require('uuid')
const config = require('config')

const makeDir = (id, relPath) => {
    const filePath = path.join(config.get('pathToFiles'), id, relPath)
    return new Promise((resolve, reject) => {
        try {
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath)
                return resolve({message: 'Папка була створена!'})
            } else {
                return reject({message: 'Така папка вже існує'})
            }
        } catch (error) {
            return reject({message: 'Помилка при створенні папки'})
        }
    })
}

const uploadFile = (id, file, relPath) => {
    const filePath = path.join(config.get('pathToFiles'), id, relPath)
    return new Promise((resolve, reject) => {
        try {
            if (!fs.existsSync(filePath)) {
                file.mv(filePath)
                return resolve({message: 'Файл завантажений!'})
            } else {
                return reject({message: 'Такий файл вже існує'})
            }
        } catch (error) {
            return reject({message: 'Помилка при завантаженні файла'})
        }
    })
}

const saveFile = (id, file, res) => {
    const filePath = path.join(config.get('pathToFiles'), id, file.path)
    return new Promise((resolve, reject) => {
        try {
            if (fs.existsSync(filePath)) {
                res.download(filePath, file.name)
                return resolve({message: 'Файл вивантажений!'})
            } else {
                return reject({message: 'Невдалося вивантажити файл'})
            }
        } catch (error) {
            return reject({message: 'Помилка при вивантаженні файла'})
        }
    })
}

const removeFile = (id, file) => {
    const filePath = path.join(config.get('pathToFiles'), id, file.path)
    return new Promise((resolve, reject) => {
        try {
            if (fs.existsSync(filePath)) {
                file.type === 'dir' ? fs.rmdirSync(filePath) : fs.unlinkSync(filePath)
                return resolve({message: 'Файл видалений!'})
            } else {
                return reject({message: 'Невдалося видалити файл'})
            }
        } catch (error) {
            return reject({message: 'Помилка при видалені файла'})
        }
    })
}

const removeAvatar = (fileName) => {
    fs.unlinkSync(path.join(config.get('pathToAvatars'), fileName))
}

const moveAvatar = (buffer, width, height) => {
    const fileName = `${uuid.v4()}.jpg`
    const filePath = path.join(config.get('pathToAvatars'), fileName)
    return new Promise((resolve, reject) => {
        try {
            sharp(buffer).resize(width, height).toFile(filePath)
            return resolve(fileName)
        } catch (error) {
            return reject({message: 'Помилка при обробленні фото'})
        }
    })
}

const moveFile = (id, oldPath, newPath) => {
    const absOldPath = path.join(config.get('pathToFiles'), id, oldPath)
    const absNewPath = path.join(config.get('pathToFiles'), id, newPath)
    return new Promise((resolve, reject) => {
        try {
            if (!fs.existsSync(absNewPath)) {
                fs.renameSync(absOldPath, absNewPath)
                return resolve('Файл перенесено!')
            } else {
                return reject({message: 'Такий файл вже існує'})
            }
        } catch (error) {
            return reject({message: 'Помилка при перенесені файлу'})
        }
    })
}

module.exports = {
    makeDir, 
    uploadFile,
    saveFile,
    removeFile,
    removeAvatar,
    moveAvatar,
    moveFile
}