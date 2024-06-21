import React, { Fragment, useContext, useState } from "react";
import { UserContext } from "../utilities/user";
import { useNavigate } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { FaRegUserCircle, FaUser, FaUserLock } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";

export default function Navbar() {
  const { user, logoutUser, toggleSidebar } = useContext(UserContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-gray-100">
      <div className="sidebar-toggle flex gap-4">
        <button
          onClick={toggleSidebar}
          className="text-2xl text-gray-500 block"
        >
          ☰
        </button>
      </div>
      <div className="user-avatar relative">
        <div>
          <button
            onClick={openMenu}
            className="w-auto h-12 flex items-center justify-center rounded-full bg-blue-600 px-4 text-white font-semibold"
          >
            <FaRegUserCircle className="mr-2" />
            <span>{user?.name}</span>
          </button>
        </div>
        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-56 origin-top-right divide-gray-100 rounded-md bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none">
            <div className="p-4">
              <button
                onClick={() => {
                  navigate("/profile");
                  closeMenu();
                }}
                className="text-gray-700 group flex w-full items-center rounded-md px-2 py-2 text-base hover:bg-gray-100"
              >
                <FaUser className="mr-2" aria-hidden="true" />
                Profile
              </button>
              <button
                onClick={() => {
                  navigate("/change-password");
                  closeMenu();
                }}
                className="text-gray-700 group flex w-full items-center rounded-md px-2 py-2 text-base hover:bg-gray-100"
              >
                <FaUserLock className="mr-2" aria-hidden="true" />
                Change Password
              </button>
              <button
                onClick={() => {
                  handleLogout();
                  closeMenu();
                }}
                className="text-red-600 group flex w-full items-center rounded-md px-2 py-2 text-base hover:bg-gray-100"
              >
                <IoLogOutOutline className="mr-2" aria-hidden="true" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
