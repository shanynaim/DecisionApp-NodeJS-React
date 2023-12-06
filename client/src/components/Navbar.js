import React from "react";
import { Link } from "react-router-dom";

function Navbar({ signOut }) {
  return (
    <ul className="nav">
      <li>
        <Link to="/">Home</Link>
        <Link to="http://localhost:4050/login">Log In</Link>
        <Link to="http://localhost:4050/logout">Sign Out</Link>
        <Link to="http://localhost:3000/decision">Take Decision</Link>
      </li>
    </ul>
  );
}

export default Navbar;
