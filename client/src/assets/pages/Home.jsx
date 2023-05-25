import React,{useState,useEffect} from "react"
import {useNavigate} from "react-router-dom"
import Header from "../components/Header"
import axios from "axios"
import jwt_decode from "jwt-decode"
export default function Home(){
  const [name,setName]=useState("")
  const [token,setToken]=useState("")
  const [expired,setExpired]=useState("")
  const [user,setUser]=useState([])
  const navigate=useNavigate()
  
  const refreshToken=async()=>{
    try{
    const response=await axios.get("http://localhost:3000/token",{withCredentials:true})
    setToken(response.data.accesToken)
    const decoded=jwt_decode(response.data.accesToken)
   setExpired(decoded.exp)
    setName(decoded.name)
    }catch(err){
      console.log(err)
      if(err.response){
        navigate("/login")
      }
    }
  }
  
  useEffect(()=>{
    refreshToken()
  },[])
  const axiosJWT=axios.create()
  axiosJWT.interceptors.request.use(async(config)=>{
    const currentDate=new Date()
    if(expired * 1000 < currentDate.getTime()){
      const response=await axios.get("http://localhost:3000/token",{withCredentials:true})
      config.headers.Authorization =`Bearer ${response.data.accesToken}`
      setToken(response.data.accesToken)
      const decoded=jwt_decode(response.data.accesToken)
      setName(decoded.name)
      setExpired(decoded.exp)
    }
    return config
  },(error)=>{
    return Promise.reject(error)
  })
  
  const getUser=async()=>{
      const response=await axiosJWT.get("http://localhost:3000/user",{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      setUser(response.data)
  }
  
  const handleEvent=()=>{
      console.log(token)
      console.log(expired)
  }
  
  return (
    <>
    <div className="bg-[#12131e] text-white w-screen h-screen">
    <Header name={name} event={handleEvent}/>
  <p> welcome back {name ? name : ",silahkan login terlebih dahulu"}</p>
  <button onClick={getUser}>Get user</button>
  {
    user?.map((m,i)=>{
      return <p key={i}>{m.name}</p>
    })
  }
   </div>
    </>
   )
}