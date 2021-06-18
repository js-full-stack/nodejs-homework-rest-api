const app = require('../app')
require('dotenv').config()
const PORT = process.env.PORT || 8081

const { connectMongo } = require('../src/db/connections')
const start = async () => {
  try {
    await connectMongo()

    app.listen(PORT, error => {
      if (error) console.error('Error at aserver launch:', error)
      console.log(`Server works at port ${PORT}!`)
    })
  } catch (error) {
    console.error(`Failed to launch application with error: ${error.message}`)
  }
}

start()
