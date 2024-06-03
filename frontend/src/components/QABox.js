// src/components/QABox.js
import React from 'react';
import './QABox.css';

const QABox = ({ question, answer, onApprove, onDiscard, onNextQuestion, onGenerate }) => {
  return (
    <div className="qa-box">
      <div className="question">
        <strong>Q:</strong> {question}
      </div>
      <div className="answer">
        <strong>A:</strong> {answer}
      </div>
      <div className="actions">
        <div>
          <button className="approve-button" onClick={onApprove}>Approve</button>
          <button className="discard-button" onClick={onDiscard}>Discard</button>
        </div>
        <div>
          <button className="next-question-button" onClick={onNextQuestion}>Next Question</button>
          <button className="generate-button" onClick={onGenerate}>Generate</button>
        </div>
      </div>
    </div>
  );
};

export default QABox;



