import { useState, useEffect } from "react";
import Questions from "../utils/QuestionsData";

function QueryQuestions({
  optionOne,
  optionTwo,
  setOptionOne,
  setOptionTwo,
  setIsFinish,
}) {
  // const questionsArray = Questions;
  const [questionsArray, setQuestionsArray] = useState(Questions);
  const [currentIndex, setCurrentIndex] = useState(Questions.length - 1);
  const [isDone, setIsDone] = useState(false);
  const [question, setQuestion] = useState(GetQuestion);
  const [traitsScoreOne, setTraitsScoreOne] = useState([]);
  const [traitsScoreTwo, setTraitsScoreTwo] = useState([]);

  const [selectedValue, setSelectedValue] = useState({
    valueOne: null,
    valueTwo: null,
  });

  function setNextQuestion() {
    setTraitsScoreOne([
      ...traitsScoreOne,
      { [question.trait]: selectedValue.valueOne },
    ]);
    setTraitsScoreTwo([
      ...traitsScoreTwo,
      { [question.trait]: selectedValue.valueTwo },
    ]);
    setQuestion(GetQuestion());
  }

  function GetQuestion() {
    const random = Math.floor(Math.random() * currentIndex);

    [questionsArray[currentIndex], questionsArray[random]] = [
      questionsArray[random],
      questionsArray[currentIndex],
    ];

    let tmp = questionsArray[currentIndex];
    setCurrentIndex((prevIndex) => prevIndex - 1);
    return tmp;
  }

  function traitCalculation(e) {
    const score = Number(e.target.value);

    let copy = { ...selectedValue };
    copy[e.target.name] = score;
    setSelectedValue(copy);
  }

  const questionSubmit = (e) => {
    e.preventDefault();
    setTraitsScoreOne([
      ...traitsScoreOne,
      { [question.trait]: selectedValue.valueOne },
    ]);
    setTraitsScoreTwo([
      ...traitsScoreTwo,
      { [question.trait]: selectedValue.valueTwo },
    ]);
    debugger;
    setIsDone(true);

    e.target.reset();
  };

  useEffect(() => {
    if (isDone) {
      debugger;
      sumAllTraits(traitsScoreOne, setOptionOne);
      sumAllTraits(traitsScoreTwo, setOptionTwo);
    }
    setIsFinish(true);
  }, [isDone]);

  const sumAllTraits = (traitsScore, setOption) => {
    console.log(traitsScore);
    let results = {
      openness: 0,
      conscientiousness: 0,
      extraversion: 0,
      agreeableness: 0,
      neuroticism: 0,
    };

    traitsScore.forEach((element) => {
      const key = Object.keys(element)[0];
      const value = Object.values(element)[0];

      results[key] += Number(value);
    });

    setOption(results);

    setCurrentIndex(currentIndex - 1);
  };

  return (
    <>
      {currentIndex > -1 && (
        <form onChange={traitCalculation}>
          <h2>{question.question}</h2>
          <h3>{optionOne.name}</h3>
          {renderRadioButtons("valueOne")}
          <h3>{optionTwo.name}</h3>
          {renderRadioButtons("valueTwo")}
          <button type="button" onClick={setNextQuestion}>
            Next
          </button>
        </form>
      )}

      {currentIndex === -1 && (
        <form onSubmit={questionSubmit}>
          <button type="submit">Decision Time</button>
        </form>
      )}
    </>
  );

  function renderRadioButtons(group) {
    return (
      <>
        <input
          type="radio"
          name={group}
          value="1"
          checked={selectedValue[group] === 1}
        />
        <label>Strongly Disagree </label>
        <input
          type="radio"
          name={group}
          value="2"
          checked={selectedValue[group] === 2}
        />
        <label>Disagree </label>
        <input
          type="radio"
          name={group}
          value="3"
          checked={selectedValue[group] === 3}
        />
        <label>Neutral </label>
        <input
          type="radio"
          name={group}
          value="4"
          checked={selectedValue[group] === 4}
        />
        <label>Agree </label>
        <input
          type="radio"
          name={group}
          value="5"
          checked={selectedValue[group] === 5}
        />
        <label>Strongly Agree</label>
      </>
    );
  }
}
export default QueryQuestions;
