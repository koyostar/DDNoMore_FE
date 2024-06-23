import React, { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import LoginTabs from "../components/LoginTabs";
import { UserContext } from "../utilities/user";

export default function Login() {
  const navigate = useNavigate();
  const { setUser, closeSidebar } = useContext(UserContext);

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
        setUser(data);
        closeSidebar();
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
    <div className="container font-bold bg-lightsec mx-auto max-w-md p-4 rounded-2xl">
      <LoginTabs />
      <div className="form-container m-4">
        <form onSubmit={loginUser}>
          <label>Username: </label>
          <input
            className="m-4"
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
            className="m-4"
            type="password"
            placeholder="Enter password"
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          ></input>
          <br />
          <button
            className="bg-lightacc text-darksec text-center my-4 mx-2 px-4 py-2 rounded"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
