const express = require("express")
const router =  express.Router()

const multer = require("../../controller/multer")


const {login,register,requiredSignin,update,profilePhoto,getProfilePhoto,uploadResume,getResume}= require('../../controller/user/user')

//user register
router.post("/register",register)
//user login
router.post("/login",login)

//profile update
router.put("/updateProfile",requiredSignin,update)
//upload profile image
router.post("/upload/profilePhoto",requiredSignin,multer.profileStorage,profilePhoto)
//get profile image
router.get("/profilePhoto/:userid",getProfilePhoto)

//user login with google

//change password 

//user change role

//user upload resume
router.post("/uploadResume/:userid",requiredSignin,multer.resumeStorage,uploadResume)

//get a user's latest resume
router.get("/getresume/:userid/:resume",getResume)



router.get("/get",requiredSignin)

module.exports=router