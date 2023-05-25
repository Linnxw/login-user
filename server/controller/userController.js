import User from "../models/userModels.js"
import jwt from "jsonwebtoken"
export const getUser=async(req,res)=>{
  try{
    const user=await User.findAll({
      attributes:['id','name','email']
    })
    res.status(200).json(user)
  }catch(err){
    console.log(err)
    res.status(500).json({msg:err.message})
  }
}

export const register=async(req,res)=>{
  const {name,email,password,confirmpassword}=req.body
  if(password !== confirmpassword)return res.status(400).json({msg:"passwors dan confirm password harus sama"})
  try{
    await User.create({
      name:name,
      email:email,
      password:password
    })
    res.status(200).json({msg:"register berhasil"})
  }catch(err){
    console.log(err)
    res.status(500).json({msg:err.message})
  }
}

export const login=async(req,res)=>{
  
  try{
    const user=await User.findAll({
      where:{
        email:req.body.email
      }
    })
    if(!user[0]) return res.status(404).json({msg:"user tidak terdaftar"})
    const userId=user[0].id
    const name=user[0].name
    const email=user[0].email
    const password=user[0].password
    
    if(req.body.password != password)return res.status(400).json({msg:"password salah"})
    const accesToken=jwt.sign({userId,name,email},process.env.ACCES_TOKEN_SECRET,{
      expiresIn:'20s'
    })
    const refreshToken=jwt.sign({userId,name,email},process.env.REFRESH_TOKEN_SECRET,{
      expiresIn:'1d'
    })
    User.update({refresh_token:refreshToken},{
      where:{
        id:userId
      }
    })
    res.cookie("token",refreshToken,{
      maxAge:24 * 60 * 60 * 1000,
      httpOnly:true
    })
    
    res.json({accesToken})
  }catch(err){
  console.log(err)
  res.status(404).json({msg:err.message})
  }
}

export const logout=async(req,res)=>{
  const refreshToken=req.cookies.token
  if(!refreshToken)return res.sendStatus(401)
  const user = await User.findOne({
    where:{
      refresh_token:refreshToken
    }
  })
  if(!user) res.sendStatus(204)
  const userId=user.id
  await User.update({refresh_token:null},{
    where:{
      id:userId
    }
  })
  res.clearCookie('token')
  return res.sendStatus(200)
}