import React from "react";
import { Link } from "react-router-dom";

export default function LoginTabs() {
  return (
    <div>
      <Link
        to="/login"
        className={`login-btn my-4 mx-2 px-4 py-2 rounded ${
          location.pathname === "/login"
            ? "bg-lightpri text-darksec  hover:bg-darkacc"
            : "text-lightpri bg-darksec hover:text-darksec hover:bg-lightacc"
        }`}
      >
        Login
      </Link>
      <Link
        to="/register"
        className={`login-btn my-4 mx-2 px-4 py-2 rounded ${
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
