const User = require("../model/User")
const bcrypt = require("bcrypt")

const loginError={
    email:"",
    password:"",
    name:"",
    roll:""
}


exports.login=(req,res)=>{
    console.log("[+]Login contoller exec...",req.body)
    var newuser = new User()
    
}