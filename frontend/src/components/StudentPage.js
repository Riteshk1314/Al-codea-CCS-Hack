import React, { useState, useEffect } from 'react';
import React from 'react';
import './StudentPage.css';

const StudentPage = () => {
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes timer
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [questionStatus, setQuestionStatus] = useState({
    1: { seen: false, answered: false, review: false },
    2: { seen: false, answered: false, review: false },
    3: { seen: false, answered: false, review: false },
    4: { seen: false, answered: false, review: false },
    5: { seen: false, answered: false, review: false }
  });
  const [selectedAnswers, setSelectedAnswers] = useState({
    1: '',
    2: '',
    3: '',
    4: [],
    5: []
  });
  const [isNavOpen, setIsNavOpen] = useState(false);

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
      [questionNumber]: { ...prevState[questionNumber], seen: true }
    }));
    setCurrentQuestion(questionNumber);
    setIsNavOpen(false);
  };

  const handleMarkForReview = () => {
    setQuestionStatus((prevState) => ({
      ...prevState,
      [currentQuestion]: { ...prevState[currentQuestion], review: !prevState[currentQuestion].review }
    }));
  };

  const handleOptionChange = (questionNumber, answer) => {
    setSelectedAnswers((prevState) => ({
      ...prevState,
      [questionNumber]: answer
    }));
    setQuestionStatus((prevState) => ({
      ...prevState,
      [questionNumber]: { ...prevState[questionNumber], answered: true }
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
      const currentAnswers = prevState[questionNumber];
      if (currentAnswers.includes(answer)) {
        return {
          ...prevState,
          [questionNumber]: currentAnswers.filter((a) => a !== answer)
        };
      } else {
        return {
          ...prevState,
          [questionNumber]: [...currentAnswers, answer]
        };
      }
    });
    setQuestionStatus((prevState) => ({
      ...prevState,
      [questionNumber]: { ...prevState[questionNumber], answered: true }
    }));
  };

  const handleReviewToggle = (questionNumber) => {
    setQuestionStatus((prevState) => ({
      ...prevState,
      [questionNumber]: { ...prevState[questionNumber], review: !prevState[questionNumber].review }
    }));
  };

  const handleSubmit = () => {
    alert('Test submitted!');
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
return (
  <div className="test-container">
    <button className="nav-toggle" onClick={toggleNav}>
      {isNavOpen ? 'Close Navigation' : 'Open Navigation'}
    </button>
      <div className={`question-section ${isNavOpen ? 'nav-open' : ''}`}>
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
                  checked={selectedAnswers[1] === 'A'} 
                  onChange={() => handleOptionChange(1, 'A')}
                />
                <label htmlFor="q1a1">Option A</label>
              </div>
              <div>
                <input 
                  type="radio" 
                  id="q1a2" 
                  name="q1" 
                  value="B" 
                  checked={selectedAnswers[1] === 'B'} 
                  onChange={() => handleOptionChange(1, 'B')}
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
                  checked={selectedAnswers[2] === 'A'} 
                  onChange={() => handleOptionChange(2, 'A')}
                />
                <label htmlFor="q2a1">Option A</label>
              </div>
              <div>
                <input 
                  type="radio" 
                  id="q2a2" 
                  name="q2" 
                  value="B" 
                  checked={selectedAnswers[2] === 'B'} 
                  onChange={() => handleOptionChange(2, 'B')}
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
                  checked={selectedAnswers[3] === 'A'} 
                  onChange={() => handleOptionChange(3, 'A')}
                />
                <label htmlFor="q3a1">Option A</label>
              </div>
              <div>
                <input 
                  type="radio" 
                  id="q3a2" 
                  name="q3" 
                  value="B" 
                  checked={selectedAnswers[3] === 'B'} 
                  onChange={() => handleOptionChange(3, 'B')}
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
                  value="A" 
                  checked={selectedAnswers[4].includes('A')} 
                  onChange={() => handleCheckboxChange(4, 'A')}
                />
                <label htmlFor="q4a1">Option A</label>
              </div>
              <div>
                <input 
                  type="checkbox" 
                  id="q4a2" 
                  value="B" 
                  checked={selectedAnswers[4].includes('B')} 
                  onChange={() => handleCheckboxChange(4, 'B')}
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
                  value="A" 
                  checked={selectedAnswers[5].includes('A')} 
                  onChange={() => handleCheckboxChange(5, 'A')}
                />
                <label htmlFor="q5a1">Option A</label>
              </div>
              <div>
                <input 
                  type="checkbox" 
                  id="q5a2" 
                  value="B" 
                  checked={selectedAnswers[5].includes('B')} 
                  onChange={() => handleCheckboxChange(5, 'B')}
                />
                <label htmlFor="q5a2">Option B</label>
              </div>
            </div>
          </div>
        )}

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
            disabled={currentQuestion === 5}
          >
            Next Question
          </button>
        </div>
      </div>

      <div className="right-section">
        <div className="timer">
          <label>Time Left: </label>
          <span className="time-left">{timeLeft} seconds</span>
        </div>
        <button className="review-button" onClick={handleMarkForReview}>
          {questionStatus[currentQuestion].review ? 'Unmark Review' : 'Mark for Review'}
        </button>
        <button className="submit-button" onClick={handleSubmit}>Submit Test</button>
        <div className="navigation-buttons">
          {Object.keys(questionStatus).map((questionNumber) => (
            <button 
              key={questionNumber} 
              className={`nav-button ${questionStatus[questionNumber].answered ? 'answered' : ''} ${questionStatus[questionNumber].seen ? 'seen' : ''} ${questionStatus[questionNumber].review ? 'review' : ''} ${currentQuestion === parseInt(questionNumber) ? 'active' : ''}`} 
              onClick={() => handleQuestionChange(parseInt(questionNumber))}
            >
              {questionNumber}
              {questionStatus[questionNumber].answered && questionStatus[questionNumber].review && <span className="review-dot"></span>}
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
function StudentPage({ details }) {
  // Check if details is undefined or empty
  if (!details || details.length === 0) {
    return (
      <div className="student-page">
        <h1>Student Page</h1>
        <div>Loading...</div>
      </div>
    );
  }

  // If details is available, render the component with the data
  return (
    <div className="student-page">
      <h1>Student Page</h1>
      <div>
        <h1>Details</h1>
        <ul>
          {details.map((detail, index) => (
            <li key={index}>
              <p>{detail.question}</p>
              <p>{detail.option1}</p>
              <p>{detail.option2}</p>
              <p>{detail.option3}</p>
              <p>{detail.option4}</p>
              <p>{detail.answer}</p>

            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default StudentPage;












