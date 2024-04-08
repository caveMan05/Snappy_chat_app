const pictures=require("../Model/avatars")

const avatarData=async(req,res)=>{
  const data=await pictures.find()
  res.status(200).json(data)
}

//https://www.svgrepo.com/svg/79566/avatar    for more avatar
const pushImg=async(req,res)=>{
  try{
    const {img}=req.body
    const pushData=await pictures.create({img})
    res.status(200).json(pushData)
  }catch(error){
    console.log("pushing img error")
  }

}

module.exports={avatarData,pushImg}
