const userModel = require('../models/userModel')
const aws = require("../aws")
const bcrypt = require("bcryptjs")

const getAllUsers = async function(req,res){
    try{
        let users = await userModel.find()
        return res.status(200).send({status : true, message :  users})
    }catch(err){
        console.log(err)
        return res.status(500).send({error : err})
    }
}

const register = async function(req,res){
    try{
        console.log(req.body)
        let {name , email, phone, password, photo} = req.body
        const findEmail = await userModel.findOne({ email: email });
        if (findEmail) {
        return res.status(400).send({ message: "User with this email Id alredy exists." })
        }
        // await bcrypt.hash(req.body.password,10,function(err,result){
        //     if(err){
        //         return res.status(400).send({status:false, message:err})
        //     }
        //     else{
        //         req.body.password=result
        //     }
        // })
        const hashedPassword = bcrypt.hashSync(req.body.password)

        const files = req.files
        console.log(files)
        if(files && files.length>0){
            const url = await aws.uploadFile(files[0])
            photo = url
        }
        const user = new userModel({
            name,
            email,
            password: hashedPassword,
            photo,
            phone,
            docs: []
        })
       await user.save()
        return res.status(201).send({ message: user });
    }catch(err){
        console.log(err)
        return res.status(500).send({status : false , error : err})
    }
}

const login =  async function(req,res){
    try{
        const findEmail = await userModel.findOne({ email: req.body.email });
        if (!findEmail) {
        return res.status(400).send({ message: "Couldn't find a user by this email" })
        }
        let encryptPass = await bcrypt.compare(req.body.password,findEmail.password)
        if(!encryptPass) return res.status(400).send({ status: false, message: "Login failed! password is incorrect." })
        return res.status(200).send({ status: true, message: 'Login Successfull !!' });
    }catch(err){
        console.log(err)
        return res.status(500).send({status : false , error : err})
    }
}

module.exports = {
    register,
    login,
    getAllUsers
}