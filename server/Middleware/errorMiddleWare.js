const errorMiddleWare=(err,req,res,next)=>{
  const status=err.status||"500"
  const errMessage=err.message||"server Error"
  //console.log(status,errMessage)
  res.status(status).json({message:errMessage})
  
}
module.exports=errorMiddleWare