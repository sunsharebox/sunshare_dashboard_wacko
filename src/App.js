import React, { useState, useEffect } from "react";
import { getTips } from "./store";
import Computer from "./Computer";
import Recreation from "./Components/Recreation/Recreation";
import CurrentConsumption from "./Components/CurrentConsumption/CurrentConsumption";
import { getRealTimeData, getQuiz } from "./store";
import Quiz from "./Components/Quiz/Quiz";
import Graph from './Components/graph/Graph';


function App() {
  const [isLoading, setLoading] = useState(true);
  const [consumed, setConsumed] = useState({});
  const [tip, setTip] = useState("");
  const [isVisible, setVisibility] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    getRealTimeData(data => {
      setConsumed(data);
    });
    getTips(tips => {
      manageTips(tips);
    });

    getQuiz(res => {
      setQuestions(res);
    });

    setLoading(false);
  }, []);

  const manageTips = params => {
    const computedTip = Computer.computeRandomTip(params);
    setTip(computedTip);
  };

  const getConsumed = () =>
    Computer.computePercentageConsumed(consumed.autoconsoidx, consumed.prodidx);

  if (isLoading) {
    return <div />;
  }

  const getDiff = () => Math.round(consumed.injectidx - consumed.soutiridx);

  if (!questions.length) {
    return <div />;
  }

  return (
    <div>
      <div className="container nav-bar ui-card">
        <div className="d-flex logo">
          <i className="icon icon-sun"></i>
          <p>Sunny Box</p>
        </div>
        <i onClick={() => alert('Wacko Cool 4 life !!! \n\nTeam: \nEric, Anaïs, Florin, Manoa, Cédric\n\nTechno: \nJavaScript, React, SCSS, Bootstrap, PHP, Symphony, API Platform\n\nProjet Hackathon (2 Jours)')} className="icon icon-info"></i>
      </div>
      <div className="container">
        <CurrentConsumption percentage={getConsumed()} chiffre={getDiff()} />
        <div className="my-2">
          <Recreation
            tip={tip}
            startQuiz={() => {
              setVisibility(true);
            }}
          />
        </div>
      </div>
      <div className={isVisible ? "" : "d-none"}>
        <Quiz
          questions={questions}
          closeQuiz={() => {
            setVisibility(false);
          }}
        />
      </div>
      <div className="container ui-card pb-5">
        <Graph/>
      </div>

    </div>
  );
}

export default App;
