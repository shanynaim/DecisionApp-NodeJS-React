import "./App.css";
import { Helmet } from "react-helmet";
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
      "Email and Id extracted from the JWT token after login: ",
      decodedToken.userEmail,

      decodedToken.userId
    );
    let user = {
      email: decodedToken.userEmail,
      id: decodedToken.userId,
    };

    setToken(newToken);
    setUser(user);

    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(user));
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      <Helmet>
        <title>Decision Bote App</title>
        <meta charset="utf-8" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300&amp;display=swap"
        />
      </Helmet>
      <Router>
        <Navbar signOut={signout} />
        <div className="containers-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/signin"
              element={
                isLoggedIn ? (
                  <Decision userId={user?.id} />
                ) : (
                  <Signin signIn={signIn} />
                )
              }
            />
            <Route
              path="/signup"
              element={isLoggedIn ? <Decision userId={user?.id} /> : <Signup />}
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/decision" element={<Decision />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
