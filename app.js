const express = require('express')
const app = express()
const mongoose  = require('mongoose')
const PORT = process.env.PORT || 3000
const {MONGOURI} = require('./config/keys')
var cors = require('cors')
app.use(cors())

mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useFindAndModify: true

})
mongoose.connection.on('connected',()=>{
    console.log("connected to mongoDB!")
})

mongoose.connection.on('error',(err)=>{
    console.log("err connecting",err)
})

require('./models/Auctions')
require('./models/Bidders')
require('./models/Users')

app.use(express.json())
app.use(require('./routes/Auth'))
app.use(require('./routes/Auctions'))
app.use(require('./routes/Bids'))


app.listen(PORT,()=>{
    console.log("server is running on",PORT)
})