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
  const { id } = state;

  const SubmitUserData = async (e) => {
    e.preventDeafult();

    try {
      debugger;
      const res = await axios.post(`${URL}/users/signup/profile`, {
        id: id,
        profile: profile,
      });

      setMessage(res.data.data.message);

      if (res.data.ok) {
        setTimeout(() => {
          navigate("/signin");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>in profiling</h1>
      <button onClick={SubmitUserData}>submit</button>

      <h4>{message}</h4>
    </>
  );
}

export default Profile;
