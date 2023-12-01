import "./App.css";
import * as jose from "jose";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Signin from "./views/Signin";
import Signup from "./views/Signup";
import Navbar from "./components/Navbar";
import Decision from "./views/Decision";
import Profile from "./views/Profile";
import { useState, useEffect } from "react";
import axios from "axios";
import URL from "./utils/config";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    const verify_token = async () => {
      try {
        if (token) {
          axios.defaults.headers.common["Authorization"] = token;

          const response = await axios.post(`${URL}/users/verify_token`);

          return response.data.ok ? signIn(token) : signout();
        }
      } catch (error) {
        console.log(error);
      }
    };
    verify_token();
  }, [token]);

  const signout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };
  const signIn = (newToken) => {
    console.log(newToken);
    let decodedToken = jose.decodeJwt(newToken);
    console.log(
      "Email extracted from the JWT token after login: ",
      decodedToken.userEmail
    );
    let user = {
      email: decodedToken.userEmail,
    };

    setToken(newToken);
    setUser(user);

    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(user));
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      <Router>
        <Navbar signOut={signout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/signin"
            element={isLoggedIn ? <Decision /> : <Signin signIn={signIn} />}
          />
          <Route
            path="/signup"
            element={isLoggedIn ? <Decision /> : <Signup />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/decision"
            element={isLoggedIn ? <Decision /> : <Home />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
