import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import LoginTabs from "../components/LoginTabs";
import toast from "react-hot-toast";
import { UserContext } from "../utilities/user";
import axios from "axios";

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser, closeSidebar } = useContext(UserContext);

  const handleDemoLogin = async () => {
    try {
      const response = await axios.post("/login", {
        username: "demouser",
        password: "demo123",
      });
      setUser(response.data.user);
      closeSidebar();
      toast.success("Logged in as Demo User!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Demo login failed.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-lightpri space-y-6">
      <div className="flex text-2xl font-bold space-x-4">
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
      </div>

      <button
        onClick={handleDemoLogin}
        className="text-xl px-6 py-3 rounded-2xl bg-green-500 hover:bg-green-600 text-white font-bold shadow-md transition"
      >
        Try Demo
      </button>
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
