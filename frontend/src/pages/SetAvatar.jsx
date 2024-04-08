import styled from "styled-components"
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify"
import load from "../assets/loader.gif"
import { AuthContext } from "../store/contextApi";
import {useNavigate} from "react-router-dom"



function SetAvatar() {
  const navigate=useNavigate()
  const [avatars, setAvatars] = useState([])
  const [selectedAvatar, setSelectedAvatar] = useState()
  const [loading, setLoading] = useState(true)
  const {token,isLoggedIn}=useContext(AuthContext)

  useEffect(()=>{
    if(!isLoggedIn){
      navigate("/login")
    }
  },[])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/api/avatar", {
        method: "GET"
      })
      const res_data = await response.json()
      setAvatars(res_data)
      setLoading(false)
    }
    fetchData();
  })
  
  const setProfilePicture = async() => {
    if (selectedAvatar === undefined) {
      toast.error("Please Select an Avatar")
    }
    //console.log(selectedAvatar)
    else{
      try{
      //console.log(token)
      const avatarImage=selectedAvatar
      const setImage={avatarImage}
      //console.log(setImage)
      const response=await fetch("http://localhost:5000/api/user/setavatar",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        },
        body:JSON.stringify(setImage)
      })
      const res_data=await response.json()
      if(response.ok){
        toast.success(res_data.message)
        navigate("/login")
      }
      else{
        toast.error(res_data.message)
      }

      }catch(error){
        console.log("avatar setting error",error)
      }
    }
    }

    
    if(loading){
      return(
        <Container>
          <img src={load} alt="loader" className="loader"></img>
        </Container>
      )
    }
  
    return (
      <>
        <Container>
          <div className="title-container">
            <h1>
              Pick an avatar as your profile picture
            </h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar) => {
              return (
                <div key={avatar.img}
                  className={`avatar ${selectedAvatar === avatar.img ? "selected" : ""}`}
                  onClick={() => setSelectedAvatar(avatar.img)}
                >
  
                  <img src={avatar.img} alt="avatar" />
                </div>
              )
            })}
          </div>
          <button className="submit-btn" onClick={setProfilePicture}>Set as Profile Picture</button>
  
        </Container>
      </>
    )
  }
  const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 3rem;
    background-color: #131324;
    height: 100vh;
    width: 100vw;
  
    .loader {
      max-inline-size: 100%;
    }
  
    .title-container {
      h1 {
        color: white;
      }
    }
    .avatars {
      display: flex;
      gap: 2rem;
  
      .avatar {
        border: 0.4rem solid transparent;
        padding: 0.4rem;
        border-radius: 5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.5s ease-in-out;
        img {
          height: 6rem;
          transition: 0.5s ease-in-out;
        }
      }
      .selected {
        border: 0.4rem solid #4e0eff;
      }
    }
    .submit-btn {
      background-color: #4e0eff;
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      &:hover {
        background-color: #4e0eff;
      }
    }
  `;
  export default SetAvatar
    


  
 