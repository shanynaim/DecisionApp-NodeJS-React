import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Signin from "./views/Signin";
import Signup from "./views/Signup";
import Navbar from "./components/Navbar";
import Decision from "./views/Decision";
// import AddProduct from './views/AddProduct';
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="signin" element={<Signin />} />
            <Route path="signup" element={<Signup />} />
          </Routes>
        </Navbar>
      </Router>
      <Decision />
    </div>
  );
}

export default App;
