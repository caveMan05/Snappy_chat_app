import { createContext,useState,useEffect } from "react";

export const AuthContext=createContext({})

const AuthContextProvider=({children})=>{
  const[token,setToken]=useState(localStorage.getItem("token"))
  const [currentUsername, setCurrentUsername] = useState(undefined)
  const [currentUserImage, setCurrentUserImage] = useState(undefined)
  const [currentuserId,setCurrentUserId]=useState(undefined)
  //const[token,setToken]=useState()

  const storeTokenInLs=(loginToken)=>{
    setToken(loginToken)
    localStorage.setItem("token",loginToken)
    localStorage.removeItem("jwt_webmarker")
  }

  let isLoggedIn=!!token

  const logoutUser=()=>{
    setToken("");
    localStorage.removeItem("token")
    localStorage.removeItem("jwt_webmarker")
  }


  //current user details
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/api/auth/currentuser", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }

      })
      const res_data = await response.json()
      //console.log(res_data)
      setCurrentUsername(res_data.username)
      setCurrentUserImage(res_data.image)
      setCurrentUserId(res_data.id.toString())
    }
    fetchData()
  }, [token])



  return(
    <AuthContext.Provider value={{token,storeTokenInLs,isLoggedIn,currentUsername,currentUserImage,logoutUser,currentuserId}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider