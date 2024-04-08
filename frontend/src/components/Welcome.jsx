import styled from "styled-components";
import { AuthContext } from "../store/contextApi";
import { useContext } from "react";
import Robot from "../assets/robot.gif"
function Welcome() {
  const { currentUsername } = useContext(AuthContext)
  return (
    
      <Container>
        <img src={Robot} alt="" />
        <h1>
          Welcome, <span>{currentUsername}!</span>
        </h1>
        <h3>Please select a chat to Start messaging.</h3>
      </Container>
    
  )
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;
export default Welcome