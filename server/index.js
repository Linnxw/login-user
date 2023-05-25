import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import db from "./config/Database.js"
import userRouter from "./router/userRouter.js"
const app=express()

dotenv.config()
try{
  await db.authenticate()
  console.log("db conected")
}catch(err){
  console.log(err.message)
}
app.use(cors(
  {
    credentials:true,
    origin:'http://localhost:5173'
  }
  ))
app.use(cookieParser())
app.use(express.json())
app.use(userRouter)
app.listen(3000,()=>{
  console.log("server runing")
})