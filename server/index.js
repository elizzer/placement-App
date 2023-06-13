const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors');
require("dotenv").config()
const bodyParser = require("body-parser")

const app = express()


//MiddleWares

app.use(cors())

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())


//routes configs
const userRoutes = require("./routes/user")

app.use('/user',userRoutes)
 

//server and DB config
app.listen(5000,()=>{
    console.log('[+]Server is up and ready...')
    console.log('[+]http://localhost:5000')
    mongoose.connect(process.env.mongoDbURI).then(()=>{
        console.log("[+]DB connected to ", process.env.mongoDbURI)
    })
})