const mongoose=require("mongoose")
const avatarSchema=mongoose.Schema({
  img:{
    type:String
  }
})

const Pictures=new mongoose.model("avatar",avatarSchema)
module.exports=Pictures