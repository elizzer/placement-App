const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../model/User")
const fs = require('fs')

const {root} = require("../path")

exports.register=async(req,res)=>{
    /*
    email 
    userName
    rollno
    password
    year of study
    branch of study
    */

    console.log("[+]Registering...")
    try{
        //do all the user data validation
        console.log("[+]Data given by user for registring ",req.body)
        
        //validating email 
            // the email should be gct mail id and the value of email is must
        let emailRegExp = new RegExp('[a-z0-9]+@gct+\.ac\.in')
        var email= req.body.email

        if(isEmpty(email)){
            throw{
                message:"The email field if missing, Enter the mail id provided by GCT"
            }
        }

        if(emailRegExp.test(email)){

        }else{
            throw {
                message:"The given mail id is not valid"
            }
        }
        
        //validating username
            //The username mustnot be empty

        var userName = req.body.userName

        if(isEmpty(userName)){
            throw{
                message:"The Field userName must not be empty, Enter your actual name here"
            }
        }
        //validating rollno
            //The rollno should not be empty
            //To-DO add further validation for the roll number
        var rollno = req.body.rollno
        if(isEmpty(rollno)){
            throw{
                message:"The field roll number should not be empty"
            }
        }

        //validating password
            //password should not be empty
            //hash the password using bcrypt

        var password = req.body.password
        if(isEmpty(password)){
            throw{
                message:"The fiels password should not be empty"
            }
        }

        await bcrypt.hash(password,10).then(hash=>{
            console.log("[+]User hash...",hash)
            req.body.password=hash
        })

        //Validate the year of sudy
        //add mode validation to the period of study
        var p_from = parseInt(req.body.periodOfStudy.from)
        var p_to= parseInt(req.body.periodOfStudy.to)
        if(isEmpty(p_from)){
            throw{
                message:"From year in period of study is empty !! that should not be left empty"
            }
        }
        else if(isEmpty(p_to)){
            throw{
                message:"to year in period of study is empty !! that should not be left empty"
            }
        }
        if(p_from<2015 && p_to<2019){
            throw{
                message:"The years given are invalid"
            }
        }
        if(p_from>p_to){
            throw{
                message:"From year is bigger than to"
            }
        }
        
        //vlidating branch of study

        var branch = req.body.branch

        if(isEmpty(branch)){
            throw{
                message:"The field branch should not be empty"
            }
        }

        //store the user details in DB

        var newUser = new User(req.body)

        console.log("[=]New user created ",newUser)
      
        await newUser.save().then(e=>{
            console.log('[✅]New user saved into Database')
        }).catch(e=>{
            console.log("[❌] Error in saving the new user ",e.message)
            throw{
                message:e.message
            }
        })

       
    }catch(e){
        // return the errors in data to the frontend to display
        console.log("[❌]Thrown error ",e);
    
        return res.json({
            error:true,
            message:e
        })
    }
    console.log("[✅] Validation of data is successfull...")
    return res.status(200).json({
        error:false,
        message:"[✅] Validation of data is successfull..."
    })
}
exports.login=async(req,res)=>{
    console.log('{+}Login...',req.body)
    //validate the data
    // email,password

    var email = req.body.email
    var password = req.body.password

    try{
        if(isEmpty(email) || isEmpty(password)){
            throw{
                message:"No filed should be empty"
            }
        }
        const user=await User.findOne({email:email})
        if(!user){
            throw{
                message:"Invalid Credentials"
            }
        }
        console.log('[+]User of the email given is ',user)
        console.log("[+]password and hash",user.password,password)
        let match= bcrypt.compareSync(password,user.password)
        
        console.log("[+]Passsword match result ",match)

        if(!match){
            throw{
                message:"Invalid crendentials!!"
            }
        }
        var JWToken= await jwt.sign({id:user._id},process.env.JWT_SECRET)
        user.password=undefined
        return res.status(200).json({
            error:true,
            message:"User verified successfully",
            JWT:JWToken,
            user:user
        })

    }catch(e){
        console.log("[❌]Thrown error ",e);
        return res.json({
            error:true,
            message:e
        })
    }

}


function isEmpty(x){
    return x===undefined || x==="";
}

exports.requiredSignin=async(req,res,next)=>{
    try{
        var token = req.headers['authorization'].split(" ")[1]
        console.log('[+] RequiredSignin ',token)
        var tokenData = jwt.verify(token,process.env.JWT_SECRET)
        var user = await User.findById(tokenData.id)

        if(!user){
            throw " "
        }else{
            console.log('[+]User trying to login ',user)
            req.userId=user._id
        }

    }catch(e){
        return res.status(403).json({
            error:true,
            message:{message:"User not authorized"}
        })
    }

    next()
}

exports.update=async(req,res)=>{
    console.log('[+]Update profile user data', req.body)
    validation.linkedIn(req.body.linkedIn)
}

exports.profilePhoto= async(req,res)=>{
    console.log('[+]A profile photo is been uploaded',req.filename)
    console.log('[+]A the user profile ',req.userId)
    try{
        const user=await User.findById(req.userId)
        var oldPhoto = user.photo;
        if(!isEmpty(oldPhoto)){
            fs.unlinkSync(`uploads/profile/${oldPhoto}`)
        }
        user.photo=req.filename
        console.log(user)
        try{
            await user.save()
        }catch(e){
            throw new Error('Unable to save updated image')
        }

    }catch(e){
        console.error('[❌]Error updating a users profile picture ',e)
        fs.unlinkSync(`uploads/profile/${req.filename}`)
    }
    res.json({
        error:false
    })
}

exports.getProfilePhoto= async(req,res)=>{
  

    try{
        const user = await User.findById(req.params.userid);
        console.log('[+]User id param ',`${root}/uploads/profile/${user.photo}`)
        res.sendFile(`${root}/uploads/profile/${user.photo}`)
    }catch(e){
        console.log('[❌]Error in  getting the profile image',e)
        res.json({
            error:true,
            message:e
        })
    }
}

exports.PR =(req,res,next)=>{
    console.log('[+]PR check')
}

class validation{
    static linkedIn(link){
        var regex=new RegExp("/^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)\/([-a-zA-Z0-9]+)")
        var result = regex.test(link)

        console.log(result)
    }
}

