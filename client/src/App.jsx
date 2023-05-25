import { Routes,Route } from 'react-router-dom'
import Home from "./assets/pages/Home"
import Login from "./assets/pages/Login"
import Register from "./assets/pages/Register"
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
    </Routes>
  )
}

export default App
