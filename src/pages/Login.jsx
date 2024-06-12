import React, { useState } from "react";
import axios from "axios";

export default function Login() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const loginUser = (e) => {
    e.preventDefault();
    axios.get("/");
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
