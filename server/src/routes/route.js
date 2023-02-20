const express = require("express")
const route = express.Router()
const userController = require("../controllers/userController")
const docsController = require("../controllers/docsController")

route.get("/users" , userController.getAllUsers)

route.post("/signup" , userController.register)

route.post("/login" , userController.login)

route.get("/getDocs" , docsController.getAllDocs)

route.post("/addDocs" , docsController.addDocs)

route.delete("/:id" , docsController.deleteDoc)

route.get("/user/:id" , docsController.getByUserId)

module.exports = route