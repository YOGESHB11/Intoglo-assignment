const docsModel = require("../models/docsModel")
const userModel = require("../models/userModel")
const mongoose = require("mongoose")
const aws = require("../aws")

const addDocs = async function(req,res){
    try{
        let user = await userModel.findById(req.body.userId)
        if(!user) return res.status(404).send({status : false , message : "Unable to find user with this Id"})
        const files = req.files
        // console.log(files)
        if(files && files.length>0){
            const url = await aws.uploadFile(files[0])
            req.body.docs = url
        } 
        // const created = await docsModel.create(req.body)
        const {userId , docs} = req.body
        const docObj = new docsModel({
            userId,
            docs
        })
        const session = await mongoose.startSession()
        session.startTransaction();
        await docObj.save({session})
        user.docs.push(docObj);
        await user.save({session})
        await session.commitTransaction()
        return res.status(201).send({docObj})
    }catch(err){
        console.log(err)
        return res.status(500).send({status : false, error : err})
    }
}

const deleteDoc = async function(req,res){
    try{
        const id = req.params.id
        let obj = await docsModel.findByIdAndRemove(id).populate("userId")
        await obj.userId.docs.pull(obj)
        await obj.userId.save()
        return res.status(200).send({message : "Successfully deleted"})
    }catch(err){
        console.log(err)
        return res.status(500).send({status : false, error : err})
    }
}

const getAllDocs = async function(req,res){
    try{
        let docs = await docsModel.find().populate("userId")
        if(!docs) return res.status(404).send({status : false , message : "No document found"})
        return res.status(200).send({status : true, data : docs})
    }catch(err){
        console.log(err)
        return res.status(500).send({status : false, error : err})
    }
}

const getByUserId = async function(req,res){
    try{
        const userId = req.params.id
        let userDocs = await userModel.findById(userId).populate("docs")
        if(!userDocs) return res.status(404).send({message : "Doc not found"})
        return res.status(200).send({data : userDocs})
    }catch(err){
        console.log(err)
        return res.status(500).send({status : false, error : err})
    }
}
module.exports = {
    getAllDocs,
    addDocs,
    deleteDoc,
    getByUserId
}