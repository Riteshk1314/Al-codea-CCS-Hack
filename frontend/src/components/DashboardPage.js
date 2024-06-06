import React, { useState, useEffect, useRef } from "react";
import "./DashboardPage.css";

function DashboardPage() {
  const [selectedOptions, setSelectedOptions] = useState([""]);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const sidebarRef = useRef(null);

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






  const [answer, setAnswer] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleApproveClick = () => {
    setIsEditing(false);
    // Implement the logic to approve the answer
  };

  const handleDiscardClick = () => {
    setAnswer("");
    setIsEditing(false);
  };
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
                <li>Dashboard</li>
                <li>Support</li>
                <li>Notification</li>
              </ul>
            </nav>
          </div>
          <button className="logout-button">Log Out</button>
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
            <h3>Question 1/5</h3>
            <p>
              What is React?
            </p>
            <form>
              <textarea
                value={answer}
                onChange={handleInputChange}
                readOnly={!isEditing}
                placeholder="Type your answer here"
              />
              <div className="button-group">
                <button type="button" className="edit-button" onClick={handleEditClick}>
                  Edit Answer
                </button>
                <button type="button" className="approve-button" onClick={handleApproveClick}>
                  Approve
                </button>
                <button type="button" className="discard-button" onClick={handleDiscardClick}>
                  Discard
                </button>
              </div>
              <div className="bottom-buttons">
                <button type="button" className="next-button">Next Question</button>
                <button type="button" className="generate-button">Generate</button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;
