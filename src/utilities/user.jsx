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

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/profile");
        setUser(response.data);
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          toast.error(error.response.data.error);
        } else {
          toast.error("An error occurred. Please try again.");
        }
      }
    };

    if (!user) {
      fetchProfile();
    }
  }, [user]);

  const logoutUser = async () => {
    try {
      await axios.post("/logout");
      setUser(null);
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
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
