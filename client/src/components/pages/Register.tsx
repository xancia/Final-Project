/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */

import { Icon } from "@iconify/react";
import { NavBar } from "../NavBar";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

let emptyForm = {
  username: "",
  password: "",
  email: "",
};



const Register = ({ setUser }) => {
  const navigate = useNavigate();

  let [form, setForm] = useState(emptyForm);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/auth/register", form);
      const token = response.data.token;

      console.log(token);

      if (!token) {
        setForm(emptyForm);
        return;
      }

      localStorage.setItem("token", token);

      const userResponse = await axios.get("http://localhost:8080/api/users", {
        headers: {
          Authorization: token,
        },
      });

      setUser(userResponse.data);

      navigate("/profile");
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };
  return (
    <div>
      <NavBar />
      <div className="w-screen h-screen flex justify-center items-center rounded-x1  border-opacity-10">
        <form onSubmit={handleSubmit}>
          <div className="w-96 p-6 shadow-2xl px-12">
            <div className="w-full h-full flex justify-center items-center p-4">
              <Icon
                className="text-7xl"
                icon="material-symbols:assignment-ind-sharp"
              />
            </div>
            <label htmlFor="username">Username:</label>
            <br />
            <input
              type="text"
              id="username"
              name="username"
              onChange={handleChange}
              value={form.username}
              className="border-2 rounded-md w-full"
            />
            <br />
            <br />
            <label htmlFor="email">Email:</label>
            <br />
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              value={form.email}
              className="border-2 rounded-md w-full"
            />
            <br />
            <br />
            <label htmlFor="password">Password:</label>
            <br />
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              value={form.password}
              className="border-2 rounded-md w-full"
            />
            <br />
            <br />
            <button className = ' w-40 border-2 rounded-md'>Submit</button>
            <br /> <br />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
