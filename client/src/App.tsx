
import { Routes, Route } from "react-router-dom"
import Home from "./components/pages/Home"
import Register from "./components/pages/Register"
import axios from "axios";
import { useState, useEffect } from "react";
import Login from "./components/pages/Login";

function App() {
  const [user, setUser] = useState({})
  async function getUser(token: string) {
    try {
        const response = await axios.get('/api/users', {
            headers: {
                Authorization: token
            }
        })

        setUser(response.data)
    } catch (error) {
        console.log(error)
        localStorage.removeItem('token')
    }
}

useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
        getUser(token)
    } 
}, [])


  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={null} />
        <Route path="/schedule" element={null} />
        <Route path="/login" element={<Login setUser={setUser}/>} />
        <Route path="/anime/:id" element={null} />
        <Route path="/register" element={<Register setUser={setUser}/>} />
      </Routes>
    </>
  )
}

export default App
