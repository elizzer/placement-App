const express = require("express")

const router =  express.Router()

const {login,register,requiredSignin}= require('../controller/user')

router.post("/login",login)

router.post("/register",register)

router.get("/get",requiredSignin)

module.exports=router