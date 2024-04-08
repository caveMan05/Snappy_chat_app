const User=require("../Model/user")

//Registration 

const register=async(req,res)=>{
  try{
    const {username,email,password,cPassword}=req.body
    if(password != cPassword){
      res.status(404).json({message:"password does not match"})
    }
    const userNameExist=await User.findOne({username})
    if(userNameExist){
      return res.status(404).json({message:"Try another username"})
    }
    const emailExist=await User.findOne({email})
    if(emailExist){
      return res.status(404).json({message:"Email already exist"})
    }
    const createUser=await User.create({username,email,password})
    return res.status(200).json({message:"User created"})

    

  }catch(error){
    console.log("backend registration error")
  }
}

//LOGIN

const login=async(req,res)=>{
  try{
    const {username,password}=req.body
    const checkUser=await User.findOne({username})
    if(!checkUser){
      return res.status(404).json({message:"invalid credentials"})
    }
    //console.log(checkUser)
    const verifyPassword=await checkUser.comparePassword(password)
    //console.log(verifyPassword)
    if(!verifyPassword){
      return res.status(404).json({message:"invalid credentials"})
    }
    res.status(200).json({message:"logged in",token:await checkUser.genToken(),userId:checkUser._id.toString()})

  }catch(error){
    console.log("login error",error)
  }
}

//set  profile picture

const setProfilePicture=async(req,res)=>{
  try{
    const id=req.user
    const updateData=req.body
    
    const updateUser=await User.updateOne({_id:id},{
      isAvatarImageSet:true,
      $set:updateData
    })
    //console.log(updateUser.modifiedCount)
    if(updateUser.modifiedCount!=0){
      res.status(200).json({message:"Avatar set"})
    }
    else{
      return res.status(404).json({message:"Try again "})
    }
    


  }catch(error){
    console.log("set picture error")
  }
}


//all user data
const getAllUsers=async(req,res)=>{
  
  try{
    const id=req.user;
    const image=req.image
    if(!image){
      res.status(404).json({message:"no avatar image"})
    }
    else{
      const allUsers=await User.find({_id:{$ne:id} }).select("-password -isAvatarImageSet -isAdmin" ) // to show all users except the logged in 
      res.status(200).json(allUsers)
    }
  }catch(error){
    console.log("all users error",error)

}
}

//current userData
const currentUserData=async(req,res)=>{
  try{
  const id=req.user
  
  const userExist=await User.findOne({_id:id})
  if(!userExist){
    return res.status(404).json({message:"no user found"})
  }
  res.status(200).json({username:userExist.username,image:userExist.avatarImage,id:userExist._id.toString()})
}catch(error){
  console.log("error in singleuserDATA")
}

}



module.exports={register,login,setProfilePicture,getAllUsers,currentUserData}