import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentPage.css";
import CameraFeed from "./CameraFeed";
import axios from "axios";

const StudentPage = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(900);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [details, setDetails] = useState([]);
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
    4: "",
    5: "",
  });
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/proctor/reactview/")
      .then((res) => {
        setDetails(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://hook.shreyasmahajan.me/hook.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      handleSubmit();
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

  const handleSubmit = () => {
    console.log("Submitting test with answers: ", selectedAnswers);
    // Submission logic here
    navigate("/result");
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
            <span>Unanswered</span>
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
        {details.length > 0 && (
          <div>
            <label htmlFor={`q${currentQuestion}a1`}>
              {details[currentQuestion - 1].question}
            </label>
            <br></br>
            <input
              type="radio"
              id={`q${currentQuestion}a1`}
              name={`q${currentQuestion}`}
              value="A"
              checked={selectedAnswers[currentQuestion] === "A"}
              onChange={() => handleOptionChange(currentQuestion, "A")}
            />
            <label htmlFor={`q${currentQuestion}a1`}>
              {details[currentQuestion - 1].option1}
            </label>
            <br></br>
            <input
              type="radio"
              id={`q${currentQuestion}a2`}
              name={`q${currentQuestion}`}
              value="B"
              checked={selectedAnswers[currentQuestion] === "B"}
              onChange={() => handleOptionChange(currentQuestion, "B")}
            />
            <label htmlFor={`q${currentQuestion}a2`}>
              {details[currentQuestion - 1].option2}
            </label>
            <br></br>
            <input
              type="radio"
              id={`q${currentQuestion}a3`}
              name={`q${currentQuestion}`}
              value="C"
              checked={selectedAnswers[currentQuestion] === "C"}
              onChange={() => handleOptionChange(currentQuestion, "C")}
            />
            <label htmlFor={`q${currentQuestion}a3`}>
              {details[currentQuestion - 1].option3}
            </label>
            <br></br>
            <input
              type="radio"
              id={`q${currentQuestion}a4`}
              name={`q${currentQuestion}`}
              value="D"
              checked={selectedAnswers[currentQuestion] === "D"}
              onChange={() => handleOptionChange(currentQuestion, "D")}
            />
            <label htmlFor={`q${currentQuestion}a4`}>
              {details[currentQuestion - 1].option4}
            </label>
            <br></br>
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
