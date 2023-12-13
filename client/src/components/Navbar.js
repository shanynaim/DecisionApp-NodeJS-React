import React from "react";
import { Link } from "react-router-dom";

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
