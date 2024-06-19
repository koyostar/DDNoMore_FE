import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import LoginTabs from "../components/LoginTabs";

export default function Login() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const loginUser = async (e) => {
    e.preventDefault();
    const { username, password } = userData;
    try {
      const response = await axios.post("/login", {
        username,
        password,
      });

      const data = response.data;

      if (data.error) {
        toast.error(data.error);
      } else {
        setUserData({
          username: "",
          password: "",
        });
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
      <LoginTabs />
      <div className="form-container m-4">
        <form onSubmit={loginUser}>
          <label>Username: </label>
          <input
            type="text"
            placeholder="Enter username"
            value={userData.username}
            onChange={(e) =>
              setUserData({ ...userData, username: e.target.value })
            }
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
    </div>
  );
}
