const jwt=require("jsonwebtoken")
const authUserMiddlewware=async(req,res,next)=>{
  try{
    const token=req.header("Authorization")
    if(!token){
      return res.status(404).json({message:"No Token found "}) 
    }
    const jwtToken=token.replace("Bearer","").trim()
    const verifyToken=jwt.verify(jwtToken,process.env.JWT_SECRET_KEY)
    req.user=verifyToken.userId
    req.image=verifyToken.avatarImage
    
    
   
    next()
  }catch(error){
    console.log("unauthorized http request")
  }
}
module.exports=authUserMiddlewware