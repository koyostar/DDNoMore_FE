import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import LoginTabs from "../components/LoginTabs";
import { loginService } from "../utilities/users-service";

export default function Login({ setUser }) {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting login form with:", credentials);

      const user = await loginService(credentials);
      console.log("Login response:", user);
      setUser(user);

      if (user && !user.error) {
        toast.success("Login Successful. Welcome!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);

      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="container font-bold bg-lightsec mx-auto max-w-md p-4 rounded-2xl">
      <form className="p-2" onSubmit={handleSubmit}>
        <header className="text-darkpri text-2xl mb-4 text-center">
          LOGIN
        </header>
        <div className="mb-6">
          <label htmlFor="username" className="block mb-2 text-lg text-darkpri">
            Username
          </label>
          <input
            type="username"
            id="username"
            name="username"
            autoComplete="off"
            value={credentials.username}
            onChange={handleChange}
            className="bg-lightpri text-darksec text-sm focus:outline-none block w-full p-2.5 cursor-text border-none"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-lg text-darkpri">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="off"
            value={credentials.password}
            onChange={handleChange}
            className="bg-lightpri text-darksec text-sm focus:ring-zinc-500 block w-full p-2.5 cursor-text border-none"
            required
          />
        </div>
        <button
          type="submit"
          className="text-lightpri bg-darkpri hover:bg-darksec focus:ring-2 focus:outline-none focus:ring-gray-400 text-3xl px-3 py-2.5 text-center w-full rounded-2xl"
        >
          LOG IN
        </button>
        <footer className="text-darkpri mt-6 text-center">
          New to <span>DD No More?</span>
          <br />
          <Link to="/register">
            <button className="text-lightpri bg-darkpri hover:bg-darksec focus:ring-2 focus:outline-none focus:ring-gray-400 text-lg px-2 py-1 text-center w-1/2 rounded-2xl">
              Register now!
            </button>
          </Link>
        </footer>
      </form>
    </div>
  );
}
