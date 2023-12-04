import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import URL from "../utils/config";
import Questions from "./Questions";
import data from "../utils/Profilling";

function Profile({ route }) {
  const [message, setMessage] = useState("");
  const [traitArray, setTraitArray] = useState({
    optionOne: [],
  });
  const [optionsArray, setOptionsArray] = useState(() => []);
  const [optionOne, setOptionOne] = useState({
    name: "",
    scores: {},
  });
  const navigate = useNavigate();
  const [isFinish, setIsFinish] = useState(false);

  const { state } = useLocation();
  const { id } = state;

  useEffect(() => {
    setOptionsArray([
      {
        name: optionOne.name,
        optionOne,
        setter: setOptionOne,
        queryScores: [],
        currentValue: 0,
      },
    ]);
  }, [optionOne]);

  useEffect(() => {
    if (isFinish) {
      const SubmitUserData = async () => {
        try {
          const res = await axios.post(`${URL}/users/signup/profile`, {
            id: id,
            profile: optionOne.scores,
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
      SubmitUserData();
    }
  }, [isFinish]);

  return (
    <>
      <div className="Profile_container">
        <p> some text about the profile</p>
        <Questions
          setIsFinish={setIsFinish}
          optionsArray={optionsArray}
          setOptionsArray={setOptionsArray}
          data={data}
        />
      </div>
      <h4 className="Signup_message">{message}</h4>
    </>
  );
}

export default Profile;
