import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import LoginTabs from "../components/LoginTabs";

export default function Register() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const registerUser = async (e) => {
    e.preventDefault();

    const { name, username, email, password } = userData;
    try {
      const response = await axios.post("/register", {
        name,
        username,
        email,
        password,
      });
      if (response.status === 201) {
        setUserData({});
        toast.success("Registration Successful. Welcome!");
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
      console.error("Error:", error);
    }
  };

  return (
    <div className="container font-bold bg-lightsec mx-auto max-w-md p-4 rounded-2xl">
      <LoginTabs />
      <div className="form-container m-4">
        <form onSubmit={registerUser}>
          <label>Name: </label>
          <input
            className="m-4 "
            type="text"
            placeholder="Enter name"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          ></input>
          <br />
          <label>Username: </label>
          <input
            className="m-4 "
            type="text"
            placeholder="Enter username"
            value={userData.username}
            onChange={(e) =>
              setUserData({ ...userData, username: e.target.value })
            }
          ></input>
          <br />
          <label>Email: </label>
          <input
            className="m-4 "
            type="email"
            placeholder="Enter email"
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          ></input>
          <br />
          <label>Password: </label>
          <input
            className="m-4 "
            type="password"
            placeholder="Enter password"
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          ></input>
          <br />
          <button
            className="bg-lightacc text-darksec my-4 mx-2 px-4 py-2 rounded"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
