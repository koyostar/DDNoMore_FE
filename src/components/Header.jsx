import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="mt-4 text-center">
      <Link to="/">
        <span className="text-lightpri font-bebas text-5xl font-bold text-center">
          DD No More
        </span>
      </Link>
    </div>
  );
}
