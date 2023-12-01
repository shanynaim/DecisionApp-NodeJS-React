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
    valueOne: "3",
    valueTwo: "3",
  });

  function GetQuestion() {
    // debugger;
    const random = Math.floor(Math.random() * currentIndex);

    [questionsArray[currentIndex], questionsArray[random]] = [
      questionsArray[random],
      questionsArray[currentIndex],
    ];
    setQuestion(questionsArray[currentIndex]);
    setCurretIndex(currentIndex - 1);
  }

  function traitCalculation(e) {
    const score = Number(e.target.value);
    // if (e.target.name === "1") {
    //   setTraitsScoreOne([...traitsScoreOne, { [question.trait]: score }]);
    //   // traitsScoreOne[question.trait] += add;
    //   console.log(question);
    // console.log(traitsScoreOne);
    // console.log(traitsScoreTwo);
    // } else {
    //   setSelectedValue(score);
    //   setTraitsScoreTwo([...traitsScoreTwo, { [question.trait]: score }]);
    // console.log(optionTwo);
    // traitsScoreTwo[question.trait] += add;
    let copy = { ...selectedValue };
    copy[e.target.name] = score;
    setSelectedValue(copy);
  }

  const questionSubmit = (e) => {
    e.preventDefault();

    // console.log(e);

    // setOptionOne((prevOptionOne) => ({
    //   name: prevOptionOne.name,
    //   score: traitsScoreOne,
    // }));
    // setOptionTwo((prevOptionTwo) => ({
    //   name: prevOptionTwo.name,
    //   score: traitsScoreTwo,
    // };
    // console.log(optionOne, optionTwo);
    // let answers = [];
    // console.log(
    //   e.target.childNodes.forEach((e) => {
    //     if (e.nodeName === "INPUT" && e.checked) answers.push(e.value);
    //   })
    // );
    // console.log(answers);
    //set the score in the right place

    e.target.reset();
  };

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
    debugger;
    setOption(results);
  };

  useEffect(() => {
    // debugger;
    if (question) {
      setTraitsScoreOne([
        ...traitsScoreOne,
        { [question.trait]: selectedValue.valueOne },
      ]);
      setTraitsScoreTwo([
        ...traitsScoreTwo,
        { [question.trait]: selectedValue.valueTwo },
      ]);
    } else {
      GetQuestion();
    }
  }, [question]);

  useEffect(() => {
    if (currentIndex === -1) {
      sumAllTraits(traitsScoreOne, setOptionOne);
      sumAllTraits(traitsScoreTwo, setOptionTwo);
    }
  }, [currentIndex]);

  return (
    <>
      {question && currentIndex > -1 ? (
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
        <h2>sohjtis</h2>
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
          // checked={selectedValue[group] === "1"}
        />
        <label>Strongly Disagree </label>
        <input
          type="radio"
          name={group}
          value="2"
          // checked={selectedValue[group] === "2"}
        />
        <label>Disagree </label>
        <input type="radio" name={group} value="3" checked={true} />
        <label>Neutral </label>
        <input
          type="radio"
          name={group}
          value="4"
          // checked={selectedValue[group] === "4"}
        />
        <label>Agree </label>
        <input
          type="radio"
          name={group}
          value="5"
          // checked={selectedValue[group] === "5"}
        />
        <label>Strongly Agree</label>
      </>
    );
  }
}
export default QueryQuestions;
