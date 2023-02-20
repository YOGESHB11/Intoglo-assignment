const express = require("express")
const mongoose = require("mongoose")
const app = express()
const route = require("./routes/route")
const multer = require("multer")
const cors = require("cors")

app.use(cors())
app.use(express.json())
app.use(multer().any())

mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://Yogesh-B:rL3Qx2k0KgDJLnKK@cluster0.xffx0d4.mongodb.net/Intoglo-DB?retryWrites=true&w=majority",
    {useNewUrlParser:true}
    ).then(()=>console.log("mongoDb is connected"))
        .catch((err)=>console.log(err))

app.use("/",route)

app.use("/*", function (req, res) {
    return res.status(400).send({status: false,message: "Please Enter Valid Path Or Parameters !!!!",});
  });
  

app.listen(5000 , function(){
    console.log("Express is running on port 3000")
})

