import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Home() {
  const [userResponse, setUserResponse] = useState(null);
  const [next, setNext] = useState(false);
  const [text, setText] = useState(`     Hello!
  I am your new decision bot!
  I'm here to help you take decisions in your life.
  It can be minor decisions like going out to a party tonight or taking
  a chill evening at home, or bigger ones like working as a teacher or a
  developer.
 
  My decision-taking logic is based on the "The five big personality
  traits" -
  <a
    href="https://en.wikipedia.org/wiki/Big_Five_personality_traits"
    target="_blank"
    rel="noopener noreferrer"
  >
    a psychological trait theory.
  </a>
 
  This theory has been developed from the 1908s onward through the
  collaborative efforts of various researchers and psychologists.
 
  So... Lets start?`);
  const [displayedText, setDisplayedText] = useState("");

  const navigate = useNavigate();

  const clickHandler = (e) => {
    setUserResponse(e.target.name);
    setNext(true);
  };

  useEffect(() => {
    let index = 0;

    const intervalId = setInterval(() => {
      setDisplayedText((prevText) => prevText + text[index]);

      index++;

      if (index === text.length) {
        clearInterval(intervalId);
      }
    }, 35); // Adjust the delay (in milliseconds) based on your preference

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, [text]);

  useEffect(() => {
    return () => {
      setUserResponse(null);
      setNext(false);
      setUserResponse(null);
    };
  }, []);

  return (
    <div className="home_text">
      {!next ? (
        <>
          <h1>Letter-by-Letter Animation Example</h1>
          return <div>{displayedText}</div>;
          <form className="home_buttons" onClick={clickHandler}>
            <button name={"yes"}>Yes, I do!</button>
            <button name={"no"}>No way!</button>
            <button name={"maybe"}>I can't decide:(</button>
          </form>
        </>
      ) : (
        <div class="home_user-resonse">
          {userResponse === "yes" && (
            <>
              <p>
                Great! <br />
                This is how it is going to work..
                <br />
                At first stage i`ll ask you to fill a profile query with 25
                questions about you. please answer honestly and what it suits
                you in most of the times.
                <br />
                After, I will calculate your responses and build your
                personality profile based on the "The five big personality
                traits". <br />
                <br />
                After submitting you profile, any time you`ll have a decision to
                take, you can signin to yout profile and take the decision
                query, which contains 25 questions. <br />
                Based on your responses and yout profile, I will tell you which
                one of those decision are best option!`
              </p>
              <button onClick={() => navigate("/signup")}>Lets Start!</button>
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
