import { useContext } from "react";
import { UserContext } from "../utilities/user";

export default function Dashboard({ user }) {
  return (
    <div>
      <h1>Dashboard</h1>
      {!!user && <h2>Hi {user.name}</h2>}
    </div>
  );
}
