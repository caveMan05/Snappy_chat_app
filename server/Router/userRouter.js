const express=require("express")
const Router=express.Router()
const userController=require("../Controller/userController")
const validateMiddleware=require("../Middleware/validateMiddleware")
const registerValidator=require("../zodValidator/RegisterValidator")
const authUserMiddlewware = require("../Middleware/authTokenMiddleware")
Router.route("/user/register").post(validateMiddleware(registerValidator),userController.register)
Router.route("/user/login").post(userController.login)
Router.route("/user/setavatar").post(authUserMiddlewware,userController.setProfilePicture)
Router.route("/auth/currentuser").get(authUserMiddlewware,userController.currentUserData)
Router.route("/auth/allusers").get(authUserMiddlewware,userController.getAllUsers)

module.exports=Router