const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()

const bodyParser = require("body-parser")

const app = express()

const userRoutes = require("./routes/user")


const path = require('path')

app.set('view engine','ejs')
app.set("views","views")

const cors = require('cors');
app.use(cors())
app.use(express.static(path.join(__dirname,'public')))

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())


app.use("/user",userRoutes)
app.use((req,res)=>{
    res.render("404")
})

app.listen(5000,()=>{
    console.log('[+]Server is up and ready...')
    console.log('[+]http://localhost:5000')
    mongoose.connect(process.env.mongoDbURI).then(()=>{
        console.log("[+]DB connected to ", process.env.mongoDbURI)
    })
})