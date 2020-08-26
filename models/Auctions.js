const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const auctionsSchema = new mongoose.Schema({
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

    base_price:{
        type:Number,
        required: true
    },

    auction_ending_timestamp:{
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
    bidders:[{type:ObjectId,ref:"Bidders"}],
},{timestamps:true})

mongoose.model("Auctions",auctionsSchema)