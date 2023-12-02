import { useState, useEffect } from "react";
import Questions from "../utils/QuestionsData";

function QueryQuestions({ optionOne, optionTwo, setOptionOne, setOptionTwo }) {
  // const questionsArray = Questions;
  const [questionsArray, setQuestionsArray] = useState(Questions);
  const [currentIndex, setCurretIndex] = useState(questionsArray.length - 1);

  const [question, setQuestion] = useState(null);
  const [traitsScoreOne, setTraitsScoreOne] = useState([]);
  const [traitsScoreTwo, setTraitsScoreTwo] = useState([]);

  const [selectedValue, setSelectedValue] = useState({
    valueOne: null,
    valueTwo: null,
  });

  function GetQuestion() {
    // debugger;
    const random = Math.floor(Math.random() * currentIndex);

    [questionsArray[currentIndex], questionsArray[random]] = [
      questionsArray[random],
      questionsArray[currentIndex],
    ];

    let tmp = questionsArray[currentIndex];

    setCurretIndex(currentIndex - 1);
    setQuestion(tmp);
  }

  function traitCalculation(e) {
    // debugger;
    const score = Number(e.target.value);

    let copy = { ...selectedValue };
    copy[e.target.name] = score;
    setSelectedValue(copy);
  }

  const questionSubmit = (e) => {
    e.preventDefault();

    e.target.reset();
  };

  const sumAllTraits = (traitsScore, setOption) => {
    debugger;
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
  };

  useEffect(() => {
    // debugger;
    if (question && selectedValue.valueOne) {
      setTraitsScoreOne([
        ...traitsScoreOne,
        { [question.trait]: selectedValue.valueOne },
      ]);
      setTraitsScoreTwo([
        ...traitsScoreTwo,
        { [question.trait]: selectedValue.valueTwo },
      ]);
    } else if (!question) {
      GetQuestion();
    }
  }, [question]);

  useEffect(() => {
    if (currentIndex === -2) {
      debugger;
      setTraitsScoreOne([
        ...traitsScoreOne,
        { [question.trait]: selectedValue.valueOne },
      ]);
      setTraitsScoreTwo([
        ...traitsScoreTwo,
        { [question.trait]: selectedValue.valueTwo },
      ]);
      sumAllTraits(traitsScoreOne, setOptionOne);
      sumAllTraits(traitsScoreTwo, setOptionTwo);
    }
  }, [currentIndex]);

  return (
    <>
      {question && currentIndex > -2 ? (
        <form onSubmit={questionSubmit} onChange={traitCalculation}>
          <h2>{question.question}</h2>
          <h3>{optionOne.name}</h3>
          {renderRadioButtons("valueOne")}
          <h3>{optionTwo.name}</h3>
          {renderRadioButtons("valueTwo")}
          <button type="submit" onClick={GetQuestion}>
            Next
          </button>
        </form>
      ) : (
        <h2>sohjtis</h2> /*edut herre the final score*/
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
