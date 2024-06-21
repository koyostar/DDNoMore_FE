import React from "react";
import { Link } from "react-router-dom";

export default function LoginTabs() {
  return (
    <div className="grid grid-cols-2">
      <Link
        to="/login"
        className={`login-btn text-center rounded ${
          location.pathname === "/login"
            ? "bg-lightpri text-darksec  hover:bg-darkacc"
            : "text-lightpri bg-darksec hover:text-darksec hover:bg-lightacc"
        }`}
      >
        Login
      </Link>
      <Link
        to="/register"
        className={`login-btn text-center rounded ${
          location.pathname === "/register"
            ? "bg-lightpri text-darksec  hover:bg-darkacc"
            : "text-lightpri bg-darksec hover:text-darksec hover:bg-lightacc"
        }`}
      >
        Register
      </Link>
    </div>
  );
}
