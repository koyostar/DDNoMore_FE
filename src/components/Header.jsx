import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../utilities/user";

export default function Header() {
  const { toggleSidebar } = useContext(UserContext);

  return (
    <div className="flex flex-col m-4">
      <Link to="/">
        <span className="text-lightpri font-bebas text-5xl font-bold">
          DD No More
        </span>
      </Link>
    </div>
  );
}
