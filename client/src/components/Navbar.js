import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <ul className="nav">
      <li>
        <Link to="/">Home</Link>
        <Link to="/signin">Sign In</Link>
        <Link to="/signup">Sign Up</Link>
      </li>
    </ul>
  );
}

export default Navbar;
