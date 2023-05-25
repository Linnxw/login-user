import {getUser,register,login,logout} from "../controller/userController.js"
import {refreshToken} from "../controller/refreshToken.js"
import {verifyToken} from "../middleware/VerifyToken.js"
import express from "express"
const userRouter=express.Router()
userRouter.get("/user",verifyToken,getUser)
userRouter.post("/user",register)
userRouter.post("/login",login)
userRouter.delete("/logout",logout)
userRouter.get("/token",refreshToken)
export default userRouter