import React, { useState } from 'react';

function QuizQuestion() {
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
    <div className="quiz-question">
      <h3>Question 1/5</h3>
      <p>
        Guy Bailey, Roy Hackett and Paul Stephenson made history in 1963, as part of a protest against a bus company that refused to employ black and Asian drivers in which UK city?
      </p>
      <img src="path/to/image.jpg" alt="History" />
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
  );
}

export default QuizQuestion;



