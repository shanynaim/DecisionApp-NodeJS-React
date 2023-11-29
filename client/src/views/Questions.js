import { useState } from "react";
import Questions from "../utils/QuestionsData";

function QueryQuestions({
  questionSubmit,
  setOptionChange,
  optionOneName,
  optionTwoName,
}) {
  const questionsArray = Questions;
  const [currentIndex, setCurretIndex] = useState(questionsArray.length - 1);

  const [question, setQuestion] = useState("");

  function GetQuestion() {
    const random = Math.floor(Math.random() * currentIndex);

    [questionsArray[currentIndex], questionsArray[random]] = [
      questionsArray[random],
      questionsArray[currentIndex],
    ];

    const newQuestion = Object.values(questionsArray[currentIndex]);
    setCurretIndex(currentIndex - 1);
    setQuestion(newQuestion[0]);
  }

  return currentIndex >= 0 ? (
    <form onSubmit={questionSubmit} /*onChange={setOptionChange}*/>
      <h2>{question}</h2>
      <h3>{optionOneName}</h3>
      {renderRadioButtons("1")}
      <h3>{optionTwoName}</h3>
      {renderRadioButtons("2")}
      <button type="submit" onClick={GetQuestion}>
        Next
      </button>
    </form>
  ) : null;

  function renderRadioButtons(group) {
    return (
      <>
        <input type="radio" name={group} value="1" />
        <label>Strongly Disagree </label>
        <input type="radio" name={group} value="2" />
        <label>Disagree </label>
        <input type="radio" name={group} value="3" /> <label>Neutral </label>
        <input type="radio" name={group} value="4" /> <label>Agree </label>
        <input type="radio" name={group} value="5" />
      </>
    );
  }
}
export default QueryQuestions;
