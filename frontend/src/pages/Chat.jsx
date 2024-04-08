import styled from "styled-components"
import { useContext, useEffect, useState,useRef } from "react"
import { AuthContext } from "../store/contextApi"
import { useNavigate } from "react-router-dom"
import Contacts from "../components/Contacts"
import Welcome from "../components/Welcome"
import ChatContainer from "../components/ChatContainer"
import loader from "../assets/loader.gif"
import {io} from "socket.io-client"
function Chat(){
  const socket=useRef()
  const {token,isLoggedIn,currentuserId}=useContext(AuthContext)
  const[contacts,setContacts]=useState([])
  const[isloading,setLoading]=useState(true)
  const[currentChat,setCurrentChat]=useState(undefined)
  const navigate=useNavigate()
  useEffect(()=>{
    if(!isLoggedIn){
      
      navigate("/login")
    }
  })

  useEffect(()=>{
    //let host="http://localhost:500"
    if(currentuserId){
      socket.current=io("http://localhost:5000");
      socket.current.emit("add-user",currentuserId)

    }

  },[currentuserId])

  useEffect(()=>{
   
    const fetchData=async()=>{
      const response=await fetch("http://localhost:5000/api/auth/allusers",{
        method:"GET",
        headers:{
          "Authorization":`Bearer ${token}`
        }
      })
      const res_data=await response.json()
      
      if(response.ok){
        setLoading(false)
        setContacts(res_data)
      }
      else{
        navigate("/setavatar")
      }
          
    }
    fetchData()
  },[token])

  const handleChangeChat=(index,contact)=>{
    //console.log(contact)
    setCurrentChat(contact)
  }
  if(isloading && contacts){
    return(
      <>
        <Container>
          <img src={loader} alt="loader"/>
        </Container>
      </>
    )
  }
  
  return(
    <>
      <Container>
        <div className="container">
          <Contacts contacts={contacts} changeChat={handleChangeChat}></Contacts>
          {currentChat===undefined?<Welcome/>:<ChatContainer currentChat={currentChat} socket={socket} />}
          
        </div>
      </Container>
    </>
  )
}
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
export default Chat