const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:[true,"Email is required "],
        unique:true,
        validator:{
            validator:function(v){
                return /^[\w\.-]+@gct\.ac\.in$/.test(v)
            },
            message:props=>`${props.value} is not a mail from the organisation \"gct.ac.in\"`
        }
    },
    password:{
        type:String,
        required:[true,"Password is required "]
    },
    linkedIn:{
        type:String,
    },
    github:{
        type:String
    },
    name:{
        type:String,
        required:[true,"Name is required "]
        },
    roll:{
        type:Number,
        required:[true,"Roll number is required"]
    },
    branch:{
        type:String,
        required:[true,"Branch is required"],
        enum:{
            values:["CSE","IT","Civil","Mech","Production"],
            message:"Invalid Department"
        }
    },
    role:{
        type:String,
        enum:["student","PR","PA"],
        default:"student"
    }

});


module.exports = mongoose.model("User",userSchema)