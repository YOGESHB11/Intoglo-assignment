const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    phone : {
        type : Number,
        required : true
    },
    photo : {
        type : String
    },
    docs : [{ type : mongoose.Schema.Types.ObjectId , ref : "Doc" }] 
    
})

module.exports = mongoose.model("User" , userSchema)