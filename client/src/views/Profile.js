import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import URL from "../utils/config";

function Profile({ route }) {
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  //make the profile!!!! maybe use the same container from the query
  const [profile, setProfile] = useState({
    openness: 0,
    conscientiousness: 0,
    extraversion: 0,
    agreeableness: 0,
    neuroticism: 0,
  });
  const { state } = useLocation();
  const { name, email, password } = state;

  const SubmitUserData = async () => {
    try {
      const res = await axios.post(`${URL}/users/signup`, {
        name: name,
        email: email,
        password: password,
        profile: profile,
      });

      setMessage(res.data.data.message);

      if (res.data.ok) {
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>
        in profiling of {name} email {email} password {password}
      </h1>
      <button onClick={SubmitUserData}>submit</button>

      <h4>{message}</h4>
    </>
  );
}

export default Profile;
