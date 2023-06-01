const express = require("express")
const path = require("../views/path")

const router = express.Router()


router.get("/login",(req,res)=>{
    // console.log()
    res.sendFile(path+"/user/login.html")
})

router.get("/register",(req,res)=>{
    res.sendFile(path+"/user/register.html")
})

module.exports=router