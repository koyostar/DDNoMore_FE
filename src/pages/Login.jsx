import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = userData;
    console.log(userData);
    try {
      const response = await axios.post("/login", {
        email,
        password,
      });

      const data = response.data;

      if (data.error) {
        toast.error(data.error);
      } else {
        setUserData({});
        toast.success("Login Successful. Welcome!");
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div>
      <form onSubmit={loginUser}>
        <label>Email: </label>
        <input
          type="email"
          placeholder="Enter email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        ></input>
        <br />
        <label>Password: </label>
        <input
          type="password"
          placeholder="Enter password"
          value={userData.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
        ></input>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
