// import {useState, useEffect} from "react"

// function Query({
//  questionData,

//   currentIndex,
//   sumAllTraits,
//   selectedValue
// }) {

//     const [traitsScoreOne, setTraitsScoreOne] = useState([]);
//     const [traitsScoreTwo, setTraitsScoreTwo] = useState([]);
//     useEffect(() => {
//         // debugger;
//         if (question && selectedValue.valueOne) {
//           setTraitsScoreOne([
//             ...traitsScoreOne,
//             { [question.trait]: selectedValue.valueOne },
//           ]);
//           setTraitsScoreTwo([
//             ...traitsScoreTwo,
//             { [question.trait]: selectedValue.valueTwo },
//           ]);
//         } else if (!question) {
//           GetQuestion();
//         }
//       }, [question]);

//       useEffect(() => {
//         if (currentIndex === -2) {
//           debugger;
//           setTraitsScoreOne([
//             ...traitsScoreOne,
//             { [question.trait]: selectedValue.valueOne },
//           ]);
//           setTraitsScoreTwo([
//             ...traitsScoreTwo,
//             { [question.trait]: selectedValue.valueTwo },
//           ]);
//           sumAllTraits(traitsScoreOne, setOptionOne);
//           sumAllTraits(traitsScoreTwo, setOptionTwo);
//         }
//       }, [currentIndex]);

//   return (
//     <form onSubmit={questionSubmit} onChange={traitCalculation}>
//       <h2>{question.question}</h2>
//       <h3>{optionOne.name}</h3>
//       {renderRadioButtons("valueOne")}
//       <h3>{optionTwo.name}</h3>
//       {renderRadioButtons("valueTwo")}
//       <button type="submit" onClick={GetQuestion}>
//         Next
//       </button>
//     </form>
//   );
// }

// export default Query;
