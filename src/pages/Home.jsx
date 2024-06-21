import React from "react";
import { Link, useLocation } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import LoginTabs from "../components/LoginTabs";

export default function Home({ setUser }) {
  const location = useLocation();

  return (
    <div>
      <LoginTabs />
      <main className="text-lightpri p-4 container flex mx-auto min-h-screen items-center justify-center">
        {location.pathname === "/register" ? (
          <Register setUser={setUser} />
        ) : location.pathname === "/login" ? (
          <Login setUser={setUser} />
        ) : null}
      </main>
    </div>
  );
}
