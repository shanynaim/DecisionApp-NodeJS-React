import React from "react";
import { Link } from "react-router-dom";

function Navbar({ signOut }) {
  return (
    <ul className="nav">
      <li>
        <Link to="/">Home</Link>
        <Link to="http://localhost:4050/login">Sign Up</Link>{" "}
      </li>
      <li>
        <button className="signout-button" onClick={signOut}>
          Sign out
        </button>
      </li>
    </ul>
  );
}

export default Navbar;
