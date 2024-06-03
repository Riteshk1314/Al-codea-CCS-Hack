// src/components/SelectDropdown.js
import React, { useState } from 'react';
import './SelectDropdown.css';

const SelectDropdown = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [inputBars, setInputBars] = useState([]);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    console.log('Selected option:', event.target.value);
  };

  const handleAddClick = () => {
    setInputBars([...inputBars, '']);
  };

  const handleInputChange = (index, event) => {
    const newInputBars = [...inputBars];
    newInputBars[index] = event.target.value;
    setInputBars(newInputBars);
  };

  return (
    <div className="select-dropdown">
      <div className="select-container">
        <label htmlFor="options">Choose an option:</label>
        <select id="options" value={selectedOption} onChange={handleChange}>
          <option value="">--Please choose an option--</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
        <button onClick={handleAddClick}>Add</button>
      </div>
      <div className="input-bars-container">
        {inputBars.map((input, index) => (
          <input
            key={index}
            type="text"
            value={input}
            onChange={(event) => handleInputChange(index, event)}
            className="input-bar"
            placeholder="Type here..."
          />
        ))}
      </div>
    </div>
  );
};

export default SelectDropdown;


