const express = require('express')
const config = require('config')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const { connectDB } = require('./db')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const PORT = config.get('SERVER_PORT')
const app = express()

const corsOptions = {
    origin: config.get('ALLOWED_CLIENTS').split(',')
}

app.use(express.json())
app.use(cors(corsOptions))
app.use(fileUpload({defCharset: 'utf8', defParamCharset: 'utf8'}))
app.use('/media', express.static(config.get('pathToAvatars')))
app.use('/server', router)
app.use(errorHandler)

const start = async () => {
    try {
        await connectDB()
        app.listen(PORT, () => console.info(`Server has been started on port ${PORT}...`))
    } catch (error) {
        console.error(error)
    }
}

start()