import { useState } from "react";

import { useNavigate } from "react-router-dom";
function Signup() {
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
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

    if (form.password === form.password2) {
      setTimeout(() => {
        navigate("/profile", {
          state: {
            name: form.name,
            email: form.email,
            password: form.password,
          },
        });
      }, 2000);
    } else {
      setMessage("Passwords must match!");
    }
  };
  return (
    <form onSubmit={submitForm} onChange={changeForm}>
      <label>Name</label>
      <input name="name" />
      <label>Email</label>
      <input name="email" />
      <label>Password</label>
      <input name="password" />

      <label>Repeat password</label>
      <input name="password2" />

      <button>Sign Up</button>
      {message.length > 0 && <div>{message}</div>}
    </form>
  );
}

export default Signup;
