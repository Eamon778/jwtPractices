const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const errorHandler = require('./middleware/customErrorHandler')
const router = require('./routes/router')


const app = express()

app.use(express.json())
app.use(errorHandler)

app.use('/api/v1', router)

const start = async ()=>{
    try{
        app.listen(process.env.PORT, ()=> console.log(`Server is listening on port ${process.env.PORT}`))
        await mongoose.connect(process.env.MONGO_URI)
    } catch(err){
        console.log(`Error: ${err.message}`);
    }
}

start()