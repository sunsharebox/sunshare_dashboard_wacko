import React, { useState } from "react";
import "./Quiz.css";

const RadioButton = ({ number, possibleAnswer, handleChange, classes }) => {
  console.log(classes);

  return (
    <div className="choice d-flex">
      <div className="radio-button mr-2">
        <input
          className={"choice-radio"}
          type="radio"
          name="answer-radio"
          onChange={handleChange}
        />
        <label className={"check-mark m-0 " + classes} />
        <span>{number}</span>
      </div>
      <p className="body-2 m-0">{possibleAnswer}</p>
    </div>
  );
};

const Question = ({ question, onAnswerSelected, showExplanation, classes }) => {
  
  //stores the answer choices.
  const possibleAnswers = ["A", "B", "C", "D"];
  const { content, answerA, answerB, answerC, answerD, goodAnswer } = question;
  const answers = [answerA, answerB, answerC, answerD];

  //Retrieve the correct answer from the explanation.
  const correctResponse = goodAnswer.split(":")[0].split(" ")[1];

  const getClasses = (param, choice, correctResponse) => {
    if (choice === correctResponse) {
      return param;
    }

    return "";
  };

  return (
    <div className="question">
      <div className="container">
        <p className="body-1">{content}</p>
        <div className="divider" />
        <div role="radiogroup" className="radio-button-wrapper">
          {possibleAnswers.map((choice, index) => (
            <RadioButton
              key={choice}
              number={choice}
              classes={getClasses(classes, choice, correctResponse)}
              correctResponse={correctResponse}
              possibleAnswer={answers[index]}
              handleChange={() => onAnswerSelected(choice, correctResponse)}
            />
          ))}
        </div>
        <p
          className={"explanation body-1 " + (showExplanation ? "" : "d-none")}
        >
          {goodAnswer}
        </p>
      </div>
    </div>
  );
};

const ActionBar = ({ nextQuestion, checkAnswer }) => (
  <div className="action-bar">
    <div className="container">
      <div className="row">
        <div className="col-sm-6 my-2">
          <button type="button" className="button" onClick={checkAnswer}>
            Check answer
          </button>
        </div>
        <div className="col-sm-6 my-2">
          <button type="button" className="button" onClick={nextQuestion}>
            Continue
          </button>
        </div>
      </div>
    </div>
  </div>
);

function Quiz({ closeQuiz, questions }) {
  const [answers, setAnswers] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isShowExplanation, setIsShowExplanation] = useState(false);
  const [classes, setClasses] = useState("");

  const nextQuestion = () => {
    //When the user clicks on next button,
    // reset all data for the next question.
    resetData();

    const questionCount = questions.length - 1;
    if (questionIndex < questionCount) {
      setQuestionIndex(questionIndex + 1);
    }
  };

  // invalidate hooks cache
  function resetData() {
    setAnswers({});
    setIsShowExplanation(false);
    setClasses("");
  }

  const getProgress = () => {
    const numberOfQuestion = questions.length - 1;
    return (questionIndex / numberOfQuestion) * 100;
  };
  const storeAnswer = (answer, response) => {
    setAnswers({
      correct: response,
      chosen: answer
    });
  };

  const checkAnswer = () => {
    if (Object.keys(answers).length) {
      const { correct, chosen } = answers;
      setIsShowExplanation(true);
      setClasses("correct");
    }
  };

  return (
    <div className="overlay">
      <div className="overlay-content">
        <div className="nav-bar">
          <div className="d-flex logo">
            <i className="icon-sun mr-2" />
            <p className="title m-0">Sunny Box</p>
          </div>
          <i
            onClick={() => {
              closeQuiz();
              setQuestionIndex(0);
            }}
            className="icon icon-close"
          />
        </div>
        <div className="ui-progress">
          <div
            className="ui-progress-bar"
            role="progressbar"
            style={{ width: `${getProgress()}%` }}
            aria-valuenow="25"
            aria-valuemin="0"
            aria-valuemax="100"
          />
        </div>

        <div className="content">
          <Question
            question={questions[questionIndex]}
            onAnswerSelected={storeAnswer}
            showExplanation={isShowExplanation}
            classes={classes}
          />
          <ActionBar nextQuestion={nextQuestion} checkAnswer={checkAnswer} />
        </div>
      </div>
    </div>
  );
}

export default Quiz;
