const Messages=require('../Model/messagesModel')

const getMessages=async(req,res)=>{
  try{
    const {from ,to }=req.body
    const message=await Messages.find({
      users:{
        $all:[from,to]
      }
    }).sort({updatedAt:1})
    if(!message){
      return res.status(404).json({message:"no messages"})
    }
    else{
      const projectedMessages=message.map((item)=>{
        return{
          fromSelf:item.sender,
          msg:item.message.text
        }

      })
  
      return res.status(200).json(projectedMessages)
  }
    
    

  }catch(error){
    console.log("get message error")
  }
}


const addMessages=async(req,res)=>{
  try{
    const {from,to,message}=req.body
    const data=await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from
    
    })
    if(data){
      return res.status(200).json({message:"message sended "})
    }
    else{
      return res.status(404).json({message:"no msg send"})
    }

  }catch(error){
    console.log("add message  error",error)
  }
}


module.exports={getMessages,addMessages}