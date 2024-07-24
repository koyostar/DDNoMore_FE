import React, { useContext, useState } from "react";
import { FaRegUserCircle, FaTasks } from "react-icons/fa";
import { MdDashboard, MdSettings, MdTimer } from "react-icons/md";
import { UserContext } from "../utilities/user";
import { Link, useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { IoLogOutOutline } from "react-icons/io5";

const linkData = [
  { label: "Dashboard", link: "dashboard", icon: <MdDashboard /> },
  { label: "Tasks", link: "tasks", icon: <FaTasks /> },
  { label: "Timer", link: "timer", icon: <MdTimer /> },
  { label: "Settings", link: "settings", icon: <MdSettings /> },
];

export default function Sidebar() {
  const { user, isSidebarOpen, toggleSidebar, logoutUser, closeSidebar } =
    useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate;

  const path = location.pathname.split("/")[1];

  const NavLink = ({ el }) => (
    <Link
      to={el.link}
      onClick={() => closeSidebar()}
      className={clsx(
        "flex items-center gap-2 p-2 rounded hover:bg-blue-700",
        path === el.link.split("/")[0]
          ? "bg-lightsec text-darksec font-bold"
          : "text-gray-200"
      )}
    >
      {el.icon}
      <span>{el.label}</span>
    </Link>
  );

  const handleLogout = async () => {
    try {
      await logoutUser();
      closeSidebar();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="relative">
      {isSidebarOpen && (
        <div className="fixed inset-0 text-white" onClick={toggleSidebar}></div>
      )}

      <div
        className={`sidebar ${
          isSidebarOpen ? "open" : "closed"
        } bg-darkpri text-white h-full transition-transform transform fixed top-0 left-0 z-0`}
      >
        <div className="flex  m-4 text-white font-semibold">
          <FaRegUserCircle className="mr-2" />
          <span>{user?.name}</span>
        </div>

        <nav className="flex flex-col mt-6">
          {linkData.map((link) => (
            <NavLink el={link} key={link.label} />
          ))}
        </nav>
        <button
          onClick={() => {
            handleLogout();
          }}
          className="group flex w-full items-center rounded-md px-2 py-2 text-base hover:bg-gray-100"
        >
          <IoLogOutOutline className="mr-2" aria-hidden="true" />
          Logout
        </button>
      </div>
    </div>
  );
}
