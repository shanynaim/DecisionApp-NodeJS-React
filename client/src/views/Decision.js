import { React, useState, useEffect } from "react";
import axios from "axios";
import Questions from "./Questions";
import URL from "../utils/config";

function Decision({ userId }) {
  const [message, setMessage] = useState(null);
  const [isFinish, setIsFinish] = useState(false);
  const [start, setStart] = useState(false);
  const [optionOne, setOptionOne] = useState({
    name: "",
    scores: {},
  });
  const [optionTwo, setOptionTwo] = useState({
    name: "",
    scores: {},
  });
  useEffect(() => {
    if (isFinish) {
      debugger;
      const getProfile = async () => {
        try {
          const respond = await axios.post(`${URL}/decision/calculateScore`, {
            userId,
            optionOne: optionOne,
            optionTwo: optionTwo,
          });

          if (respond.data.ok) {
            setMessage(respond.data.data);
          }
        } catch (error) {
          console.log(error);
        }
      };

      getProfile();
    }
  }, [isFinish]);

  const setOptionChange = (e) => {
    if (e.target.id === "1") {
      const optionCopy = { ...optionOne };
      optionCopy[e.target.name] = e.target.value;

      setOptionOne(optionCopy);
    } else {
      const optionCopy = { ...optionTwo };
      optionCopy[e.target.name] = e.target.value;
      setOptionTwo(optionCopy);
    }
  };

  const startSubmit = (e) => {
    e.preventDefault();
    setStart(true);
  };

  return (
    <>
      {!start ? (
        <div>
          <p>some text about the form of the query</p>
          <form onSubmit={startSubmit} onChange={setOptionChange}>
            <label>option one</label>
            <input id="1" name="name" type="text" />
            <label>option two</label>

            <input id="2" name="name" type="text" />
            <button>Lets start!</button>
          </form>
        </div>
      ) : (
        <div>
          <Questions
            setIsFinish={setIsFinish}
            optionOne={optionOne}
            optionTwo={optionTwo}
            setOptionOne={setOptionOne}
            setOptionTwo={setOptionTwo}
          />
        </div>
      )}
      {message &&
        (message === "equal" ? (
          <h1>Both option are equally good!</h1>
        ) : (
          <h1>The best option is: {message}</h1>
        ))}
    </>
  );
}

export default Decision;
