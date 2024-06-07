import React, { useState, useEffect } from "react";
import "./StudentPage.css";
import CameraFeed from "./CameraFeed";

const StudentPage = ({ details }) => {
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes timer
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [questionStatus, setQuestionStatus] = useState({
    1: { seen: false, answered: false, review: false },
    2: { seen: false, answered: false, review: false },
    3: { seen: false, answered: false, review: false },
    4: { seen: false, answered: false, review: false },
    5: { seen: false, answered: false, review: false },
  });
  const [selectedAnswers, setSelectedAnswers] = useState({
    1: "",
    2: "",
    3: "",
    4: [],
    5: [],
  });

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft]);

  const handleQuestionChange = (questionNumber) => {
    setQuestionStatus((prevState) => ({
      ...prevState,
      [currentQuestion]: { ...prevState[currentQuestion], seen: true },
      [questionNumber]: { ...prevState[questionNumber], seen: true },
    }));
    setCurrentQuestion(questionNumber);
  };

  const handleMarkForReview = () => {
    setQuestionStatus((prevState) => ({
      ...prevState,
      [currentQuestion]: {
        ...prevState[currentQuestion],
        review: !prevState[currentQuestion].review,
      },
    }));
  };

  const handleOptionChange = (questionNumber, answer) => {
    setSelectedAnswers((prevState) => ({
      ...prevState,
      [questionNumber]: answer,
    }));
    setQuestionStatus((prevState) => ({
      ...prevState,
      [questionNumber]: { ...prevState[questionNumber], answered: true },
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < 5) {
      handleQuestionChange(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 1) {
      handleQuestionChange(currentQuestion - 1);
    }
  };

  const handleCheckboxChange = (questionNumber, answer) => {
    setSelectedAnswers((prevState) => {
      const newAnswers = prevState[questionNumber].includes(answer)
        ? prevState[questionNumber].filter((item) => item !== answer)
        : [...prevState[questionNumber], answer];
      return {
        ...prevState,
        [questionNumber]: newAnswers,
      };
    });
    setQuestionStatus((prevState) => ({
      ...prevState,
      [questionNumber]: { ...prevState[questionNumber], answered: true },
    }));
  };

  const handleSubmit = () => {
    console.log("Submitting test with answers: ", selectedAnswers);
    // Submission logic here
  };

  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleToggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div className="test-container">
      <button className="nav-toggle" onClick={handleToggleNav}>
        {isNavOpen ? "☰" : "☰"}
      </button>
      <div className="camera-feed-container">
        <CameraFeed />
      </div>
      <div className={`right-section ${isNavOpen ? "open" : ""}`}>
        <div className="info-box">
          <label>Time Left: </label>
          <span className="time-left">{timeLeft} seconds</span>
          <div className="info-item">
            <div className="info-color unanswered"></div>
            <span>Unseen/Unanswered</span>
          </div>
          <div className="info-item">
            <div className="info-color answered"></div>
            <span>Answered</span>
          </div>
          <div className="info-item">
            <div className="info-color review"></div>
            <span>Marked for Review</span>
          </div>
          <div className="info-item">
            <div className="info-color review-answered"></div>
            <span>Marked for Review (Answered)</span>
          </div>
        </div>
        <div className="navigation-buttons">
          {Object.keys(questionStatus).map((questionNumber) => (
            <button
              key={questionNumber}
              className={`nav-button ${
                questionStatus[questionNumber].answered ? "answered" : ""
              } ${questionStatus[questionNumber].seen ? "seen" : ""} ${
                questionStatus[questionNumber].review ? "review" : ""
              } ${
                currentQuestion === parseInt(questionNumber) ? "active" : ""
              }`}
              onClick={() => handleQuestionChange(parseInt(questionNumber))}
            >
              {questionNumber}
              {questionStatus[questionNumber].answered &&
                questionStatus[questionNumber].review && (
                  <span className="review-dot"></span>
                )}
            </button>
          ))}
        </div>
        <button className="review-button" onClick={handleMarkForReview}>
          {questionStatus[currentQuestion].review
            ? "Unmark Review"
            : "Mark for Review"}
        </button>
        <button className="submit-button" onClick={handleSubmit}>
          Submit Test
        </button>
      </div>
      <div className={`question-section ${isNavOpen ? "nav-open" : ""}`}>
        {currentQuestion === 1 && (
          <div className="question">
            <label>1. Question one text here?</label>
            <div className="options">
              <div>
                <input
                  type="radio"
                  id="q1a1"
                  name="q1"
                  value="A"
                  checked={selectedAnswers[1] === "A"}
                  onChange={() => handleOptionChange(1, "A")}
                />
                <label htmlFor="q1a1">Option A</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="q1a2"
                  name="q1"
                  value="B"
                  checked={selectedAnswers[1] === "B"}
                  onChange={() => handleOptionChange(1, "B")}
                />
                <label htmlFor="q1a2">Option B</label>
              </div>
            </div>
          </div>
        )}
        {currentQuestion === 2 && (
          <div className="question">
            <label>2. Question two text here?</label>
            <div className="options">
              <div>
                <input
                  type="radio"
                  id="q2a1"
                  name="q2"
                  value="A"
                  checked={selectedAnswers[2] === "A"}
                  onChange={() => handleOptionChange(2, "A")}
                />
                <label htmlFor="q2a1">Option A</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="q2a2"
                  name="q2"
                  value="B"
                  checked={selectedAnswers[2] === "B"}
                  onChange={() => handleOptionChange(2, "B")}
                />
                <label htmlFor="q2a2">Option B</label>
              </div>
            </div>
          </div>
        )}
        {currentQuestion === 3 && (
          <div className="question">
            <label>3. Question three text here?</label>
            <div className="options">
              <div>
                <input
                  type="radio"
                  id="q3a1"
                  name="q3"
                  value="A"
                  checked={selectedAnswers[3] === "A"}
                  onChange={() => handleOptionChange(3, "A")}
                />
                <label htmlFor="q3a1">Option A</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="q3a2"
                  name="q3"
                  value="B"
                  checked={selectedAnswers[3] === "B"}
                  onChange={() => handleOptionChange(3, "B")}
                />
                <label htmlFor="q3a2">Option B</label>
              </div>
            </div>
          </div>
        )}
        {currentQuestion === 4 && (
          <div className="question">
            <label>4. Question four text here?</label>
            <div className="options">
              <div>
                <input
                  type="checkbox"
                  id="q4a1"
                  name="q4"
                  value="A"
                  checked={selectedAnswers[4].includes("A")}
                  onChange={() => handleCheckboxChange(4, "A")}
                />
                <label htmlFor="q4a1">Option A</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="q4a2"
                  name="q4"
                  value="B"
                  checked={selectedAnswers[4].includes("B")}
                  onChange={() => handleCheckboxChange(4, "B")}
                />
                <label htmlFor="q4a2">Option B</label>
              </div>
            </div>
          </div>
        )}
        {currentQuestion === 5 && (
          <div className="question">
            <label>5. Question five text here?</label>
            <div className="options">
              <div>
                <input
                  type="checkbox"
                  id="q5a1"
                  name="q5"
                  value="A"
                  checked={selectedAnswers[5].includes("A")}
                  onChange={() => handleCheckboxChange(5, "A")}
                />
                <label htmlFor="q5a1">Option A</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="q5a2"
                  name="q5"
                  value="B"
                  checked={selectedAnswers[5].includes("B")}
                  onChange={() => handleCheckboxChange(5, "B")}
                />
                <label htmlFor="q5a2">Option B</label>
              </div>
            </div>
          </div>
        )}
        <div className="navigation">
          <button
            className="previous-button"
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 1}
          >
            Previous
          </button>
          <button
            className="next-button"
            onClick={handleNextQuestion}
            disabled={currentQuestion === 5}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentPage;
