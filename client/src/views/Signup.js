import axios from "axios";
import { useState } from "react";
import URL from "../utils/config";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password1: "",
    password2: "",
  });

  const changeForm = (e) => {
    const formCopy = { ...form };
    formCopy[e.target.name] = e.target.value;

    setForm(formCopy);
  };
  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();

    const response = await axios.post(`${URL}/users/signup`, {
      name: form.name,
      email: form.email,
      password1: form.password1,
      password2: form.password2,
    });

    setMessage(response.data.data.message);

    if (response.data.ok) {
      setTimeout(() => {
        navigate("/profile", {
          state: {
            id: response.data.data.id,
          },
        });
      }, 1000);
    }
  };
  return (
    <form
      onSubmit={submitForm}
      onChange={changeForm}
      className="Signup_container"
    >
      <label>Name</label>
      <input name="name" />
      <label>Email</label>
      <input name="email" />
      <label>Password</label>
      <input name="password1" />

      <label>Repeat password</label>
      <input name="password2" />

      <button>Sign Up</button>
      <div>{message}</div>
    </form>
  );
}

export default Signup;
