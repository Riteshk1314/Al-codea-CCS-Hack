import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./DashboardPage.css";
import {useNavigate} from "react-router-dom"; 



function DashboardPage() {
  const navigate=useNavigate();
  const [selectedOptions, setSelectedOptions] = useState([""]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [details, setDetails] = useState([]);
  const sidebarRef = useRef(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/proctor/reactview/")
      .then((res) => {
        setDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSelectChange = (index, event) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = event.target.value;
    setSelectedOptions(newSelectedOptions);
  };

  const handleAddButtonClick = () => {
    setSelectedOptions([...selectedOptions, ""]);
  };

  const toggleDashboard = () => {
    setShowDashboard(!showDashboard);
  };

  const toggleNotification = () => {
    setShowNotification(!showNotification);
  };

  const handleOutsideClick = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setShowDashboard(false);
    }
  };

  const handleNextClick = () => {
    if (currentQuestionIndex < details.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePreviousClick = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };
  const handleTestButton = () => {
    navigate("/student");
  };
  const handleLogout = () => {
    navigate("/");
  }

  useEffect(() => {
    if (showDashboard) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showDashboard]);

  if (!details || details.length === 0) {
    return (
      <div className="student-page">
        <h1>Student Page</h1>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="app">
      <button className="dashboard-toggle" onClick={toggleDashboard}>
        ☰
      </button>
      <aside
        ref={sidebarRef}
        className={`sidebar ${showDashboard ? "open" : ""}`}
      >
        <div className="dashboard">
          <div>
            <h2>Quiz Time</h2>
            <nav>
              <ul>
                <li>Profile</li>
                <button onClick={handleTestButton} class="TestButton">Test</button>
                <li>Support</li>
                <li>Notification</li>
              </ul>
            </nav>
          </div>
          <button onClick={handleLogout} className="logout-button">Log Out</button>
        </div>
      </aside>
      <main className={`main-content ${showDashboard ? "with-sidebar" : ""}`}>
        <div className="notification-icon" onClick={toggleNotification}>
          🔔
          {showNotification && (
            <div className="notification-popup">
              <p>No new notifications</p>
            </div>
          )}
        </div>
        <div className="quiz-container">
          <div className="select-container">
            {selectedOptions.map((option, index) => (
              <div key={index} className="select-box">
                <select
                  value={option}
                  onChange={(e) => handleSelectChange(index, e)}
                >
                  <option value="" disabled>
                    Select language
                  </option>
                  <option value="C++">C++</option>
                  <option value="C#">C#</option>
                  <option value="Python">Python</option>
                </select>
                <input type="text" value={option} readOnly />
              </div>
            ))}
            <button onClick={handleAddButtonClick} className="add-button">
              Add
            </button>
          </div>
          <div className="quiz-question">
            <h3>
              Question {currentQuestionIndex + 1}/{details.length}
            </h3>
            <ul>
              <li>{details[currentQuestionIndex].question}</li>
              <li>{details[currentQuestionIndex].option1}</li>
              <li>{details[currentQuestionIndex].option2}</li>
              <li>{details[currentQuestionIndex].option3}</li>
              <li>{details[currentQuestionIndex].option4}</li>
              <li>{details[currentQuestionIndex].answer}</li>
            </ul>
            <form>
              <textarea
                value={selectedOptions[currentQuestionIndex]}
                readOnly
                placeholder="Type your answer here"
              />
              <div className="button-group">
                <button
                  type="button"
                  className="edit-button"
                  onClick={handleNextClick}
                >
                  Edit Answer
                </button>
                <button
                  type="button"
                  className="approve-button"
                  onClick={handleNextClick}
                >
                  Approve
                </button>
                <button
                  type="button"
                  className="discard-button"
                  onClick={handleNextClick}
                >
                  Discard
                </button>
              </div>
              <div className="bottom-buttons">
                <button
                  type="button"
                  className="next-button"
                  onClick={handleNextClick}
                >
                  Next Question
                </button>
                <button
                  type="button"
                  onClick={handlePreviousClick}
                  className="next-button"
                >
                  Previous Question
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;
