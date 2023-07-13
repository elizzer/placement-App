const mongoose = require('mongoose')

const Company = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    location:{
        type:String,
    },
    email:[
        {
            type: String,
        }
    ],
    website:{
        type:String,
    },
    description:{
        type:String,
    },
    spoc:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    constrains:{
        cgpaLimit:{
            type:Float64Array
        }
    }

})

module.exports = mongoose.model("company",Company)