var express = require('express')
var bodyParser = require("body-parser");
const mongoose = require('mongoose');
const userRouts = require('./routes/userRouts')
const typicodeRouts = require('./routes/typicodeRouts')
var app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

mongoose.connect('mongodb+srv://shubhamkarma:Maya2748%40@auth.4yc2uyd.mongodb.net/?retryWrites=true&w=majority')
    .then(() =>{ 
        console.log('Connected to db!')
    }).catch(e=> {
            console.log(e)
    })

app.use('/user', userRouts)
app.use('/typicode', typicodeRouts)

let port = 5000
app.listen(port,()=>{
    console.log('Server is running on port --> '+ port)
})
