const express = require("express")
const path = require("../views/path")

const router = express.Router()


const userController = require("../controller/user")

var loginError={
    email:"",
    password:""
}

var registerError={
    email:"",
    password:""
}

router.get("/login",(req,res)=>{
    // console.log()
    console.log("[+] login...")
    res.render("user/login",loginError)
})

router.post("/login",userController.login)


router.get("/register",(req,res)=>{
    console.log('[+]Rendering register',registerError)
    res.render("user/register",registerError)
})

router.post('/register',userController.register)

module.exports=router
exports.registerError=registerError