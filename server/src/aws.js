const aws = require('aws-sdk')
const dotenv = require('dotenv')
dotenv.config()

//Stored credentials in .env module
const bucketName = process.env.BUCKET_NAME 
const bucketRegion = process.env.BUCKET_REGION
const accessKey = process.env.ACCESS_KEY
const secretAccessKey = process.env.SECRET_ACCESS_KEY

//AWS Configuration
aws.config.update({
    accessKeyId : accessKey,
    secretAccessKey : secretAccessKey,
    region : bucketRegion
})

const uploadFile = function(file){
    return new Promise(function(resolve,reject){
        let s3 = new aws.S3({"apiVersion":"2006-03-01"})

        const uploadParams = {
            ACL:"public-read",
            Bucket:bucketName,
            Key:"taskFolder/"+file.originalname,
            Body:file.buffer
        }

        s3.upload(uploadParams, function(err,result){
            if(err) return reject({error:err})
            return resolve(result.Location)
        })
    })
}

module.exports={
    uploadFile
}