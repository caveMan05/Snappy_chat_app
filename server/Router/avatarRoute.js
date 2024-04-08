const express=require("express")
const Router=express.Router()
const avatarController=require("../Controller/avatarController")
Router.route("/avatar").get(avatarController.avatarData)
Router.route("/pushavatar").post(avatarController.pushImg)

module.exports=Router