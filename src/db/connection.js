const mongoose = require('mongoose')

const connectMongo = async () => {
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}

mongoose.connection.on('connected', () => {
  console.log('Database connection successful')
})

mongoose.connection.on('error', error => {
  console.log(`connection error: ${error.message}`)
})

mongoose.connection.on('disconnected', () => {
  console.log('disconnection occurred')
})

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Connection to DB closed')
    process.exit(1)
  })
})

module.exports = { connectMongo }
