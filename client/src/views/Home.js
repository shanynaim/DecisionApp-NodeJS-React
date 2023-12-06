import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Home() {
  const [userResponse, setUserResponse] = useState(null);
  const [next, setNext] = useState(false);

  const navigate = useNavigate();

  const clickHandler = (e) => {
    setUserResponse(e.target.name);
    setNext(true);
  };
  useEffect(() => {
    return () => {
      setUserResponse(null);
      setNext(false);
    };
  }, []);

  return (
    <div className="home_text">
      {!next ? (
        <>
          Hello! <br />
          I am your new decision bot! <br />
          I'm here to help you make decisions in your life. <br />
          It can be minor decisions like going out to a party tonight or taking
          a chill evening at home, or bigger ones like working as a teacher or a
          developer. <br />
          <br />
          My decision-making logic is based on the "Big Five Personality Traits"
          -{" "}
          <a
            href="https://en.wikipedia.org/wiki/Big_Five_personality_traits"
            target="_blank"
            rel="noopener noreferrer"
          >
            a psychological trait theory.
          </a>
          <br />
          This theory has been developed from the 1900s onward through the
          collaborative efforts of various researchers and psychologists.
          <br />
          <br />
          So... Let's start?
          <form className="home_buttons" onClick={clickHandler}>
            <button name={"yes"}>Yes, I do!</button>
            <button name={"no"}>No way!</button>
            <button name={"maybe"}>I can't decide:(</button>
          </form>
        </>
      ) : (
        <div class="home_user-response">
          {userResponse === "yes" && (
            <>
              <p>
                Great! <br />
                <br />
                This is how it is going to work... <br />
                At the first stage, I'll ask you to fill out a profile
                questionnaire with 25 questions about you. Please answer
                honestly and choose what suits you most of the time. <br />
                Afterward, I will calculate your responses and build your
                personality profile based on the "Big Five Personality Traits".
                <br />
                <br />
                After submitting your profile, any time you have a decision to
                make, you can sign in and take the decision questionnaire, which
                contains 25 questions. <br />
                Based on your responses and your profile, I will tell you which
                one of those decisions is the best option!
              </p>

              <button onClick={() => navigate("/login")}>Lets Start!</button>
            </>
          )}
          {userResponse === "no" && (
            <>
              <p>
                It seems that you are good enough in making your own decisions;)
                <br /> <br />
                Bye Bye!
              </p>
              {/* <div className="robot"></div> */}
            </>
          )}
          {userResponse === "maybe" && (
            <>
              {" "}
              <p>
                So it seems this is the app for you! I'm here to help you
                decide. <br />
                Want to try?
              </p>
              <form className="home_buttons" onClick={clickHandler}>
                <button name={"yes"}>Yes, I do!</button>
                <button name={"no"}>No way!</button>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
