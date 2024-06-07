import React, { useState, useEffect } from "react";
import axios from "axios";
import "./testing.css";

const StudentPage = () => {
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes timer
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [questionStatus, setQuestionStatus] = useState({});
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/proctor/reactview/")
      .then((res) => {
        setDetails(res.data);
        setLoading(false); // Data loaded
        // Log the fetched data
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // Error occurred, stop loading
      });
  }, []);

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
    setIsNavOpen(false); // Close navigation when a question is selected
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

  const handleNextQuestion = () => {
    if (currentQuestion < details.length) {
      handleQuestionChange(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 1) {
      handleQuestionChange(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Submitting test with answers: ", selectedAnswers);
    // Submission logic here
  };

  const handleToggleNav = () => {
    console.log("Toggling navigation. Current state: ", isNavOpen);
    setIsNavOpen(!isNavOpen);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="test-container">
      <button className="nav-toggle" onClick={handleToggleNav}>
        {isNavOpen ? "Close Navigation" : "Open Navigation"}
      </button>

      {details.length > 0 ? (
        <div>
          <label htmlFor="q1a1">{details[currentQuestion - 1].question}</label>
          <br></br>

          <input
            type="radio"
            id="q1a1"
            name="q1"
            value="A"
            checked={selectedAnswers[1] === "A"}
            onChange={() => handleOptionChange(1, "A")}
          />

          <label htmlFor="q1a1">{details[currentQuestion - 1].option1}</label>
          <br></br>

          <input
            type="radio"
            id="q2a2"
            name="q2"
            value="B"
            checked={selectedAnswers[2] === 'B'}
            onChange={() => handleOptionChange(2, 'B')}
          />

          <label htmlFor="q1a1">{details[currentQuestion - 1].option2}</label>
          <br></br>

          <input
            type="radio"
            id="q1a1"
            name="q1"
            value="C"
            checked={selectedAnswers[3] === "C"}
            onChange={() => handleOptionChange(1, "C")}
          />
          <label htmlFor="q1a1">{details[currentQuestion - 1].option3}</label>
          <br></br>
          <input
            type="radio"
            id="q1a1"
            name="q1"
            value="A"
            checked={selectedAnswers[1] === "A"}
            onChange={() => handleOptionChange(1, "A")}
          />
          <label htmlFor="q1a1">{details[currentQuestion - 1].option4}</label>
          <br></br>

          <div className="next-prev-buttons">
            <button
              className="next-prev-button"
              onClick={handlePreviousQuestion}
              disabled={currentQuestion === 1}
            >
              Previous Question
            </button>
            <button
              className="next-prev-button"
              onClick={handleNextQuestion}
              disabled={currentQuestion === details.length}
            >
              Next Question
            </button>
          </div>
        </div>
      ) : (
        <div>No details available</div>
      )}

      <div className="right-section">
        <div className="timer">
          <label>Time Left: </label>
          <span className="time-left">{timeLeft} seconds</span>
        </div>
        <button className="review-button" onClick={handleMarkForReview}>
          {questionStatus[currentQuestion]?.review
            ? "Unmark Review"
            : "Mark for Review"}
        </button>
        <button className="submit-button" onClick={handleSubmit}>
          Submit Test
        </button>
        <div className="navigation-buttons">
          {Object.keys(questionStatus).map((questionNumber) => (
            <button
              key={questionNumber}
              className={`nav-button ${
                questionStatus[questionNumber]?.answered ? "answered" : ""
              } ${questionStatus[questionNumber]?.seen ? "seen" : ""} ${
                questionStatus[questionNumber]?.review ? "review" : ""
              } ${
                currentQuestion === parseInt(questionNumber) ? "active" : ""
              }`}
              onClick={() => handleQuestionChange(parseInt(questionNumber))}
            >
              {questionNumber}
              {questionStatus[questionNumber]?.answered &&
                questionStatus[questionNumber]?.review && (
                  <span className="review-dot"></span>
                )}
            </button>
          ))}
        </div>
        <div className="info-box">
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
      </div>
    </div>
  );
};

export default StudentPage;
