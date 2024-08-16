const jwt = require('jsonwebtoken')
const config = require('config')
const ApiError = require('../errors/ApiError')

module.exports = (role) => {
    return (req, res, next) => {
        if (req.method === 'OPTION') next()
        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return next(ApiError.notLogIn('Робітник не авторизований'))
            }
            const decode = jwt.decode(token, config.get('SECRET_KEY'))
            if (decode.role !== role) {
                return next(ApiError.forbidden('У Вас немає доступу'))
            }
            req.employee = decode
            next()
        } catch (error) {
            return next(ApiError.notLogIn('Робітник не авторизований'))
        }
    }
}