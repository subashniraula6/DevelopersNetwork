const mongoose = require('mongoose')
const config = require('../config.js')
const db = config.get('mongoURI')
const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        console.log("Mongo Db connnected")
    } catch (error) {
        console.error(error.message)
        //Exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB;