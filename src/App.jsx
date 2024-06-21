import { Navigate, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { UserContext, UserContextProvider } from "./utilities/user";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Timer from "./pages/Timer";
import Sidebar from "./components/Sidebar";
import { useContext } from "react";
import Header from "./components/Header";
import TaskCard from "./components/TaskCard";
import Settings from "./pages/Settings";

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.withCredentials = true;

function AppContent() {
  const { user } = useContext(UserContext);

  return (
    <div className="app-container">
      <Header />
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
      {user ? (
        <div>
          <div className="flex-1 p-5">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/task/:id" element={<TaskCard />} />
              <Route path="/tasks/:status" element={<Tasks />} />
              <Route path="/timer" element={<Timer />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
          <Sidebar />
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      )}
    </div>
  );
}

function App() {
  return (
    <UserContextProvider>
      <AppContent />
    </UserContextProvider>
  );
}

export default App;
