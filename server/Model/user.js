const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const userSchema=mongoose.Schema({
  username:{
    type:String,
    require:true
  },
  email:{
    type:String,
    require:true
  },
  password:{
    type:String,
    require:true
  },
  isAvatarImageSet:{
    type:Boolean,
    default:false
  },
  avatarImage:{
    type:String,
    default:""
  },

  isAdmin:{
    type:Boolean,
    default:false
  }
})

//hashing password

userSchema.pre("save",async function(next){
  if(!this.isModified("password")){
    next()
  }
  try{
    const saltRound=await bcrypt.genSalt(10)
    const hashPassword=await bcrypt.hash(this.password,saltRound)
    this.password=hashPassword


  }catch(error){
    console.log("password hashing error")
  }
})
//comparing password

userSchema.methods.comparePassword=async function(password){
  return bcrypt.compare(password,this.password)
}

//generating token
userSchema.methods.genToken=async function(){
  try{
    return jwt.sign({
      username:this.username,
      email:this.email,
      userId:this._id.toString(),
      avatarImage:this.isAvatarImageSet
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn:"1d"
    }
    )

  }catch(error){
    console.log("token generation error",error)
  }
}

const User=new mongoose.model("user",userSchema)

module.exports=User