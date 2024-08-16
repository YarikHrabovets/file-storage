const { Sequelize } = require('sequelize')
const config = require('config')

const sequelize = new Sequelize(
    config.get('DB_NAME'),
    config.get('DB_USER'),
    config.get('DB_PASSWORD'),
    {
        dialect: 'mysql',
        host: config.get('DB_HOST'),
        port: config.get('DB_PORT'),
        logging: false
    }
)

const connectDB = async () => {
    await sequelize.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch((error) => console.log('Unable to connect to the database: ', error))
    await sequelize.sync()
    .then(() => console.log('Database has been synchronized.'))
    .catch((error) => console.log('Unable to synchronize database: ', error))
}

module.exports = {
    sequelize,
    connectDB
}