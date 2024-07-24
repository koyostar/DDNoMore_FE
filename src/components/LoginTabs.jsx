import React from "react";
import { Link } from "react-router-dom";

export default function LoginTabs() {
  return (
    <div className="flex flex-row justify-between bg-transparent">
      <Link
        to="/login"
        className={`login-btn text-xl w-1/2 text-center py-1 rounded-tl-xl ${
          location.pathname === "/login"
            ? "bg-lightsec text-darksec  hover:bg-darkacc"
            : "text-lightsec bg-darkpri hover:text-darksec hover:bg-lightacc"
        }`}
      >
        Login
      </Link>
      <Link
        to="/register"
        className={`login-btn text-xl w-1/2 text-center py-1 rounded-tr-xl ${
          location.pathname === "/register"
            ? "bg-lightsec text-darksec  hover:bg-darkacc"
            : "text-lightsec bg-darkpri hover:text-darksec hover:bg-lightacc"
        }`}
      >
        Register
      </Link>
    </div>
  );
}
