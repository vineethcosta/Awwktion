const express = require('express')
const app = express()
const mongoose  = require('mongoose')
const PORT = process.env.PORT || 6000
const {MONGOURI} = require('./config.js')
var cors = require('cors')
app.use(cors())

require('./models/Auctions')
require('./models/LiveAuctions')
require('./models/Users')

mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useFindAndModify: false

})
mongoose.connection.on('connected',()=>{
    console.log("connected to mongoDB")
})

app.listen(PORT,()=>{
    console.log("server is running on",PORT)
})