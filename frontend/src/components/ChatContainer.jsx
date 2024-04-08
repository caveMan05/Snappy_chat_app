import styled from "styled-components";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../store/contextApi";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
function ChatContainer({currentChat,socket}) {
  const{currentUsername,currentuserId}=useContext(AuthContext)
  const [messages,setMessages]=useState([])
  const [arrivalMessage,setArrivalMessage]=useState(null)
  const scrollRef=useRef()


  useEffect(()=>{
    const fetchData=async()=>{
      const data={from:currentUsername.toString(),to:currentChat.username.toString()}
      const resposne=await fetch("http://localhost:5000/api/msg/getmsg",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
      })
      const res_data=await resposne.json()
      setMessages(res_data)
      //console.log(res_data)
    }
    fetchData()
  },[messages])

  const handleSendMsg=async(msg)=>{

    const data={from:currentUsername.toString(),to:currentChat.username.toString(),message:msg.toString()}
    //console.log(data)
   const response=await fetch("http://localhost:5000/api/msg/addmsg",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
   })
   const res_data=await response.json()
   //console.log(res_data)
   socket.current.emit("send-msg",{
    to:currentChat._id.toString(),
    from:currentuserId.toString(),
    message:msg.toString()
   })
   const msgs=[...messages];
   msgs.push({fromSelf:true,msg:msg})
   setMessages(msgs)
  }

  useEffect(()=>{
    if(socket.current){
      socket.current.on("msg-recieve",(msg)=>{
        setArrivalMessage({fromSelf:false,msg:msg})
      })
    }
  },[])

  useEffect(()=>{
    arrivalMessage && setMessages((prev)=>{
      [...prev,arrivalMessage]
    })
  },[arrivalMessage])

  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behaviour:"smooth"})
  },[messages])
  
  
  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={currentChat.avatarImage}
              alt="avatar"
            />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <Logout/>
        </div>
        <div className="chat-messages">
          {
            messages.map((msg,index)=>{
              return(
                <div key={index}>
                    <div className={`message ${(msg.fromSelf == currentUsername) ? "sended":"recieved"}`} >
                      <div className="content">
                        <p>{msg.msg}</p>
                      </div>
                    </div>
                </div>
              )
            })
          }
        </div>
        <ChatInput handleSendMsg={handleSendMsg}/>
    </Container>
  )
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;
export default ChatContainer