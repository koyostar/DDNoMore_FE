import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { registerService } from "../utilities/users-service";

export default function Register({ setUser }) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    repeat: "",
  });

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await registerService(userData);
      console.log(user);
      setUser(user);
      if (user && !user.error) {
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
    <div className="container bg-lightsec font-bold rounded-2xl mx-auto max-w-md p-4">
      <form className="p-2" onSubmit={handleSubmit} autoComplete="off">
        <header className="text-darkpri text-2xl mb-4 text-center ">
          Register with
          <span className="text-darkpri text-4xl font-bebas ml-3">
            DD No More
          </span>
        </header>
        <div className="mb-6">
          <label htmlFor="username" className="block mb-2 text-sm text-darkpri">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleChange}
            placeholder="Name"
            autoComplete="off"
            className="bg-lightpri text-darkpri text-sm focus:outline-none block w-full p-2.5 cursor-text border-none"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm text-darkpri">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="bg-lightpri text-darkpri text-sm focus:ring-zinc-500 block w-full p-2.5 cursor-text border-none"
            placeholder="xxxxx@email.com"
            autoComplete="off"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="username" className="block mb-2 text-sm text-darkpri">
            Username
          </label>
          <input
            type="username"
            id="username"
            name="username"
            value={userData.username}
            onChange={handleChange}
            placeholder="Username"
            autoComplete="off"
            className="bg-lightpri text-darkpri text-sm focus:outline-none block w-full p-2.5 cursor-text border-none"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-sm text-darkpri">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            placeholder="Password"
            className="bg-lightpri text-darkpri text-sm focus:ring-zinc-500 block w-full p-2.5 cursor-text border-none"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="repeat-password"
            className="block mb-2 text-sm text-darkpri"
          >
            Repeat password
          </label>
          <input
            type="password"
            id="repeat-password"
            name="repeat"
            value={userData.repeat}
            onChange={handleChange}
            autoComplete="off"
            placeholder="Repeat Password"
            className="bg-lightpri text-darkpri text-sm focus:ring-zinc-500 block focus:outline-none w-full p-2.5 cursor-text border-none"
            required
          />
        </div>
        <button
          type="submit"
          className="text-lightpri bg-darkpri hover:bg-darksec focus:outline-none focus:ring-gray-400 text-3xl px-3 py-2.5 text-center w-full rounded-xl"
        >
          REGISTER
        </button>
      </form>
      <Link to="/login">
        <button className="text-darksec text-lg btn btn-ghost btn-sm bg-lightacc my-4 mx-2 px-4 py-2  hover:bg-darksec hover:text-white rounded-md absolute top-4 right-4 normal-case">
          Log In
        </button>
      </Link>
    </div>
  );
}
