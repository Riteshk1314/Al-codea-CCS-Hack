import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import QuizQuestion from './components/QuizQuestion';
import './index.css';

function App() {
  const [selectedOptions, setSelectedOptions] = useState(['']);

  const handleSelectChange = (index, event) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = event.target.value;
    setSelectedOptions(newSelectedOptions);
  };

  const handleAddButtonClick = () => {
    setSelectedOptions([...selectedOptions, '']);
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <Dashboard />
      </aside>
      <main className="main-content">
        <div className="quiz-container">
          <div className="select-container">
            {selectedOptions.map((option, index) => (
              <div key={index} className="select-box">
                <select
                  value=""
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









