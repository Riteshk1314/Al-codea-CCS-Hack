// src/App.js
import React from 'react';
import SelectDropdown from './components/SelectDropdown';
import QABox from './components/QABox';
import './App.css';

const App = () => {
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
        <SelectDropdown />
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




