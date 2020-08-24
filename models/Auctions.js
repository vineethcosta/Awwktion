const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const userSchema = new mongoose.Schema({
    posted_by:{
        type:ObjectId,
        ref:"Users"
    },

    category:{
        type:String,
        required:true
    },

    auction_name:{
        type:String,
        required:true
    },

    is_on_timer:{
        type:Boolean,
        required:true
    },

    auction_activate_timestamp:{
        type: Date,
        required:true
    },

    item_name:{
        type:String,
        required:true
    },

    item_description:{
        type:String,
        required:true
    },
    likes:[{type:ObjectId,ref:"Auctions"}],
},{timestamps:true})

mongoose.model("Auctions",userSchema)