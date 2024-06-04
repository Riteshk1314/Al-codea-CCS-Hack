// src/components/SelectDropdown.js
import React from 'react';

const SelectDropdown = ({ options, onSelect }) => {
  const handleSelect = (event) => {
    onSelect(event.target.value);
  };

  return (
    <select onChange={handleSelect}>
      <option value="">Please choose an option</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default SelectDropdown;




