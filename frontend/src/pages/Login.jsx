import { useState,useContext } from "react";
import { Link,useNavigate } from "react-router-dom";
import styled from "styled-components"
import Logo from "../assets/logo.svg"
import { toast } from "react-toastify"
import { AuthContext } from "../store/contextApi";
function Login() {
  const navigate=useNavigate()
  const {storeTokenInLs}=useContext(AuthContext)
  const [info, setInfo] = useState({
    username: "",
    password: ""
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
      const response=await fetch("http://localhost:5000/api/user/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(info)
    })
    const res_data=await response.json()
    //console.log(res_data)
    if(response.ok){
      toast.success(res_data.message)
      storeTokenInLs(res_data.token)
      navigate("/")
    }
    else{
      toast.error(res_data.message)
    }
  }catch(error){
    console.log("logging in error",error)
  }
  }
  return (
    <>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h1>snappy</h1>
          </div>
          <input type="text" name="username" placeholder="username" required onChange={handleChange} autoComplete="off" ></input>

          <input type="password" name="password" placeholder="Password" required onChange={handleChange} autoComplete="off" ></input>

          <button type="submit"> Login</button>
          <span>Don't have an Account  ? <Link to="/register">Register</Link></span>

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
export default Login