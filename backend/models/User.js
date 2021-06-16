const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    FirstName:{
        type:String,
        required:'First Name is Required'
    },
    LastName:{
        type:String,
        required:'Last Name is Required'
    },
    email:{
        type:String,
        required:'Email is required'
    },
    password:{
        type:String,
        required:'Password is required'
    }
},
    {
    timestamps: true, 
    }
)


module.exports = mongoose.model("User",userSchema); 