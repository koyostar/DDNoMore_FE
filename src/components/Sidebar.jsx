import React, { useContext, useState } from "react";
import { FaTasks } from "react-icons/fa";
import {
  MdDashboard,
  MdOutlineTaskAlt,
  MdPendingActions,
  MdSettings,
  MdTimer,
} from "react-icons/md";
import { UserContext } from "../utilities/user";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

const linkData = [
  { label: "Dashboard", link: "dashboard", icon: <MdDashboard /> },
  { label: "Tasks", link: "tasks", icon: <FaTasks /> },
  {
    label: "Completed",
    link: "tasks/completed",
    icon: <MdOutlineTaskAlt />,
  },
  {
    label: "In Progress",
    link: "tasks/in-progress",
    icon: <MdPendingActions />,
  },
  { label: "Timer", link: "timer", icon: <MdTimer /> },
];

export default function Sidebar() {
  const { user, isSidebarOpen, toggleSidebar } = useContext(UserContext);
  const location = useLocation();

  const path = location.pathname.split("/")[1];

  const NavLink = ({ el }) => (
    <Link
      to={el.link}
      className={clsx(
        "flex items-center gap-2 p-2 rounded hover:bg-blue-700",
        path === el.link.split("/")[0]
          ? "bg-blue-700 text-white"
          : "text-gray-200"
      )}
    >
      {el.icon}
      <span>{el.label}</span>
    </Link>
  );

  return (
    <div className="relative">
      <div
        className={`sidebar ${
          isSidebarOpen ? "open" : "closed"
        } bg-gray-800 text-white h-full transition-transform transform fixed top-0 left-0 z-0`}
      >
        <div className="absolute top-0 right-0 mt-4 mr-4">
          <button
            onClick={toggleSidebar}
            className=" bg-darksec text-lightpri px-4 py-2 rounded hover:bg-darkacc"
          >
            X
          </button>
        </div>

        <nav className="flex flex-col gap-4 mt-16">
          {linkData.map((link) => (
            <NavLink el={link} key={link.label} />
          ))}
        </nav>
        <div className="mt-auto">
          <button className="w-full flex gap-2 p-2 items-center text-lg text-gray-200 hover:bg-blue-700 mt-4">
            <MdSettings />
            <span>Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
}
