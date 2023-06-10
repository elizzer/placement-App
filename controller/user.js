const User = require("../model/User")
const bcrypt = require("bcrypt")

const registerError= require("../routes/user")

exports.login=(req,res)=>{
    console.log("[+]Login contoller exec...",req.body)
    // var newuser = new User()    
}


exports.register=(req,res)=>{
    console.log("[+]register contoller exec...",req.body)
    registerError.password="changed"
    res.redirect('register')
}