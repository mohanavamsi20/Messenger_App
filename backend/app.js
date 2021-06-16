const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const usersRouter = require('./controllers/UserControllers')

mongoose.connect(config.MONGODB_URI, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true})
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.info('error connection to MongoDB:', error.message)
    })


app.use(cors())
app.use(middleware.tokenExtractor)
app.use(middleware.requestLogger)
app.use(bodyParser.json())
app.use('/',usersRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app