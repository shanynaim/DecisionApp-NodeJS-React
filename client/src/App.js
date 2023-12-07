import "./App.css";
import { Helmet } from "react-helmet";
import * as jose from "jose";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/Home";

import Navbar from "./components/Navbar";
import Decision from "./views/Decision";
import Profile from "./views/Profile";

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>Decision Bot App</title>
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
        <Navbar />
        <div className="containers-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/decision" element={<Decision />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
