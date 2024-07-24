import React from "react";
import { Link, useLocation } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import LoginTabs from "../components/LoginTabs";

export default function Home() {
  const location = useLocation();

  return (
    <div className="flex text-2xl font-bold items-center justify-center h-full text-lightpri">
      <Link
        to="/login"
        className={`login-btn text-center m-5 px-5 py-3 rounded-2xl ${
          location.pathname === "/login"
            ? "bg-lightpri text-darksec  hover:bg-darkacc"
            : "text-lightpri bg-darksec hover:text-darksec hover:bg-lightacc"
        }`}
      >
        Login
      </Link>
      <Link
        to="/register"
        className={`login-btn text-center m-5 px-5 py-3 rounded-2xl ${
          location.pathname === "/register"
            ? "bg-lightpri text-darksec  hover:bg-darkacc"
            : "text-lightpri bg-darksec hover:text-darksec hover:bg-lightacc"
        }`}
      >
        Register
      </Link>
      <main className="">
        {location.pathname === "/register" ? (
          <Register />
        ) : location.pathname === "/login" ? (
          <Login />
        ) : null}
      </main>
    </div>
  );
}
