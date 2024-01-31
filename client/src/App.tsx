/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */

import { Routes, Route } from "react-router-dom"
import Home from "./components/pages/Home"
import Register from "./components/pages/Register"
import axios from "axios";
import { useEffect } from "react";
import Login from "./components/pages/Login";
import { useDispatch } from "react-redux";
import { setUserData } from "./components/utility/userDataSlice";
import Library from "./components/pages/Library";
import AnimePage from "./components/pages/AnimePage";

export const baseURL = import.meta.env.VITE_URL


function App() {
  const dispatch = useDispatch();

  async function getUser(token: string) {
    try {
        const response = await axios.get(baseURL + '/api/users', {
            headers: {
                Authorization: token
            }
        })

        dispatch(setUserData(response.data))
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
        <Route path="/login" element={<Login />} />
        <Route path="/anime/:id" element={<AnimePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/library" element={<Library />} />
      </Routes>
    </>
  )
}

export default App
