const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const { errorHandler } = require('./src/helpers/errorHandler')
const contactsRouter = require('./src/routes/api/routesContacts')
const { authRouter } = require('./src/routes/api/routersAuth')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)
app.use('/api/users', authRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use(errorHandler)

module.exports = app
