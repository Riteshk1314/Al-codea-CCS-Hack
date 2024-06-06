import React from 'react';
import './StudentPage.css';

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
