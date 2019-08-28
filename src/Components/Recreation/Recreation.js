import React from "react";
import "./Recreation.css";

const Recreation = ({ tip, startQuiz }) => {
  return (
    <div className="row">
      <div className=" col-sm-6 astuce ui-card">
        <h2>Astuce</h2>
        <p className="body-1 text-justify">{tip.content}</p>
      </div>

      <div className="col-sm-6 quiz-trigger ui-card pb-4" onClick={startQuiz}>
        <h2>Quiz</h2>
        <p className="body-1"> Teste tes connaissances sur l'énergie pour devenir le prochain Sun Master !</p>
        <button className="button" onClick={startQuiz}>Start Quiz</button>
      </div>
    </div>
  );
};

export default Recreation;