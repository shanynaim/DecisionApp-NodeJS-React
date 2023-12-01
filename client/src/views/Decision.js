import { React, useState } from "react";
import axios from "axios";
import Questions from "./Questions";

function Decision() {
  const [start, setStart] = useState(false);
  const [optionOne, setOptionOne] = useState({
    name: "",
    scores: {
      openness: 0,
      conscientiousness: 0,
      extraversion: 0,
      agreeableness: 0,
      neuroticism: 0,
    },
  });
  const [optionTwo, setOptionTwo] = useState({
    name: "",
    scores: {},
  });

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
            optionOne={optionOne}
            optionTwo={optionTwo}
            setOptionOne={setOptionOne}
            setOptionTwo={setOptionTwo}
          />
        </div>
      )}
    </>
  );
}

export default Decision;
