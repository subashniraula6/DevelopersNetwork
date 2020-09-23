const express = require('express')
const PORT = process.env.PORT || 5000
const app = express()

const connectDB = require('./config/db')

//Connect DB
connectDB();

//init middleware - receive prased body
app.use(express.json({ extended: false }))


//Define Routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/posts', require('./routes/api/posts'))
app.use('/api/profile', require('./routes/api/profile'))

app.listen(PORT, ()=>{
    console.log("The server is running at PORT:" + PORT)
})