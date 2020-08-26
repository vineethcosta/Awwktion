const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const bidderSchema = new mongoose.Schema({
    auction_id:{
        type:ObjectId,
        ref:"Auctions"
    },
    bidding_price:{
        type:Number,
        required:true
    },
    user_id:[{type:ObjectId,ref:"Users"}],
},{timestamps:true})

mongoose.model("Bidders",bidderSchema)