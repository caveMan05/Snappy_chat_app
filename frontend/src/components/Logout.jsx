import styled from "styled-components"
import { BiPowerOff } from "react-icons/bi";
import { AuthContext } from "../store/contextApi";
import { useContext } from "react";
function Logout(){
  const{logoutUser}=useContext(AuthContext)
  const handleClick=()=>{
    //console.log("logout")
    logoutUser()
  }
  return(
    <>
      <Button onClick={handleClick}>
        <BiPowerOff/>
      </Button>
    </>
  )
}
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;
export default Logout