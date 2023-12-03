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
  const [optionOne, setOptionOne] = useState({
    name: "",
    scores: {
      openness: 1,
      conscientiousness: 1,
      extraversion: 1,
      agreeableness: 1,
      neuroticism: 1,
    },
  });
  const navigate = useNavigate();
  const [isFinish, setIsFinish] = useState(false);

  const { state } = useLocation();
  const { id } = state;
  // const id = 1;
  const setters = { optionOne: setOptionOne };

  // useEffect(() => {
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

  //   if (isFinish) {
  //     SubmitUserData();
  //   }
  // }, [isFinish]);

  return (
    <>
      <h1>in profiling</h1>
      <button onClick={SubmitUserData}>submit</button>
      {/* <Questions
        data={data}
        validation={"profile"}
        setIsFinish={setIsFinish}
        setters={setters}
        traitArray={traitArray}
        setTraitArray={setTraitArray} */}
      {/* // optionOne={optionOne} */}
      {/* /> */}
      <h4>{message}</h4>
    </>
  );
}

export default Profile;
