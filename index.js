const express = require("express")

const app = express()

const userRoutes = require("./routes/user")

const path = require("./views/path")

app.use("/user",userRoutes)
app.use((req,res)=>{
    res.sendFile(path+"/404.html")
})

app.listen(5000,()=>{
    console.log('[+]Server is up and ready...')
})