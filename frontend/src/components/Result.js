import React from "react";
import "./Result.css";

const Result = () => {
  return (
    <div className="result-container">
      <h1 className="result-title">Test Results</h1>
      <div className="result-details">
        <p>Correct Answers: <span>5</span></p>
        <p>Incorrect Answers: <span>0</span></p>
        <p>Unanswered Questions: <span>0</span></p>
        <p>Score: <span>100%</span></p>
      </div>
    </div>
  );
}

export default Result;


