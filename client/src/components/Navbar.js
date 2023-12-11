import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function Navbar() {
  return (
    <ul className="nav">
      <li>
        <Link to="http://localhost:4050/login">Log In</Link>

        <Link to="http://localhost:4050/logout">Log Out</Link>
      </li>
    </ul>
  );
}

export default Navbar;
