const express = require("express")
const router =  express.Router()

const multer = require('multer')
const uuid = require('uuid')

const profileStorage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/profile')
    },
    filename:function(req,file,cb){
        console.log('[+]Uploaded file name ',file)
        req.filename =uuid.v4()+".jpg"
        cb(null,req.filename)
    }
})

const upload = multer({storage:profileStorage})

const {login,register,requiredSignin,profilePhoto,getProfilePhoto,updateProfile,retrieveDataWhileUpdateProfile}= require('../controller/user')

//user register
router.post("/register",register)
//user login
router.post("/login",login)
//retrieving user details while update
router.get("/updateProfile/:id",requiredSignin,retrieveDataWhileUpdateProfile)

//profile update
router.put("/updateProfile/submit/:id",requiredSignin,updateProfile)

//upload profile image
router.post("/upload/profilePhoto",requiredSignin,upload.single("profilePhoto"),profilePhoto)
//get profile image
router.get("/profilePhoto/:userid",getProfilePhoto)


//change password 


router.get("/get",requiredSignin)

module.exports=router