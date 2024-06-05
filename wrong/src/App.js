import React, { useState, useEffect, useRef } from 'react';
import Dashboard from './components/Dashboard';
import QuizQuestion from './components/QuizQuestion';
import './index.css';

function App() {
  const [selectedOptions, setSelectedOptions] = useState(['']);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const sidebarRef = useRef(null);

  const handleSelectChange = (index, event) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = event.target.value;
    setSelectedOptions(newSelectedOptions);
  };

  const handleAddButtonClick = () => {
    setSelectedOptions([...selectedOptions, '']);
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
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showDashboard]);

  return (
    <div className="app">
      <button className="dashboard-toggle" onClick={toggleDashboard}>
        ☰
      </button>
      <aside ref={sidebarRef} className={`sidebar ${showDashboard ? 'open' : ''}`}>
        <Dashboard />
      </aside>
      <main className={`main-content ${showDashboard ? 'with-sidebar' : ''}`}>
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
                  <option value="" disabled>Select language</option>
                  <option value="C++">C++</option>
                  <option value="C#">C#</option>
                  <option value="Python">Python</option>
                </select>
                <input type="text" value={option} readOnly />
              </div>
            ))}
            <button onClick={handleAddButtonClick} className="add-button">Add</button>
          </div>
          <QuizQuestion />
        </div>
      </main>
    </div>
  );
}

export default App;
















