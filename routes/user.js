const express = require("express")
const path = require("../views/path")

const router = express.Router()


const userController = require("../controller/user")

router.get("/login",(req,res)=>{
    // console.log()
    res.render("user/login")
})

router.post("/login",userController.login)

router.get("/register",(req,res)=>{
    // res.render(path+"/user/register.html")
})

module.exports=router