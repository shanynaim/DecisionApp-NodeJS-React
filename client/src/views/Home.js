import { useState } from "react";

function Home() {
  const [userResponse, setUserResponse] = useState(null);
  const [next, setNext] = useState(false);

  const clickHandler = (e) => {
    //   if (e.target.name === "no") {

    //     // setText(
    //     //   "It seems that you are good enough in making your own decision;). Bye Bye!"
    //     // );
    //   } else if (e.target.name === "yes") {
    //     // setText("Great!");
    //   } else {
    //     // setText(
    //     //   "So it seems this is the app for you! I'm here to help you decide. Want to try?"
    //     // );
    //   }
    setUserResponse(e.target.name);
    setNext(true);
  };

  return (
    <div className="home_text">
      {!next ? (
        <>
          Hello! <br />
          I am your new decision bot! <br />
          I'm here to help you take decisions in your life. <br />
          It can be minor decisions like going out to a party tonight or taking
          a chill evening at home, or bigger ones like working as a teacher or a
          developer.
          <br />
          <br />
          My decision-taking logic is based on the "The five big personality
          traits" -
          <a
            href="https://en.wikipedia.org/wiki/Big_Five_personality_traits"
            target="_blank"
            rel="noopener noreferrer"
          >
            a psychological trait theory.
          </a>
          <br />
          This theory has been developed from the 1908s onward through the
          collaborative efforts of various researchers and psychologists.
          <br />
          <br />
          So... would you like to try?
          <form className="home_buttons" onClick={clickHandler}>
            <button name={"yes"}>Yes, I do!</button>
            <button name={"no"}>No way!</button>
            <button name={"maybe"}>I can't decide:(</button>
          </form>
        </>
      ) : (
        <div class="home_user-resonse">
          {userResponse === "yes" && (
            <p>
              Great! <br />
            </p>
          )}
          {userResponse === "no" && <p>No</p>}
          {userResponse === "maybe" && <p>Maybe</p>}
        </div>
      )}
    </div>
  );
}

export default Home;
