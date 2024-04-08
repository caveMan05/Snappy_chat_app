const express=require("express")
const Router=express.Router()
const messsagesController=require("../Controller/messgesController")
Router.route("/msg/addmsg").post(messsagesController.addMessages)
Router.route("/msg/getmsg").post(messsagesController.getMessages)

module.exports=Router