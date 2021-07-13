require('dotenv').config()

const { connectMongo } = require('../src/db/connection')
const app = require('../app')

const PORT = process.env.PORT || 3040

const start = async () => {
  try {
    await connectMongo()
    app.listen(PORT, err => {
      if (err) console.error('Error at aserver launch:', err)
      console.log(`Server works at port ${PORT}!`)
    })
  } catch (err) {
    console.error(`Failed to launch application with error: ${err.message}`)
  }
}

start()
