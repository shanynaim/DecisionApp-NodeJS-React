import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import URL from "../utils/config";

function Signin({ signIn }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${URL}/users/signin`, {
        email: form.email,
        password: form.password,
      });

      console.log(response);
      setMessage(response.data.data.message);
      if (response.data.ok) {
        setTimeout(() => {
          signIn(response.data.data.token);
          navigate("/decision");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      onChange={handleChange}
      className="form_container"
    >
      <label>Email</label>
      <input name="email" />
      <label>Password</label>
      <input name="password" />
      <button>Signin</button>
      <div className="message">
        <h4>{message}</h4>
      </div>
    </form>
  );
}

export default Signin;
