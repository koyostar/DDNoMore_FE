import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/profile", { withCredentials: true });
        setUser(response.data);
      } catch (error) {
        setUser(null);
      }
    };

    fetchProfile();
  }, []);

  const logoutUser = async () => {
    try {
      await axios.post("/logout");
      setUser(null);
      setIsSidebarOpen(false);
      navigate("/login");
      toast.success("Logout Successful. See you soon!");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isSidebarOpen,
        toggleSidebar,
        closeSidebar,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
