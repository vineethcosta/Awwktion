const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin  = require('../middleware/RequireLogin')
const Auction =  mongoose.model("Auctions")
const User = mongoose.model("Users")

router.get('/getallauctions',requireLogin,(req,res)=>{
    Auction.find()
    .populate("posted_by","_id name")
    .populate("bidders", "_id name")
    .sort('-createdAt')
    .then((auctions)=>{
        res.json({auctions})
    }).catch(err=>{
        console.log(err)
    })
})

router.get('/getmyauctions',requireLogin,(req,res)=>{
    Auction.find({posted_by:req.user._id})
    .populate("posted_by","_id name")
    .then(myauctions=>{
        res.json({myauctions})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/createauction',requireLogin,(req,res)=>{
    const {auction_name,category,item_name,item_description,base_price} = req.body 
    if(!auction_name || !category || !item_name || !item_description){
      return  res.status(422).json({error:"Plase add all the fields"})
    }
    req.user.password = undefined
    var datetime = new Date();
    const auction = new Auction({
        auction_name,
        category,
        item_name,
        item_description,
        base_price,
        posted_by:req.user,
        is_on_timer: 1,
        auction_ending_timestamp: datetime
    })
    auction.save().then(result=>{
        res.json({auction:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.delete('/deleteauction/:auction_id',requireLogin,(req,res)=>{
    Auction.findOne({_id:req.params.auction_id})
    .populate("posted_by","_id")
    .exec((err,auction)=>{
        if(err || !auction){
            return res.status(422).json({error:err})
        }
        if(auction.posted_by._id.toString() === req.user._id.toString()){
            auction.remove()
              .then(result=>{
                  res.json(result)
              }).catch(err=>{
                  console.log(err)
              })
        }
    })
})




module.exports = router
