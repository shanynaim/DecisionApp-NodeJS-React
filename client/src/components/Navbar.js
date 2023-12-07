import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function Navbar() {
  const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } =
    useAuth0();
  console.log("isLoading", isLoading);
  console.log("isAuthenticated", isAuthenticated);
  console.log("error", error);
  console.log("user", user);
  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
  // if (error) {
  //   return <div>Oops... {error.message}</div>;
  // } else {

  return (
    <ul className="nav">
      <li>
        {/* <Link to="/">Home</Link> */}
        <Link to="http://localhost:4050/login">Log In</Link>
        {/* <button onClick={() => loginWithRedirect()}>Log In</button> */}
        {/* <button
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        > */}
        {/* Log Out */}
        {/* </button> */}
        {/* {isAuthenticated && ( */}
        <Link to="http://localhost:4050/logout">Log Out</Link>
        {/* )} */}
        {/* {isAuthenticated && (
          <Link to="http://localhost:3000/decision">Take Decision</Link>
        )} */}
      </li>
    </ul>
  );
}
// }

export default Navbar;
