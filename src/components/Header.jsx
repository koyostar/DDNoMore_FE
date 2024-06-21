import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../utilities/user";

export default function Header() {
  const { user, toggleSidebar } = useContext(UserContext);

  return (
    <div className="relative mt-4 flex items-center justify-center">
      {user ? (
        <div className="sidebar-toggle flex gap-4">
          <button
            onClick={toggleSidebar}
            className="absolute left-4 top-2 text-2xl text-gray-500"
          >
            ☰
          </button>
        </div>
      ) : (
        <div />
      )}
      <Link to="/">
        <span className="text-lightpri font-bebas text-5xl font-bold">
          DD No More
        </span>
      </Link>
    </div>
  );
}
