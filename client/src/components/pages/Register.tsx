/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */

import { Icon } from "@iconify/react";
import { NavBar } from "../NavBar";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../utility/userDataSlice";
import { baseURL } from "@/App";

let emptyForm = {
  username: "",
  password: "",
  email: "",
};




const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let [form, setForm] = useState(emptyForm);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await axios.post(baseURL + "/auth/register", form);
      const token = response.data.token;

      console.log(token);

      if (!token) {
        setForm(emptyForm);
        return;
      }

      localStorage.setItem("token", token);

      const userResponse = await axios.get(baseURL + "/api/users", {
        headers: {
          Authorization: token,
        },
      });

      dispatch(setUserData(userResponse.data))

      navigate("/");
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };
  return (
    <div>
  <NavBar />
  <div className="w-screen h-screen flex justify-center items-center">
    <form onSubmit={handleSubmit} className="w-full max-w-md p-6 bg-white shadow-2xl rounded-lg">
      <div className="flex justify-center items-center mb-6">
        <Icon className="text-7xl text-black" icon="material-symbols:assignment-ind-sharp" />
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

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={handleChange}
          value={form.email}
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

      <div className="flex items-center justify-between">
        <button className="bg-slate-800 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Submit
        </button>
      </div>
    </form>
  </div>
</div>

  );
};

export default Register;
