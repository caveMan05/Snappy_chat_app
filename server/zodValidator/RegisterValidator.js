const z=require("zod")
const registerSchema=z.object({
  username:z
  .string({required_error:"Name is required"})
  .trim()
  .min(3,{message:"Name too short"})
  .max(30,{message:"Name too long"}),
  email:z
  .string({required_error:"Email is Required"})
  .email()
  .trim(),
  password:z
  .string({required_error:"Password is required "})
  .trim()
  .min(3,{message:"Password too weak"})
  .max(255,{message:"Password is too long"}),
  cPassword:z
  .string({required_error:"Password does not match"})
  .trim()
  


  
})

module.exports=registerSchema