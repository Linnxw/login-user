import axios from "axios"
import {useNavigate} from "react-router-dom"
export default function Header({name}){
  const navigate=useNavigate()
  const handleLogout=async()=>{
    try{
      await axios.delete("http://localhost:3000/logout",{withCredentials:true})
      navigate("/login")
    }catch(err){
      console.log(err)
    }
  }
  return (
    <div className="sticky top-0 w-screen h-16 bg-white/30 backdrop-blur-sm flex items-center px-2 justify-between">
     <div>
      <h1 className="font-popin text-2xl text-sky-400">Dashboard</h1>
     </div>
     <div onClick={handleLogout} className="font-inter text-sky-400">{name ? "logout" : "login"}</div>
    </div>
    )
}