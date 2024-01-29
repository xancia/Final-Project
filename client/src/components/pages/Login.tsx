/* eslint-disable @typescript-eslint/no-explicit-any */

import { Icon } from "@iconify/react"
import { NavBar } from "../NavBar";
import axios from 'axios'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userType } from "@/vite-env";


const emptyForm = { 
    username: '',
    password: ''
}

interface RegisterProps {
    setUser: React.Dispatch<React.SetStateAction<userType>>;
}


const Login: React.FC<RegisterProps> = ({setUser}) => {
    const navigate = useNavigate()

    const [form, setForm] = useState(emptyForm)

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        try {

            const response = await axios.post('http://localhost:8080/auth/login', form)
            const token = response.data.token

            console.log(token)

            if (!token) {
                setForm(emptyForm)
                return
            } 

            localStorage.setItem("token", token)

            const userResponse = await axios.get('http://localhost:8080/api/users', { 
                headers: {
                    Authorization: token
                }
            })

            setUser(userResponse.data)
    
            navigate('/')

        } catch(err) {
            console.log(err)
            alert('Wrong Username or Password')
        }
    }

    
    return (
        <div>
      <NavBar />
      <div className="w-screen h-screen flex justify-center items-center">
        <form onSubmit={handleSubmit} className="w-full max-w-md p-6 bg-white shadow-2xl rounded-lg">
          
          <div className="flex justify-center items-center mb-6">
            <Icon className="text-7xl text-black" icon="streamline:interface-login-password-lock-login-padlock-password-secure-security-textbox-type"/>
          </div>
          
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
              Username:
            </label>
            <input 
              type="text" 
              id="username"
              name="username"
              onChange={handleChange}
              value={form.username}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password:
            </label>
            <input 
              type="password" 
              id="password"
              name="password"
              onChange={handleChange}
              value={form.password}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="flex items-center justify-center">
            <button className="bg-slate-800 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Log In
            </button>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account? 
              <Link to="/register" className="text-blue-500 hover:text-blue-700 ml-1">
                Register now
              </Link>
            </p>
          </div>

        </form>
      </div>
    </div>
  
    )
  }
  export default Login