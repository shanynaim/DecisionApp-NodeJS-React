import { useState, useEffect } from "react";

function QueryQuestions({ optionsArray, setIsFinish, setOptionsArray, data }) {
  const dataSize = data.length;
  const [questionNumber, setQuestionNumber] = useState(0);
  const [questionsArray, setQuestionsArray] = useState(data);
  const [currentIndex, setCurrentIndex] = useState(dataSize - 1);
  const [isDone, setIsDone] = useState(false);
  const [question, setQuestion] = useState(GetQuestion);

  function setNextQuestion() {
    let copy = optionsArray;
    copy.forEach((option) => {
      option.queryScores.push({ [question.trait]: option.currentValue });
    });

    setOptionsArray(copy);

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
    setQuestionNumber((prevIndex) => prevIndex + 1);
    return tmp;
  }

  function traitCalculation(e) {
    let copy = optionsArray.map((option) => {
      if (option.name === e.target.name) {
        return { ...option, currentValue: Number(e.target.value) };
      } else {
        return option;
      }
    });

    setOptionsArray(copy);
  }

  const questionSubmit = (e) => {
    e.preventDefault();

    setIsDone(true);

    e.target.reset();
  };

  useEffect(() => {
    if (isDone) {
      let copy = optionsArray;
      copy.forEach((option) => {
        sumAllTraits(option.queryScores, option.setter, option.name);
      });
      setOptionsArray(copy);

      setTimeout(() => {
        setIsFinish(true);
      }, 200);
    }
  }, [isDone]);

  const sumAllTraits = (traitsScore, setOption, name) => {
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

    setOption({ name: name, scores: results });

    setCurrentIndex(currentIndex - 1);
  };

  return (
    <div className="Questions">
      {currentIndex > -2 && (
        <form onChange={traitCalculation}>
          <h3>This option....</h3>
          <h1>{question.question}</h1>
          <h6>
            {questionNumber}/{dataSize}
          </h6>
          <div className="questions-flex">
            {optionsArray.map((option) => {
              return (
                <div>
                  <h3>{option.name}</h3> {renderRadioButtons(option)}
                </div>
              );
            })}
          </div>

          <button
            className="Questions-next-button"
            type="button"
            onClick={setNextQuestion}
          >
            Next
          </button>
        </form>
      )}

      {currentIndex === -2 && (
        <form className="Questions_submmit" onSubmit={questionSubmit}>
          <button type="submit">
            <h1>Submit my answers!</h1>
          </button>
        </form>
      )}
    </div>
  );

  function renderRadioButtons(group) {
    return (
      <div className="radio_buttons">
        <label>
          <input
            type="radio"
            name={group.name}
            value="1"
            checked={group.currentValue === 1}
          />
          Strongly Disagree
        </label>
        <label>
          <input
            type="radio"
            name={group.name}
            value="2"
            checked={group.currentValue === 2}
          />
          Disagree
        </label>
        <label>
          <input
            type="radio"
            name={group.name}
            value="3"
            checked={group.currentValue === 3}
          />
          Neutral
        </label>
        <label>
          <input
            type="radio"
            name={group.name}
            value="4"
            checked={group.currentValue === 4}
          />
          Agree
        </label>
        <label>
          <input
            type="radio"
            name={group.name}
            value="5"
            checked={group.currentValue === 5}
          />
          Strongly Agree
        </label>
      </div>
    );
  }
}
export default QueryQuestions;
