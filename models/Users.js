const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phonenumber:{
        type:String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    resetToken:String,
    expireToken:Date,
    likes:[{type:ObjectId,ref:"Auctions"}],
},{timestamps:true})

mongoose.model("Users",userSchema)