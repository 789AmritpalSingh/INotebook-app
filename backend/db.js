const mongoose = require('mongoose')

const mongoURI = "mongodb://127.0.0.1:27017/AmritData"

const connectToMongo = () => {
   mongoose.connect(mongoURI)
   console.log("Connect to MongoDB successfully")
}
module.exports = connectToMongo