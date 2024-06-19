import React, { Fragment, useContext } from "react";
import { UserContext } from "../utilities/user";
import { useNavigate } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { FaRegUserCircle, FaUser, FaUserLock } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";

export default function Navbar() {
  const { user, logoutUser, toggleSidebar } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
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
      <div className="user-avatar">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="w-auto h-12 flex items-center justify-center rounded-full bg-blue-600 px-4">
              <span className="text-white flex items-center font-semibold">
                <FaRegUserCircle className="mr-2" />
                <span>{user?.name}</span>
              </span>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-gray-100 rounded-md bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none">
              <div className="p-4">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => navigate("/profile")}
                      className={`text-gray-700 group flex w-full items-center rounded-md px-2 py-2 text-base ${
                        active ? "bg-gray-100" : ""
                      }`}
                    >
                      <FaUser className="mr-2" aria-hidden="true" />
                      Profile
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => navigate("/change-password")}
                      className={`text-gray-700 group flex w-full items-center rounded-md px-2 py-2 text-base ${
                        active ? "bg-gray-100" : ""
                      }`}
                    >
                      <FaUserLock className="mr-2" aria-hidden="true" />
                      Change Password
                    </button>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleLogout}
                      className={`text-red-600 group flex w-full items-center rounded-md px-2 py-2 text-base ${
                        active ? "bg-gray-100" : ""
                      }`}
                    >
                      <IoLogOutOutline className="mr-2" aria-hidden="true" />
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}
