const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const userSchema = new mongoose.Schema({
    auction_id:{
        type:ObjectId,
        ref:"Auctions"
    },
    last_price:{
        type:Number,
        required:true
    },
    is_active:{
        type:Boolean,
        required:true
    },
    bidderId:[{type:ObjectId,ref:"Auctions"}],
},{timestamps:true})

mongoose.model("LiveAuctions",userSchema)