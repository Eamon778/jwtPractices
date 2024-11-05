const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const errorHandler = require('./middleware/customErrorHandler')
const router = require('./routes/router')
const cookieParser = require('cookie-parser')
const cors = require('cors')


const app = express()


app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    credentials: true
}))
app.use(express.json())
app.use(errorHandler)
app.use(cookieParser())

app.use('/api/v1', router)

const start = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        app.listen(process.env.PORT, ()=> console.log(`Server is listening on port ${process.env.PORT}`))
    } catch(err){
        console.log(`Error: ${err.message}`);
    }
}

start()