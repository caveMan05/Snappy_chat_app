require("dotenv").config()
const express=require("express")
const socket=require("socket.io")
const cors=require("cors")
const connectDB=require("./utilities/db")
const errorMiddleWare=require("./Middleware/errorMiddleWare")

const port=process.env.PORT

const app=express()
const http=require("http")
const { currentUserData } = require("./Controller/userController")
const server=http.createServer(app)
const corsOptions={
  origin:"http://localhost:5173",
  methods:"GET,PUT,POST,PATCH,DELETE",
  credentials:true
}
app.use(cors(corsOptions))
app.use(express.json())


app.use("/api",require("./Router/userRouter"))
app.use("/api",require("./Router/avatarRoute"))
app.use("/api",require("./Router/messagesRoute"))
app.use(errorMiddleWare)

connectDB().then(()=>{
  server.listen(port,()=>{
    console.log(`server connected on port :${port}`)
})
})

const io= socket(server,{cors:corsOptions})

io.on("connection",(socket)=>{
})






