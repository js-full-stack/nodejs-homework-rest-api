const MongoClient = require('mongodb').MongoClient
const collections = {}
// require('dotenv').config()

const getCollections = () => {
  return collections
}

const connectMongo = async () => {
  const client = await MongoClient.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  const db = client.db()
  collections.Contacts = db.collection('contacts')
}

module.exports = { connectMongo, getCollections }
