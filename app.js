const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const { errorHandler } = require('./src/helpers/errorHandler')
// const avatarUploadHandler = require('./src/helpers/avatarUploadHandler')

const { contactsRouter } = require('./src/routes/api/routersContacts')
const { usersRouter } = require('./src/routes/api/routersUsers')

// const upload = require('./src/helpers/multer')
const app = express()
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

// app.use(express.static(avatarStorage.TEMPRORARY))
// app.post('/upload', upload.single('avatar'), avatarUploadHandler)

app.use('/api/contacts', contactsRouter)
app.use('/api/users', usersRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use(errorHandler)

module.exports = app
