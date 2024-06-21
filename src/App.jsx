import { Navigate, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Timer from "./pages/Timer";
import Sidebar from "./components/Sidebar";
import React, { useContext, useState } from "react";
import Header from "./components/Header";
import TaskCard from "./components/TaskCard";
import Settings from "./pages/Settings";
import { getUser } from "./utilities/users-service";

function App() {
  const [user, setUser] = useState(getUser());
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="app-container">
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
      <Header toggleSidebar={toggleSidebar} user={user} setUser={setUser} />
      {user ? (
        <div className="flex-1 p-5">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route
              path="/dashboard"
              element={<Dashboard user={user} setUser={setUser} />}
            />
            <Route
              path="/tasks"
              element={<Tasks user={user} setUser={setUser} />}
            />
            <Route path="/task/:id" element={<TaskCard user={user} />} />
            <Route path="/tasks/:status" element={<Tasks user={user} />} />
            <Route path="/timer" element={<Timer user={user} />} />
            <Route
              path="/settings"
              element={<Settings user={user} setUser={setUser} />}
            />
          </Routes>
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
            user={user}
            setUser={setUser}
          />
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Home setUser={setUser} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
