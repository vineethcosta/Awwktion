const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Bidder = mongoose.model("Bidders")
const Auction = mongoose.model("Auctions")
const requireLogin  = require('../middleware/RequireLogin')


router.post('/createbid/:auction_id',requireLogin,async (req,res)=>{
    const {bidding_price} = req.body 
    let recentBidPrice;
    await Bidder.find({auction_id :req.params.auction_id}).limit(1).sort({$natural:-1})
    .then(bidderBid => {
        recentBidPrice = bidderBid[0].bidding_price;
    })
    .catch(err=>{
        console.log(err)
    })
    if(!recentBidPrice){
        await Auction.findOne({_id:req.params.auction_id})
        .then(auctionBid => {
            recentBidPrice = auctionBid.base_price;
        })
        .catch(err=>{
            console.log(err)
        })
    }
    
    if(!bidding_price ){
        return  res.status(422).json({error:"Plase add bidding price"})
    }else if(!recentBidPrice){
        return  res.status(422).json({error:"No Auction or Auction has ended!"})
    }
    else if(bidding_price <= recentBidPrice){
        return  res.status(422).json({error:"bidding price should be greater than recent bid price or base price"})
    }
    
    const bid = new Bidder({
        auction_id: req.params.auction_id,
        bidding_price,
        user_id : req.user._id
    })
    bid.save().then(result=>{
        res.json({bid:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/getmybids',requireLogin,(req,res)=>{
    Bidder.find({user_id:req.user._id})
    .populate("posted_by","_id name")
    .then(mybids=>{
        res.json({mybids})
    })
    .catch(err=>{
        console.log(err)
    })
})

//After clicking participate this route will be called
router.put('/addtomybids/:auction_id',requireLogin,(req,res)=>{
    User.findByIdAndUpdate(req.user._id,{
        $push:{my_bids:req.params.auction_id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

router.get('/last3bids/:auction_id', (req, res) => {
    Bidder.find({auction_id :req.params.auction_id})
    .limit(3)
    .sort('-createdAt')
    .then(mybids => {
        res.json(mybids)
    })
    .catch(err=>{
        console.log(err)
    })
})

module.exports = router