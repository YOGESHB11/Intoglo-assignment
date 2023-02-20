const mongoose = require("mongoose")

const docSchema = new mongoose.Schema({
    userId : {
        type :mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    docs : {
        type : String
    }
})

module.exports = mongoose.model("Doc" , docSchema)