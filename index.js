const express = require('express')
const app = express()
const mongoose  = require('mongoose')
const PORT = process.env.PORT || 4000
const {MONGOURI} = require('./config/keys')
var cors = require('cors')
app.use(cors())

require('./models/Auctions')
require('./models/LiveAuctions')
require('./models/Users')

app.use(express.json())
app.use(require('./routes/Auth'))

mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useFindAndModify: false

})
mongoose.connection.on('connected',()=>{
    console.log("connected to mongoDB!")
})

app.get('/', (req,res) => {
    res.send("hello world")
})

app.listen(PORT,()=>{
    console.log("server is running on",PORT)
})