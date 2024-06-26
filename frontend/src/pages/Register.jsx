import { useState } from "react";
import {  Link,useNavigate } from "react-router-dom";
import styled from "styled-components"
import Logo from "../assets/logo.svg"
import {toast} from "react-toastify"
function Register(){
  const navigate=useNavigate()
  const[info,setInfo]=useState({
    username:"",
    email:"",
    password:"",
    cPassword:""
  })
  const handleChange=(event)=>{
    setInfo({
      ...info,
      [event.target.name]:event.target.value
    })
  }

  const handleSubmit=async(event)=>{
    event.preventDefault()
    try{
      const response=await fetch("http://localhost:5000/api/user/register",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(info)
      })
      const res_data=await response.json()
      if(response.ok){
        
        //console.log(res_data.message)
        toast.success(res_data.message)
        navigate("/login")
      }
      else{
        //console.log(res_data.message)
        toast.error(res_data.message)
      }

    }catch(error){
      console.log("frontend registration error")
    }
  }

  return(
    <>
     <FormContainer>
      <form onSubmit={handleSubmit}>
        <div className="brand">
          <img src= {Logo}alt="Logo"/>
          <h1>snappy</h1>
        </div>
        <input type="text" name="username" placeholder="username"  required onChange={handleChange} ></input>
        <input type="email" name="email" placeholder="Email" required onChange={handleChange} ></input>
        <input type="password" name="password" placeholder="Password" required onChange={handleChange} ></input>
        <input type="password" name="cPassword" placeholder="Confirm Password" required onChange={handleChange} ></input>
        <button type="submit"> Create User</button>
        <span>Already a user <Link to="/login">Login</Link></span>

      </form>
     </FormContainer>
     
    </>
  )
}
const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
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
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
export default Register