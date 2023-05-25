import {RiUser3Fill} from "react-icons/ri"
import {GoKey} from "react-icons/go"
import Footer from "../components/Footer"
import React,{useState} from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"
export default function Register(){
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [confPassword,setConfPassword]=useState("")
  const navigate=useNavigate()
  const [err,setErr]=useState("")
  const handleSubmit=async(e)=>{
    e.preventDefault()
    try{
      await axios.post("http://localhost:3000/user",{
        name,
        email,
        password,
        confirmpassword:confPassword
      }
      )
      navigate("/login")
    }catch(err){
      if(err.response){
        setErr(err.response.data.msg)
      }
    }
  }
  return (
    <div className="bg bg-gradient-to-bl from-[#01343c] via-[#12131e] to-[#12131e] text-white w-screen h-screen flex items-center justify-center font-popin box-content">
     <form onSubmit={handleSubmit} className="h-[60%] w-[75%] bg-white/10 backdrop-blur-xl border-[.3px] border-white/20 rounded flex flex-col items-center py-3">
        <h1 className="text-3xl">Register</h1>
     {
       err ? <p className="text-[.7em] text-white font-inter mt-3 text-red-400">{err}</p> : null
     }
        <div className="w-[100%] mt-8 flex flex-col items-center font-inter text-[.9em]">
          <div className="w-[85%] relative flex items-center justify-center h-16">
             <input type="teks" placeholder="your name" className="w-[100%] h-8 bg-transparent border-b-[.8px] outline-none border-sky-500 pl-5 focus:border-sky-400 focus:border-b-[1px] transition-all ease-in duration-150 peer/onfocus focus:pl-0 caret-sky-400 tracking-wide" onChange={({target})=>setName(target.value)} required/>
           <span className="absolute transition-all ease-in duration-150 top-[26px] left-0 peer-focus/onfocus:top-1 peer-focus/onfocus:text-white/50 text-[1.1em]"><RiUser3Fill/></span>
          </div>
        <div className="w-[85%] relative flex items-center justify-center h-16">
           <input type="email" placeholder="your email" className="w-[100%] h-8 bg-transparent border-b-[.8px] outline-none border-sky-500 pl-5 focus:border-sky-400 focus:border-b-[1px] transition-all ease-in duration-150 peer/onfocus focus:pl-0 caret-sky-400 tracking-wide" onChange={({target})=>setEmail(target.value)} required/>
           <span className="absolute transition-all ease-in duration-150 top-[26px] left-0 peer-focus/onfocus:top-1 peer-focus/onfocus:text-white/50 text-[1.1em]"><RiUser3Fill/></span>
          </div>
        <div className="w-[85%] relative flex items-center justify-center h-16">
      
          <input type="password" placeholder="your password" className="w-[100%] h-8 bg-transparent border-b-[.8px] outline-none border-sky-500 pl-5 focus:border-sky-400 focus:border-b-[1px] transition-all ease-in duration-150 peer/onfocus focus:pl-0 caret-sky-400 tracking-wide" onChange={({target})=>setPassword(target.value)} required/>
        <span className="absolute transition-all ease-in duration-150 top-[26px] left-0 peer-focus/onfocus:top-1 peer-focus/onfocus:text-white/50 text-[1.1em]"><GoKey/></span>
          </div>
          <div className="w-[85%] relative flex items-center justify-center h-16">
           <input type="password" placeholder="confirmasi password" className="w-[100%] h-8 bg-transparent border-b-[.8px] outline-none border-sky-500 pl-5 focus:border-sky-400 focus:border-b-[1px] transition-all ease-in duration-150 peer/onfocus focus:pl-0 caret-sky-400 tracking-wide" onChange={({target})=>setConfPassword(target.value)} required/>
           <span className="absolute transition-all ease-in duration-150 top-[26px] left-0 peer-focus/onfocus:top-1 peer-focus/onfocus:text-white/50 text-[1.1em]"><GoKey/></span>
          </div>
        </div>
        <button type="submit" className="w-[55%] h-8 bg-sky-500 text-center rounded font-inter font-semibold mt-5">Login</button>
        <Footer haveAcount={true}/>
     </form>
    </div>
    )
}