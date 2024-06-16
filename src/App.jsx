import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "./utilities/user";
import Dashboard from "./pages/Dashboard";

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.withCredentials = true;

function App() {
  return (
    <div>
      <h1>DD No More</h1>
      <UserContextProvider>
        <NavBar />
        <Toaster
          position="bottom-center"
          toastOptions={{
            duration: 5000,
            style: {
              background: "#d3d3d3",
              color: "#000000",
            },
          }}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </UserContextProvider>
    </div>
  );
}

export default App;
