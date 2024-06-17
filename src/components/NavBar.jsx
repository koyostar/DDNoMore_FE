import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../utilities/user";

export default function NavBar() {
  const { toggleSidebar } = useContext(UserContext);
  return (
    <div>
      <div className="flex gap-4">
        <button
          onClick={toggleSidebar}
          className="text-2xl text-gray-500 block"
        >
          ☰
        </button>
      </div>
    </div>
  );
}
