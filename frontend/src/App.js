// src/App.js
import React, { useState } from 'react';
import SelectDropdown from './components/SelectDropdown';
import QABox from './components/QABox';
import './App.css';

const App = () => {
  const [options] = useState(["C++", "C#", "Python"]);
  const [inputValues, setInputValues] = useState([""]);
  
  const handleSelect = (index, value) => {
    const newValues = [...inputValues];
    newValues[index] = value;
    setInputValues(newValues);
  };

  const handleAdd = () => {
    setInputValues([...inputValues, ""]);
  };

  const handleApprove = () => {
    console.log('Approved');
  };

  const handleDiscard = () => {
    console.log('Discarded');
  };

  const handleNextQuestion = () => {
    console.log('Next Question');
  };

  const handleGenerate = () => {
    console.log('Generate');
  };

  return (
    <div className="App">
      <header className="App-header">
        {inputValues.map((value, index) => (
          <div key={index} className="input-container">
            <SelectDropdown
              options={options}
              onSelect={(value) => handleSelect(index, value)}
            />
            <input type="text" value={value}
            placeholder='Topic' readOnly />
          </div>
        ))}
        <button onClick={handleAdd}>Add</button>
      </header>
      <main>
        <QABox
          question="What is React?"
          answer="React is a JavaScript library for building user interfaces."
          onApprove={handleApprove}
          onDiscard={handleDiscard}
          onNextQuestion={handleNextQuestion}
          onGenerate={handleGenerate}
        />
      </main>
    </div>
  );
};

export default App;





