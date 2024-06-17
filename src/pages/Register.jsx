import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import LoginTabs from "../components/LoginTabs";

export default function Register() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const registerUser = async (e) => {
    e.preventDefault();

    const { name, email, password } = userData;
    try {
      const response = await axios.post("/register", {
        name,
        email,
        password,
      });
      if (response.status === 201) {
        setUserData({});
        toast.success("Registration Successful. Welcome!");
        navigate("/");
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
    <div>
      <LoginTabs />
      <div className="form-container m-4">
        <form onSubmit={registerUser}>
          <label>Name: </label>
          <input
            type="text"
            placeholder="Enter name"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          ></input>
          <br />
          <label>Email: </label>
          <input
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
            type="password"
            placeholder="Enter password"
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          ></input>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>{" "}
    </div>
  );
}
