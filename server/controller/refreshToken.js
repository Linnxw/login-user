import User from "../models/userModels.js"
import jwt from "jsonwebtoken"
export const refreshToken=async(req,res)=>{
  try{
const token=req.cookies.token
console.log({cookie:token})
    if(!token) return res.sendStatus(401)
    const user=await User.findAll({
      where:{
        refresh_token:token
      }
     })
     
    if(!user[0]) return res.sendStatus(403)
      console.log(user[0].name)
      jwt.verify(token,process.env.REFRESH_TOKEN_SECRET,(err,decoded)=>{
        if(err)return res.sendStatus(403)
        const userId=user[0].id
        const name=user[0].name
        const email=user[0].email
        const accesToken=jwt.sign({userId,name,email},process.env.ACCES_TOKEN_SECRET,{
        expiresIn:'15s'
        })
         res.json({accesToken})
      })

  }catch(err){
    console.log(err.message)
  }
}